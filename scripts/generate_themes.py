#!/usr/bin/env python3
"""
Extract theme data from 16 individual template files and generate:
1. js/themes.js    — THEME_REGISTRY with CSS + body HTML for each theme
2. templates/render.html — Single polymorphic renderer
"""
import re, os, json, html

TEMPLATES_DIR = 'templates'
OUTPUT_THEMES = 'js/themes.js'
OUTPUT_RENDER = 'templates/render.html'

# Map filename suffix to theme key
THEME_KEYS = {
    '1-emerald': 'emerald',
    '2-royal': 'royal',
    '3-modern': 'modern',
    '4-fajr': 'fajr',
    '5-silver': 'silver',
    '6-heritage': 'heritage',
    '7-glass': 'glass',
    '8-saudi': 'saudi',
    '9-kufic': 'kufic',
    '10-gold': 'gold',
    '11-midnight': 'midnight',
    '12-marble': 'marble',
    '13-ramadan-green': 'ramadan-green',
    '14-ramadan-plum': 'ramadan-plum',
    '15-dynamic': 'dynamic',
    '16-minimalist': 'minimalist',
}

themes = []

for fname in sorted(os.listdir(TEMPLATES_DIR), key=lambda x: int(re.match(r'style(\d+)', x).group(1)) if re.match(r'style(\d+)', x) else 999):
    if not fname.startswith('style') or not fname.endswith('.html') or fname == 'render.html':
        continue
    
    suffix = fname.replace('style', '').replace('.html', '')
    key = THEME_KEYS.get(suffix, suffix)
    num = int(re.match(r'(\d+)', suffix).group(1))
    
    path = os.path.join(TEMPLATES_DIR, fname)
    with open(path, 'r') as f:
        content = f.read()
    
    # Extract style block
    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
    style_css = style_match.group(1).strip() if style_match else ''
    
    # Extract body inner HTML (everything between <body> and first <script)
    body_match = re.search(r'<body>\s*(.*?)\s*<script', content, re.DOTALL)
    body_html = body_match.group(1).strip() if body_match else ''
    
    # Extract inline script (if any)
    inline_script_match = re.search(r'<script>\s*(.*?)\s*</script>\s*</body>', content, re.DOTALL)
    inline_script = inline_script_match.group(1).strip() if inline_script_match else ''
    
    themes.append({
        'key': key,
        'num': num,
        'css': style_css,
        'bodyHTML': body_html,
        'inlineScript': inline_script,
    })
    print(f'  ✓ Extracted: style{suffix} → key="{key}"')

print(f'\n  Total themes extracted: {len(themes)}')

# ─── Generate js/themes.js ───

def js_escape(s):
    """Escape a string for use inside JS template literals (backtick strings)."""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

js_lines = [
    '/**',
    ' * themes.js — Theme Registry for Polymorphic Lower Third Renderer',
    ' * Auto-generated from 16 template files.',
    ' * Each theme contains its CSS, body HTML, and optional inline script.',
    ' */',
    '',
    'const THEME_REGISTRY = {',
]

for t in themes:
    js_lines.append(f'  "{t["key"]}": {{')
    js_lines.append(f'    num: {t["num"]},')
    js_lines.append(f'    css: `{js_escape(t["css"])}`,')
    js_lines.append(f'    bodyHTML: `{js_escape(t["bodyHTML"])}`,')
    if t['inlineScript']:
        js_lines.append(f'    inlineScript: `{js_escape(t["inlineScript"])}`,')
    else:
        js_lines.append(f'    inlineScript: null,')
    js_lines.append(f'  }},')
    js_lines.append('')

js_lines.append('};')
js_lines.append('')
js_lines.append('// Expose globally')
js_lines.append('window.THEME_REGISTRY = THEME_REGISTRY;')
js_lines.append('')

with open(OUTPUT_THEMES, 'w') as f:
    f.write('\n'.join(js_lines))

print(f'  ✓ Generated {OUTPUT_THEMES} ({os.path.getsize(OUTPUT_THEMES)} bytes)')

# ─── Generate templates/render.html ───

render_html = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1920">
  <title>Lower Third — Polymorphic Renderer</title>
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/animations.css">
  <style id="themeCSS">
    /* Theme CSS injected dynamically */
    body { background: transparent; }
  </style>
</head>
<body>
  <div id="themeBody">
    <!-- Theme body HTML injected dynamically -->
  </div>

  <script src="../js/themes.js"></script>
  <script src="../js/controller.js"></script>
  <script>
    /**
     * ThemeRouter — Reads ?style=<key> from URL and applies the matching theme.
     * Also listens for BroadcastChannel 'change-style' commands for hot-swapping.
     */
    class ThemeRouter {
      constructor() {
        this.currentTheme = null;
        this.params = new URLSearchParams(window.location.search);
        this.styleKey = this.params.get('style') || 'emerald';
      }

      init() {
        this.applyTheme(this.styleKey);

        // Listen for hot-swap commands via BroadcastChannel
        try {
          const channel = new BroadcastChannel('lt-control');
          channel.addEventListener('message', (e) => {
            if (e.data && e.data.type === 'change-style' && e.data.style) {
              this.applyTheme(e.data.style);
            }
          });
        } catch (err) {
          console.warn('ThemeRouter: BroadcastChannel not available', err);
        }

        // Also listen via postMessage (for iframe communication from control panel)
        window.addEventListener('message', (e) => {
          if (e.data && e.data.type === 'change-style' && e.data.style) {
            this.applyTheme(e.data.style);
          }
        });
      }

      applyTheme(key) {
        const theme = window.THEME_REGISTRY?.[key];
        if (!theme) {
          console.warn(`ThemeRouter: Unknown theme "${key}", falling back to "emerald".`);
          this.applyTheme('emerald');
          return;
        }

        if (this.currentTheme === key) return;
        this.currentTheme = key;

        // 1. Inject theme CSS
        const styleEl = document.getElementById('themeCSS');
        if (styleEl) {
          styleEl.textContent = 'body { background: transparent; }\\n' + theme.css;
        }

        // 2. Inject theme body HTML
        const bodyContainer = document.getElementById('themeBody');
        if (bodyContainer) {
          bodyContainer.innerHTML = theme.bodyHTML;
        }

        // 3. Execute inline script if any
        if (theme.inlineScript) {
          try {
            const scriptFn = new Function(theme.inlineScript);
            scriptFn();
          } catch (err) {
            console.warn('ThemeRouter: inline script error for theme', key, err);
          }
        }

        // 4. Re-initialize the controller with the new DOM
        if (window.LT) {
          window.LT.init();
        }
      }
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
      window.themeRouter = new ThemeRouter();
      window.themeRouter.init();
    });
  </script>
</body>
</html>
'''

with open(OUTPUT_RENDER, 'w') as f:
    f.write(render_html)

print(f'  ✓ Generated {OUTPUT_RENDER} ({os.path.getsize(OUTPUT_RENDER)} bytes)')
print('\\n  Done! ✅')
