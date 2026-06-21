# ☽✦ Animated Lower Thirds — Islamic Arabic Edition

Premium animated lower thirds for Arabic live streaming with OBS Studio. Featuring 12 stunning Islamic-inspired visual styles, a real-time control panel, and seamless BroadcastChannel API integration.

---

## ✨ Features

- **12 Visual Styles**: Gold & Emerald, Royal Night, Modern Elegant, Fajr, Silver Blue, Heritage, Glass, Saudi Green, Kufic Geometric, Luxury Gold, Midnight Sapphire, Marble & Rose Gold
- **Real-time Control Panel**: Premium glassmorphic dark UI with sidebar navigation
- **8 Animation Modes**: Slide Right/Left, Slide Up, Fade, Scale, Elastic Bounce, Typewriter, Cinematic Wipe
- **Live Preview**: 16:9 aspect ratio preview with floating toolbar
- **BroadcastChannel API**: Instant OBS ↔ Control Panel communication
- **Full RTL Arabic Support**: Designed from the ground up for Arabic typography
- **Hijri Date Auto-Generation**: Automatic Umm al-Qura calendar date
- **Presets System**: Save/load speaker configurations with localStorage
- **Queue/Playlist**: Build a queue of lower thirds with auto-play cycling
- **Custom Colors**: Real-time background, text, and accent color customization
- **Logo/Image Support**: Upload custom logos alongside names
- **Islamic Ornaments**: Bismillah, geometric patterns, 8-pointed star overlays
- **Keyboard Shortcuts**: Space/Enter to toggle, Escape to hide, ? for help
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Multiple Alignments**: Left, center, or right positioning

---

## 🚀 Quick Start

### 1. Download & Extract
```bash
git clone https://github.com/your-repo/Animated-Lower-Thirds.git
cd Animated-Lower-Thirds
```

### 2. Serve Locally
Use any HTTP server. For example:
```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve -l 8080

# PHP
php -S localhost:8080
```

### 3. Open the Control Panel
Navigate to `http://localhost:8080/index.html` in your browser.

### 4. Set Up OBS Studio
1. Add a **Browser Source** in OBS
2. **Uncheck** "Local File" — use URL mode instead
3. Set the URL to: `http://localhost:8080/style1-emerald.html`
4. Set dimensions to **1920 × 1080**
5. Enable transparent background

> ⚠️ **Mac users**: Do not use the "Local File" option — use the HTTP URL to avoid Same-Origin Policy restrictions.

---

## 🎨 Style Gallery

| # | Name | Colors |
|---|------|--------|
| 1 | الذهب والزمرد (Gold & Emerald) | Emerald green + gold |
| 2 | الليل الملكي (Royal Night) | Deep navy + teal |
| 3 | الأنيق الحديث (Modern Elegant) | Charcoal + gold |
| 4 | الفجر (Fajr) | Teal-blue + rose gold |
| 5 | الأزرق الفضي (Silver Blue) | Blue-gray + silver |
| 6 | التراث والحداثة (Heritage) | Burgundy + gold |
| 7 | الزجاج المضيء (Glass) | Transparent + gold |
| 8 | الأخضر السعودي (Saudi Green) | Green + white |
| 9 | الكوفي الهندسي (Kufic) | Bronze + charcoal |
| 10 | الذهبي الفاخر (Luxury Gold) | Black + gold |
| 11 | الياقوت المنتصف (Midnight Sapphire) | Navy + sapphire blue |
| 12 | الرخام والذهب الوردي (Marble & Rose Gold) | Marble + rose gold |

---

## ⌨ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` / `Enter` | Toggle show/hide |
| `Escape` | Hide lower third / close overlay |
| `?` | Show keyboard shortcuts overlay |
| `Alt + 1-0` | Switch to style 1-10 |

---

## 📁 Project Structure

```
Animated-Lower-Thirds/
├── index.html              # Control Panel (main UI)
├── style1-emerald.html     # Style 1: Gold & Emerald
├── style2-royal.html       # Style 2: Royal Night
├── style3-modern.html      # Style 3: Modern Elegant
├── style4-fajr.html        # Style 4: Fajr
├── style5-silver.html      # Style 5: Silver Blue
├── style6-heritage.html    # Style 6: Heritage
├── style7-glass.html       # Style 7: Glass
├── style8-saudi.html       # Style 8: Saudi Green
├── style9-kufic.html       # Style 9: Kufic
├── style10-gold.html       # Style 10: Luxury Gold
├── style11-midnight.html   # Style 11: Midnight Sapphire ✨
├── style12-marble.html     # Style 12: Marble & Rose Gold ✨
├── css/
│   ├── base.css            # Design tokens & shared styles
│   ├── animations.css      # All keyframe animations
│   └── control-panel.css   # Control panel UI styles
├── js/
│   ├── controller.js       # LowerThirdController class
│   └── control-panel.js    # ControlPanel class (UI logic)
├── logos/                  # Default logo assets
└── lower thirds/           # Legacy system (original)
```

---

## 🛠 Technical Details

- **No build step required** — pure HTML, CSS, and vanilla JavaScript
- **BroadcastChannel API** for real-time communication between tabs
- **ES6 Classes** for clean, modular architecture
- **CSS Custom Properties** for theming and design tokens
- **Responsive** via CSS Grid and media queries
- **localStorage** for persistent presets
- **No jQuery dependency** (the new system is pure vanilla JS)

---

## 📄 License

Released under the [MIT License](LICENSE).

---

## ☕ Donations

If you find this tool useful, consider supporting its development via [PayPal](https://paypal.me/noealdac).
