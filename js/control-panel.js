/**
 * control-panel.js — Premium Lower Third Control Panel
 * ES6 Modular Architecture | BroadcastChannel API | OBS Studio
 *
 * Features:
 * - Tabbed sidebar navigation
 * - Real-time preview via BroadcastChannel
 * - Presets with localStorage
 * - Queue/playlist system
 * - Keyboard shortcuts
 * - Particle background effects
 * - Debounced updates
 */

// ═══════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ═══════════════════════════════════════════════

/** Convert Arabic digits (٠-٩) to Western (0-9) */
function convertArabicDigitsToWestern(str) {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[٠-٩]/g, (w) => arabicDigits.indexOf(w));
}

/** Auto-generate Hijri date using the Umm al-Qura calendar */
function getHijriDate() {
  try {
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    let formatted = formatter.format(new Date());
    formatted = convertArabicDigitsToWestern(formatted);
    const parts = formatted.split(' ');
    if (parts.length >= 3) {
      return `${parts[0]} / ${parts[1]} / ${parts[2]} هـ`;
    }
    return formatted + ' هـ';
  } catch (e) {
    return '٢٨ / ذو الحجة / ١٤٤٧ هـ';
  }
}

/** Debounce helper */
function debounce(fn, delay = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ═══════════════════════════════════════════════
//  PARTICLE BACKGROUND
// ═══════════════════════════════════════════════

function initParticles() {
  const container = document.getElementById('particlesBg');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.setProperty('--duration', `${12 + Math.random() * 18}s`);
    p.style.setProperty('--delay', `${Math.random() * 10}s`);
    p.style.setProperty('--dx', `${(Math.random() - 0.5) * 160}px`);
    p.style.setProperty('--dy', `${-80 - Math.random() * 200}px`);
    p.style.setProperty('--max-opacity', `${0.15 + Math.random() * 0.35}`);
    p.style.width = p.style.height = `${1 + Math.random() * 2}px`;
    container.appendChild(p);
  }
}

// ═══════════════════════════════════════════════
//  CONTROL PANEL CLASS
// ═══════════════════════════════════════════════

class ControlPanel {
  constructor() {
    this.apiOrigin = window.location.protocol.startsWith('http') ? window.location.origin : 'http://localhost:8080';
    // Style definitions — Polymorphic render.html architecture
    this.STYLES = [
      null,
      { file: 'templates/render.html', theme: 'emerald',        name: 'الذهب والزمرد',    gradient: 'linear-gradient(135deg,#0d5c3a,#c9a84c)' },
      { file: 'templates/render.html', theme: 'royal',          name: 'الليل الملكي',      gradient: 'linear-gradient(135deg,#0a1628,#00c4b8)' },
      { file: 'templates/render.html', theme: 'modern',         name: 'الأنيق الحديث',    gradient: 'linear-gradient(135deg,#111,#c9a84c)' },
      { file: 'templates/render.html', theme: 'fajr',           name: 'الفجر',            gradient: 'linear-gradient(135deg,#081e32,#c08040)' },
      { file: 'templates/render.html', theme: 'silver',         name: 'الأزرق الفضي',     gradient: 'linear-gradient(135deg,#1a2535,#a8b8cc)' },
      { file: 'templates/render.html', theme: 'heritage',       name: 'التراث والحداثة',   gradient: 'linear-gradient(135deg,#6b1a1a,#c9a84c)' },
      { file: 'templates/render.html', theme: 'glass',          name: 'الزجاج المضيء',    gradient: 'linear-gradient(135deg,rgba(255,255,255,0.2),#c9a84c)' },
      { file: 'templates/render.html', theme: 'saudi',          name: 'الأخضر السعودي',   gradient: 'linear-gradient(135deg,#006c35,#ffffff)' },
      { file: 'templates/render.html', theme: 'kufic',          name: 'الكوفي الهندسي',   gradient: 'linear-gradient(135deg,#131210,#b87333)' },
      { file: 'templates/render.html', theme: 'gold',           name: 'الذهبي الفاخر',    gradient: 'linear-gradient(135deg,#111111,#d4af37)' },
      { file: 'templates/render.html', theme: 'midnight',       name: 'الياقوت المنتصف',   gradient: 'linear-gradient(135deg,#0a0e2a,#4a90d9)' },
      { file: 'templates/render.html', theme: 'marble',         name: 'الرخام والذهب الوردي', gradient: 'linear-gradient(135deg,#e8e0d0,#c08060)' },
      { file: 'templates/render.html', theme: 'ramadan-green',  name: 'رمضان الأخضر والذهبي', gradient: 'linear-gradient(135deg,#05260f,#c9a84c)' },
      { file: 'templates/render.html', theme: 'ramadan-plum',   name: 'رمضان الأرجواني والذهبي', gradient: 'linear-gradient(135deg,#31064f,#c9a84c)' },
      { file: 'templates/render.html', theme: 'dynamic',        name: 'الجرافيك العصري الديناميكي', gradient: 'linear-gradient(135deg,#7a1a9e,#ffffff)' },
      { file: 'templates/render.html', theme: 'minimalist',     name: 'بسيط (Minimalist)',       gradient: '#ffffff' },
    ];

    // BroadcastChannel
    this.LT_CHANNEL = 'lt-control';
    this.channel = new BroadcastChannel(this.LT_CHANNEL);

    // State
    this.currentStyle = 1;
    this.isVisible = false;
    this.currentAlign = 'right';
    this.currentDuration = 0;
    this.currentBottom = 8;
    this.currentSideMargin = 3;
    this.currentLayoutDir = 'rtl';
    this.currentAnimStyle = 'slide-right';
    this.currentOrnament = 'none';
    this.currentColorBg = '';
    // Font Sizes
    this.nameSize = 100;
    this.titleSize = 100;
    this.locationSize = 100;
    this.dateSize = 100;
    this.currentColorAccent = '#ffffff';
    this.currentAnimStyle = '1';
    this.currentAnimSpeed = 'normal';
    this.currentLogo = null;
    this.countdownInterval = null;
    this.activeTab = 'text';
    this.shortcutsVisible = false;

    // Queue
    this.queue = [];
    this.queueAutoPlay = false;
    this.queueInterval = null;
    this.queueIndex = 0;

    // Debounced update
    this._debouncedUpdate = debounce(() => this.updateLT(), 100);
  }

  /** Initialize the control panel */
  init() {
    this._bindNavigation();
    this._bindActions();
    this._bindInputs();
    this._bindKeyboard();
    this._initDate();

    // Listen for drag updates from iframe
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'lt-drag-update') {
        const { x, y } = e.data;
        if (x !== undefined) {
          this.currentSideMargin = x;
          const sliderX = document.getElementById('sideMarginSlider');
          if (sliderX) { sliderX.value = x; document.getElementById('sideMarginVal').textContent = `${x}%`; }
        }
        if (y !== undefined) {
          this.currentBottom = y;
          const sliderY = document.getElementById('marginSlider');
          if (sliderY) { sliderY.value = y; document.getElementById('marginVal').textContent = `${y}%`; }
        }
        this._debouncedUpdate();
      }
    });

    // Preview
    this.updateLT();
    this._renderPresets();
    this._updateUrlDisplay();
    this._scalePreview();

    window.addEventListener('resize', () => this._scalePreview());

    // Activate first tab
    this.switchTab('text');

    // Update style name badge
    this._updateStyleBadge();
    
    // Load system fonts async
    this._loadSystemFonts();
  }

  // ─── Navigation ───────────────────────────

  _bindNavigation() {
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.addEventListener('click', () => {
        this.switchTab(el.dataset.tab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;

    // Update sidebar
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === tabId);
    });

    // Update panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${tabId}`);
    });
  }

  // ─── Actions (Show / Update / Hide) ───────

  _bindActions() {
    // Preview toolbar buttons
    document.getElementById('btnShow')?.addEventListener('click', () => this.showLT());
    document.getElementById('btnUpdate')?.addEventListener('click', () => this.updateLT());
    document.getElementById('btnHide')?.addEventListener('click', () => this.hideLT());

    // Mobile action buttons
    document.getElementById('btnShowMobile')?.addEventListener('click', () => this.showLT());
    document.getElementById('btnUpdateMobile')?.addEventListener('click', () => this.updateLT());
    document.getElementById('btnHideMobile')?.addEventListener('click', () => this.hideLT());

    // Add ripple effect to all buttons
    document.querySelectorAll('.btn, .preview-toolbar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this._createRipple(e, btn));
    });
  }

  _createRipple(event, button) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  showLT(fromSequencer = false) {
    if (!fromSequencer) {
      this._stopQueueAutoPlay();
    }
    const s = this._getAllSettings();

    // Broadcast to OBS
    this._broadcastCommand({ type: 'show', ...s });

    // Local preview
    const lt = this._getPreviewLT();
    if (lt) {
      this._applyToPreview(lt);
      lt.duration = 0;
      lt.enter();
    }

    this.isVisible = true;
    this._setStatus(true);

    if (this.currentDuration > 0) {
      this._startCountdown(this.currentDuration);
    }
  }

  hideLT(fromSequencer = false) {
    if (!fromSequencer) {
      this._stopQueueAutoPlay();
    }
    this._broadcastCommand({ type: 'hide' });
    this._getPreviewLT()?.exit();
    this.isVisible = false;
    this._stopCountdown();
    this._setStatus(false);
  }

  updateLT(fromSequencer = false) {
    if (!fromSequencer) {
      this._stopQueueAutoPlay();
    }
    const s = this._getAllSettings();
    this._broadcastCommand({ type: 'update', ...s });

    const lt = this._getPreviewLT();
    if (lt) this._applyToPreview(lt);

    this._updateUrlDisplay();
  }

  _broadcastCommand(cmd) {
    // 1. BroadcastChannel
    if (this.channel) {
      this.channel.postMessage(cmd);
    }
    // 2. localStorage
    try {
      localStorage.setItem('lt-cmd', JSON.stringify(cmd));
      localStorage.setItem('lt-cmd-time', Date.now().toString());
    } catch (e) {}
    // 3. API Server (100% bulletproof for OBS)
    try {
      fetch(`${this.apiOrigin}/api/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmd)
      }).catch(() => {});
    } catch (e) {}
  }

  // ─── Inputs ───────────────────────────────

  _bindInputs() {
    // Text inputs (debounced)
    ['nameInput', 'titleInput', 'locationInput', 'dateInput', 'fontInput'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this._debouncedUpdate());
        el.addEventListener('change', () => this._debouncedUpdate());
      }
    });

    // Alignment
    document.querySelectorAll('[data-align]').forEach(btn => {
      btn.addEventListener('click', () => this._setAlign(btn.dataset.align));
    });

    // Style selector
    document.querySelectorAll('[data-style]').forEach(card => {
      card.addEventListener('click', () => this._switchStyle(parseInt(card.dataset.style), card));
    });

    // Duration slider
    document.getElementById('durationSlider')?.addEventListener('input', (e) => {
      this.currentDuration = parseInt(e.target.value);
      const label = this.currentDuration === 0 ? '0 (مستمر)' : `${this.currentDuration}ث`;
      document.getElementById('durationVal').textContent = label;
    });

    // Bottom margin slider
    document.getElementById('marginSlider')?.addEventListener('input', (e) => {
      this.currentBottom = parseInt(e.target.value);
      document.getElementById('marginVal').textContent = `${this.currentBottom}%`;
      this._debouncedUpdate();
    });

    // Side margin slider
    document.getElementById('sideMarginSlider')?.addEventListener('input', (e) => {
      this.currentSideMargin = parseInt(e.target.value);
      document.getElementById('sideMarginVal').textContent = `${this.currentSideMargin}%`;
      this._debouncedUpdate();
    });

    // Layout Direction Select
    document.getElementById('layoutDirSelect')?.addEventListener('change', (e) => {
      this.currentLayoutDir = e.target.value;
      this._debouncedUpdate();
    });

    // Font size controls (+/-)
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target; // e.g., nameSize
        const action = btn.dataset.action; // increase or decrease
        if (!target) return;
        
        let current = this[target] || 100;
        if (action === 'increase') {
          current += 10;
          if (current > 300) current = 300;
        } else {
          current -= 10;
          if (current < 30) current = 30;
        }
        this[target] = current;
        
        const display = document.getElementById(`${target}Display`);
        if (display) display.textContent = `${current}%`;
        
        this._debouncedUpdate();
      });
    });

    // Animation Speed select
    document.getElementById('animationSpeed')?.addEventListener('change', (e) => {
      this.currentAnimSpeed = e.target.value;
      this._debouncedUpdate();
    });

    // Animation select
    document.getElementById('animSelect')?.addEventListener('change', (e) => {
      this.currentAnimStyle = e.target.value;
      this.updateLT();
      this._getFrame().src = this._buildUrl(this.currentStyle);
    });

    // Ornament select
    document.getElementById('ornamentSelect')?.addEventListener('change', (e) => {
      this.currentOrnament = e.target.value;
      this.updateLT();
      this._getFrame().src = this._buildUrl(this.currentStyle);
    });

    // Color pickers
    ['colorBg', 'colorText', 'colorAccent'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this._onColorChange());
    });

    // Reset colors
    document.getElementById('btnResetColors')?.addEventListener('click', () => this._resetColors());

    // Logo upload
    document.getElementById('logoInput')?.addEventListener('change', (e) => this._onLogoChange(e));
    document.getElementById('btnRemoveLogo')?.addEventListener('click', () => this._removeLogo());

    // Preview background
    document.getElementById('previewBgInput')?.addEventListener('change', (e) => this._onPreviewBgChange(e));

    // Dynamic Data
    document.getElementById('btnAutoDate')?.addEventListener('click', () => {
      this._stopLiveClock();
      const dateInput = document.getElementById('dateInput');
      if (dateInput) dateInput.value = getHijriDate();
    });
    
    document.getElementById('btnLiveClock')?.addEventListener('click', () => {
      this._toggleLiveClock();
    });

    // Preset buttons
    document.getElementById('btnSavePreset')?.addEventListener('click', () => this._savePreset());
    document.getElementById('btnExportPresets')?.addEventListener('click', () => this._exportPresets());
    document.getElementById('importPresetsInput')?.addEventListener('change', (e) => this._importPresets(e));

    // Queue buttons
    document.getElementById('btnQueueAdd')?.addEventListener('click', () => this._addToQueue());
    document.getElementById('btnQueueAutoPlay')?.addEventListener('click', () => this._toggleQueueAutoPlay());
    document.getElementById('btnQueueClear')?.addEventListener('click', () => this._clearQueue());
    document.getElementById('btnQueueExport')?.addEventListener('click', () => this._exportQueue());
    document.getElementById('btnQueueImport')?.addEventListener('click', () => this._importQueue());

    // Shortcuts overlay
    document.getElementById('btnShortcuts')?.addEventListener('click', () => this._toggleShortcuts());
    document.getElementById('shortcutsOverlay')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this._toggleShortcuts();
    });

    // Footer URL copy
    document.getElementById('footerUrl')?.addEventListener('click', () => this._copyUrl());
  }

  // ─── Keyboard ─────────────────────────────

  _bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Don't capture when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          this.isVisible ? this.hideLT() : this.showLT();
          break;
        case 'Escape':
          if (this.shortcutsVisible) {
            this._toggleShortcuts();
          } else {
            this.hideLT();
          }
          break;
        case '?':
          e.preventDefault();
          this._toggleShortcuts();
          break;
        case '1': case '2': case '3': case '4': case '5':
        case '6': case '7': case '8': case '9':
          if (e.altKey) {
            e.preventDefault();
            const num = parseInt(e.key);
            const card = document.querySelector(`[data-style="${num}"]`);
            if (card) this._switchStyle(num, card);
          }
          break;
        case '0':
          if (e.altKey) {
            e.preventDefault();
            const card = document.querySelector(`[data-style="10"]`);
            if (card) this._switchStyle(10, card);
          }
          break;
      }
    });
  }

  // ─── State Helpers ────────────────────────

  _getFrame() {
    return document.getElementById('previewFrame');
  }

  _getPreviewLT() {
    try {
      return this._getFrame()?.contentWindow?.LT;
    } catch {
      return null;
    }
  }

  _getName()     { return document.getElementById('nameInput')?.value     || ''; }
  _getTitle()    { return document.getElementById('titleInput')?.value    || ''; }
  _getLocation() { return document.getElementById('locationInput')?.value || ''; }
  _getDate()     { return document.getElementById('dateInput')?.value     || ''; }
  _getFont()     { return document.getElementById('fontInput')?.value     || ''; }
  
  _getNameSize()     { return this.nameSize; }
  _getTitleSize()    { return this.titleSize; }
  _getLocationSize() { return this.locationSize; }
  _getDateSize()     { return this.dateSize; }

  _getAllSettings() {
    const activeStyle = this.STYLES[this.currentStyle];
    return {
      styleFile: activeStyle ? activeStyle.file : '',
      name: this._getName(),
      title: this._getTitle(),
      location: this._getLocation(),
      date: this._getDate(),
      font: this._getFont(),
      nameSize: this._getNameSize(),
      titleSize: this._getTitleSize(),
      locationSize: this._getLocationSize(),
      dateSize: this._getDateSize(),
      align: this.currentAlign,
      duration: this.currentDuration,
      bottomMargin: this.currentBottom,
      sideMargin: this.currentSideMargin,
      colorBg: this.currentColorBg,
      colorText: this.currentColorText,
      colorAccent: this.currentColorAccent,
      animStyle: this.currentAnimStyle,
      animSpeed: this.currentAnimSpeed,
      logo: this.currentLogo,
      ornament: this.currentOrnament,
      layoutDir: this.currentLayoutDir,
    };
  }

  _buildUrl(styleIdx) {
    const style = this.STYLES[styleIdx];
    if (!style) return '';
    const s = this._getAllSettings();
    const params = new URLSearchParams({
      style: style.theme,
      name: s.name, title: s.title, location: s.location,
      date: s.date, font: s.font, align: s.align,
      nameSize: s.nameSize, titleSize: s.titleSize,
      locationSize: s.locationSize, dateSize: s.dateSize,
      duration: s.duration, bottomMargin: s.bottomMargin, sideMargin: s.sideMargin,
      anim: s.animStyle, ornament: s.ornament, layoutDir: s.layoutDir, autostart: 'false'
    });
    if (s.colorBg) params.set('colorBg', s.colorBg);
    if (s.colorText) params.set('colorText', s.colorText);
    if (s.colorAccent) params.set('colorAccent', s.colorAccent);
    if (s.logo) params.set('logo', s.logo);
    return `${style.file}?${params.toString()}`;
  }

  _applyToPreview(lt) {
    if (!lt) return;
    const s = this._getAllSettings();
    Object.assign(lt, {
      name: s.name, title: s.title, location: s.location,
      date: s.date, font: s.font, align: s.align,
      nameSize: s.nameSize, titleSize: s.titleSize,
      locationSize: s.locationSize, dateSize: s.dateSize,
      duration: 0, bottomMargin: s.bottomMargin, sideMargin: s.sideMargin,
      colorBg: s.colorBg, colorText: s.colorText,
      colorAccent: s.colorAccent, animStyle: s.animStyle,
      logo: s.logo, ornament: s.ornament, layoutDir: s.layoutDir,
    });
    lt._applyAll();
  }

  _setStatus(live) {
    const dot = document.getElementById('statusDot');
    const badge = document.getElementById('statusBadge');
    const text = document.getElementById('statusText');

    dot?.classList.toggle('on', live);
    badge?.classList.toggle('live', live);
    if (text) text.textContent = live ? 'مباشر' : 'غير نشط';
  }

  _updateStyleBadge() {
    const badge = document.getElementById('styleNameBadge');
    const style = this.STYLES[this.currentStyle];
    if (badge && style) badge.textContent = style.name;
  }

  // ─── Style Switching (Hot-Swap via postMessage) ─────────────────────

  _switchStyle(num, card) {
    const wasVisible = this.isVisible;
    const prevStyle = this.currentStyle;
    this.currentStyle = num;
    document.querySelectorAll('[data-style]').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    
    const style = this.STYLES[num];
    const frame = this._getFrame();
    
    // Hot-swap: send change-style message to iframe without reload
    // Only reload iframe if it hasn't been initialized yet (first load)
    if (frame && frame.contentWindow && prevStyle > 0) {
      try {
        frame.contentWindow.postMessage({ type: 'change-style', style: style.theme }, '*');
      } catch (e) {
        // Fallback: reload iframe if postMessage fails (cross-origin)
        frame.src = this._buildUrl(num);
      }
    } else {
      frame.src = this._buildUrl(num);
    }
    
    // Also broadcast for OBS browser sources
    this._broadcastCommand({ type: 'change-style', style: style.theme });
    
    this._updateUrlDisplay();
    this._updateStyleBadge();
    
    if (wasVisible) {
      // Give the theme a moment to apply before showing
      setTimeout(() => this.showLT(), 200);
    } else {
      this.isVisible = false;
      this._stopCountdown();
      this._setStatus(false);
      setTimeout(() => this.updateLT(), 200);
    }
  }

  async _loadSystemFonts() {
    const fontOptions = document.getElementById('fontOptions');
    const fontInput = document.getElementById('fontInput');
    if (!fontOptions || !fontInput) return;
    
    let fontList = [];
    
    try {
      if ('queryLocalFonts' in window) {
        const fonts = await window.queryLocalFonts();
        const fontSet = new Set();
        fonts.forEach(f => fontSet.add(f.family));
        fontList = Array.from(fontSet).sort();
      }
    } catch(e) {
      console.warn('Local Font API denied or failed', e);
    }
    
    if (fontList.length === 0) {
      try {
        const res = await fetch(`${this.apiOrigin}/api/fonts`);
        if (res.ok) {
          fontList = await res.json();
        }
      } catch(e) {}
    }
    
    if (fontList.length === 0) {
      fontList = [
        'Cairo', 'Tajawal', 'Almarai', 'Changa', 'Amiri', 'Arial', 'Times New Roman', 'Helvetica', 'Courier New', 'Verdana', 'Tahoma'
      ];
    }
    
    // Ensure Thmanyah and premium fonts are at the top and Thmanyah is absolute first
    const preferredFonts = ['Thmanyah', 'Cairo', 'Tajawal', 'Almarai', 'Changa', 'Amiri'];
    fontList = preferredFonts.concat(fontList.filter(f => !preferredFonts.includes(f)));
    
    const renderOptions = (list) => {
      fontOptions.innerHTML = '';
      if (list.length === 0) {
        fontOptions.innerHTML = '<div class="custom-option" style="color:#666;">لا يوجد نتائج</div>';
        return;
      }
      list.forEach(font => {
        const option = document.createElement('div');
        option.className = 'custom-option';
        option.textContent = font;
        option.style.fontFamily = font;
        option.addEventListener('mousedown', (e) => {
          // Use mousedown instead of click to prevent input blur hiding it before click registers
          e.preventDefault();
          fontInput.value = font;
          fontOptions.classList.add('hidden');
          fontInput.dispatchEvent(new Event('input', { bubbles: true }));
          fontInput.dispatchEvent(new Event('change', { bubbles: true }));
        });
        fontOptions.appendChild(option);
      });
    };

    renderOptions(fontList);
    
    fontInput.placeholder = 'ابحث أو اختر من القائمة...';

    // Show/Hide logic
    fontInput.addEventListener('focus', () => {
      fontOptions.classList.remove('hidden');
      renderOptions(fontList); // reset list
    });

    fontInput.addEventListener('blur', () => {
      setTimeout(() => fontOptions.classList.add('hidden'), 150);
    });

    // Filter logic
    fontInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      fontOptions.classList.remove('hidden');
      const filtered = fontList.filter(f => f.toLowerCase().includes(val));
      renderOptions(filtered);
      this._debouncedUpdate();
    });
  }

  // ─── Alignment ────────────────────────────

  _setAlign(val) {
    this.currentAlign = val;
    document.querySelectorAll('[data-align]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.align === val);
    });
    this.updateLT();
    this._getFrame().src = this._buildUrl(this.currentStyle);
  }

  // ─── Timer / Countdown ────────────────────

  _startCountdown(seconds) {
    this._stopCountdown();
    let remaining = seconds;
    const badge = document.getElementById('countdownBadge');
    const valEl = document.getElementById('countdownVal');
    if (badge) badge.classList.remove('hidden');
    if (valEl) valEl.textContent = remaining;

    this.countdownInterval = setInterval(() => {
      remaining--;
      if (valEl) valEl.textContent = remaining;
      if (remaining <= 0) this.hideLT();
    }, 1000);
  }

  _stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    document.getElementById('countdownBadge')?.classList.add('hidden');
  }

  // ─── Colors ───────────────────────────────

  _onColorChange() {
    this.currentColorBg = document.getElementById('colorBg')?.value || '';
    this.currentColorText = document.getElementById('colorText')?.value || '';
    this.currentColorAccent = document.getElementById('colorAccent')?.value || '';
    this.updateLT();
  }

  _resetColors() {
    this.currentColorBg = '';
    this.currentColorText = '';
    this.currentColorAccent = '';
    const bgEl = document.getElementById('colorBg');
    const textEl = document.getElementById('colorText');
    const accentEl = document.getElementById('colorAccent');
    if (bgEl) bgEl.value = '#0d5c3a';
    if (textEl) textEl.value = '#ffffff';
    if (accentEl) accentEl.value = '#c9a84c';
    this.updateLT();
    this._getFrame().src = this._buildUrl(this.currentStyle);
  }

  // ─── Logo ─────────────────────────────────

  _onLogoChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.currentLogo = e.target.result;
      const label = document.getElementById('logoLabel');
      if (label) label.textContent = `✅ ${file.name}`;
      const btn = document.getElementById('btnRemoveLogo');
      if (btn) btn.disabled = false;
      this.updateLT();
      this._getFrame().src = this._buildUrl(this.currentStyle);
    };
    reader.readAsDataURL(file);
  }

  _removeLogo() {
    this.currentLogo = '';
    const input = document.getElementById('logoInput');
    const label = document.getElementById('logoLabel');
    const btn = document.getElementById('btnRemoveLogo');
    if (input) input.value = '';
    if (label) label.textContent = '📁 اختر صورة من الجهاز...';
    if (btn) btn.disabled = true;
    this.updateLT();
    this._getFrame().src = this._buildUrl(this.currentStyle);
  }

  // ─── Preview Background ───────────────────

  _onPreviewBgChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const previewBg = document.querySelector('.preview-bg');
    if (!previewBg) return;

    const existing = previewBg.querySelector('.preview-media');
    if (existing) existing.remove();

    if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.className = 'preview-media';
      video.src = url;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      previewBg.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.className = 'preview-media';
      img.src = url;
      previewBg.appendChild(img);
    }
    const label = document.getElementById('previewBgLabel');
    if (label) label.textContent = `✅ ${file.name}`;
  }

  // ─── Presets ──────────────────────────────

  _getPresets() {
    try { return JSON.parse(localStorage.getItem('lt-presets') || '[]'); }
    catch { return []; }
  }

  _savePresetsToStorage(presets) {
    localStorage.setItem('lt-presets', JSON.stringify(presets));
  }

  _savePreset() {
    const presets = this._getPresets();
    presets.unshift({
      id: Date.now(),
      name: this._getName(),
      title: this._getTitle(),
      location: this._getLocation(),
      date: this._getDate(),
      font: this._getFont(),
    });
    this._savePresetsToStorage(presets);
    this._renderPresets();
  }

  _loadPreset(id) {
    const preset = this._getPresets().find(p => p.id === id);
    if (!preset) return;
    document.getElementById('nameInput').value = preset.name;
    document.getElementById('titleInput').value = preset.title;
    document.getElementById('locationInput').value = preset.location;
    document.getElementById('dateInput').value = preset.date;
    if (preset.font) document.getElementById('fontInput').value = preset.font;
    this.updateLT();
  }

  _deletePreset(id) {
    const presets = this._getPresets().filter(p => p.id !== id);
    this._savePresetsToStorage(presets);
    this._renderPresets();
  }

  _renderPresets() {
    const presets = this._getPresets();
    const container = document.getElementById('presetsList');
    if (!container) return;

    if (presets.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          لا توجد بيانات محفوظة بعد. اضغط "حفظ" لإضافة أول preset.
        </div>`;
      return;
    }

    container.innerHTML = presets.map(p => `
      <div class="preset-item" data-preset-id="${p.id}">
        <div>
          <div class="preset-name">${this._escapeHtml(p.name)}</div>
          <div class="preset-sub">${this._escapeHtml(p.title)} • ${this._escapeHtml(p.location || '—')}</div>
        </div>
        <button class="preset-delete" data-preset-delete="${p.id}" title="حذف">✕</button>
      </div>
    `).join('');

    // Bind events via delegation
    container.querySelectorAll('.preset-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.preset-delete')) return;
        this._loadPreset(parseInt(item.dataset.presetId));
      });
    });

    container.querySelectorAll('.preset-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._deletePreset(parseInt(btn.dataset.presetDelete));
      });
    });
  }

  _exportPresets() {
    const presets = this._getPresets();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(presets, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `LT_Presets_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  _importPresets(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const presets = JSON.parse(event.target.result);
        if (Array.isArray(presets)) {
          localStorage.setItem('lt-presets', JSON.stringify(presets));
          this._renderPresets();
          alert('✅ تم استيراد البيانات بنجاح!');
        }
      } catch (err) {
        alert('❌ خطأ في استيراد الملف.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset
  }

  // ─── Queue System ─────────────────────────

  _addToQueue() {
    this.queue.push({
      id: Date.now(),
      name: this._getName(),
      title: this._getTitle(),
      location: this._getLocation(),
      date: this._getDate(),
      font: this._getFont(),
    });
    this._renderQueue();
  }

  _removeFromQueue(id) {
    this.queue = this.queue.filter(q => q.id !== id);
    this._renderQueue();
  }

  _clearQueue() {
    this.queue = [];
    this._stopQueueAutoPlay();
    this._renderQueue();
  }

  _toggleQueueAutoPlay() {
    this.queueAutoPlay = !this.queueAutoPlay;
    const btn = document.getElementById('btnQueueAutoPlay');
    if (btn) btn.classList.toggle('active', this.queueAutoPlay);

    if (this.queueAutoPlay && this.queue.length > 0) {
      this.queueIndex = 0;
      this._sequencerPlay();
    } else {
      this._stopQueueAutoPlay();
    }
  }

  /** Animation-end-aware sequencer: exit → swap → enter → wait → repeat */
  _sequencerPlay() {
    if (!this.queueAutoPlay || this.queue.length === 0) return;
    
    const item = this.queue[this.queueIndex];
    if (!item) return;
    
    // Load data into inputs
    document.getElementById('nameInput').value = item.name;
    document.getElementById('titleInput').value = item.title;
    document.getElementById('locationInput').value = item.location;
    document.getElementById('dateInput').value = item.date;
    if (item.font) document.getElementById('fontInput').value = item.font;
    
    // If currently visible, exit first, then re-enter with new data
    if (this.isVisible) {
      this.hideLT();
      // Wait for exit animation to complete (600ms matches controller.js exit timeout)
      const transitionGap = parseInt(document.getElementById('seqGapInput')?.value) || 800;
      setTimeout(() => {
        this.showLT();
        this._scheduleNextQueueItem();
      }, transitionGap);
    } else {
      this.showLT();
      this._scheduleNextQueueItem();
    }
    
    // Update visual indicator
    this._highlightQueueItem(this.queueIndex);
  }
  
  _scheduleNextQueueItem() {
    const displayMs = (parseInt(document.getElementById('seqDurationInput')?.value) || 10) * 1000;
    const loopMode = document.getElementById('seqLoopToggle')?.checked !== false;
    
    this.queueTimeout = setTimeout(() => {
      this.queueIndex++;
      if (this.queueIndex >= this.queue.length) {
        if (loopMode) {
          this.queueIndex = 0;
        } else {
          this._stopQueueAutoPlay();
          return;
        }
      }
      this._sequencerPlay();
    }, displayMs);
  }
  
  _highlightQueueItem(index) {
    document.querySelectorAll('.queue-item').forEach((el, i) => {
      el.classList.toggle('queue-item-active', i === index);
    });
  }

  _stopQueueAutoPlay() {
    this.queueAutoPlay = false;
    if (this.queueInterval) {
      clearInterval(this.queueInterval);
      this.queueInterval = null;
    }
    if (this.queueTimeout) {
      clearTimeout(this.queueTimeout);
      this.queueTimeout = null;
    }
    const btn = document.getElementById('btnQueueAutoPlay');
    if (btn) btn.classList.remove('active');
    // Remove active highlight from all queue items
    document.querySelectorAll('.queue-item').forEach(el => el.classList.remove('queue-item-active'));
  }

  _playQueueItem(index) {
    const item = this.queue[index];
    if (!item) return;
    document.getElementById('nameInput').value = item.name;
    document.getElementById('titleInput').value = item.title;
    document.getElementById('locationInput').value = item.location;
    document.getElementById('dateInput').value = item.date;
    if (item.font) document.getElementById('fontInput').value = item.font;
    this.hideLT();
    const transitionGap = parseInt(document.getElementById('seqGapInput')?.value) || 800;
    setTimeout(() => this.showLT(), transitionGap);
  }

  _exportQueue() {
    if (this.queue.length === 0) return;
    const blob = new Blob([JSON.stringify(this.queue, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lower-thirds-queue.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  _importQueue() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (Array.isArray(data)) {
            this.queue = data;
            this._renderQueue();
          }
        } catch (err) {
          console.error('Failed to import queue:', err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  _renderQueue() {
    const container = document.getElementById('queueList');
    if (!container) return;

    if (this.queue.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📑</div>
          أضف عناصر من البيانات الحالية لبدء قائمة التشغيل
        </div>`;
      return;
    }

    container.innerHTML = this.queue.map((item, i) => `
      <div class="queue-item" data-queue-id="${item.id}">
        <span class="queue-drag">⠿</span>
        <div class="queue-info">
          <div class="queue-name">${this._escapeHtml(item.name)}</div>
          <div class="queue-title">${this._escapeHtml(item.title)}</div>
        </div>
        <button class="queue-remove" data-queue-remove="${item.id}" title="إزالة">✕</button>
      </div>
    `).join('');

    // Bind removal
    container.querySelectorAll('.queue-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._removeFromQueue(parseInt(btn.dataset.queueRemove));
      });
    });

    // Bind click to play
    container.querySelectorAll('.queue-item').forEach((item, i) => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.queue-remove')) return;
        this._playQueueItem(i);
      });
    });
  }

  // ─── Shortcuts Overlay ────────────────────

  _toggleShortcuts() {
    this.shortcutsVisible = !this.shortcutsVisible;
    const overlay = document.getElementById('shortcutsOverlay');
    if (overlay) overlay.classList.toggle('visible', this.shortcutsVisible);
  }

  // ─── URL Display / Copy ───────────────────

  _updateUrlDisplay() {
    const base = `${window.location.origin}${window.location.pathname.replace('index.html', '')}`;
    const url = `${base}${this._buildUrl(this.currentStyle).replace('&autostart=false', '')}`;

    const footerUrl = document.getElementById('footerUrl');
    const urlDisplay = document.getElementById('urlDisplay');
    if (footerUrl) footerUrl.textContent = url;
    if (urlDisplay) urlDisplay.textContent = url;
  }

  _copyUrl() {
    const base = `${window.location.origin}${window.location.pathname.replace('index.html', '')}`;
    const url = `${base}${this._buildUrl(this.currentStyle)}`;
    navigator.clipboard?.writeText(url);

    const el = document.getElementById('footerUrl') || document.getElementById('urlDisplay');
    if (el) {
      el.style.color = 'var(--gold-light)';
      setTimeout(() => { el.style.color = ''; }, 1200);
    }
  }

  // ─── Preview Scaling ──────────────────────

  _scalePreview() {
    const wrapper = document.querySelector('.preview-wrapper');
    const frame = this._getFrame();
    if (!wrapper || !frame) return;
    const w = wrapper.clientWidth;
    const scale = w / 1920;
    frame.style.transform = `scale(${scale})`;
    frame.style.width = '1920px';
    frame.style.height = '1080px';
    frame.style.transformOrigin = 'top right';
  }

  // ─── Init Helpers ─────────────────────────

  _initDate() {
    const dateInput = document.getElementById('dateInput');
    if (dateInput) dateInput.value = getHijriDate();
  }

  _toggleLiveClock() {
    this.isLiveClock = !this.isLiveClock;
    const btn = document.getElementById('btnLiveClock');
    if (btn) btn.classList.toggle('active', this.isLiveClock);
    
    if (this.isLiveClock) {
      const updateClock = () => {
        const dateInput = document.getElementById('dateInput');
        if (dateInput) {
          const now = new Date();
          const timeString = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          dateInput.value = timeString;
          this.updateLT(); // Auto-update the lower third if visible
        }
      };
      updateClock();
      this.liveClockInterval = setInterval(updateClock, 1000);
    } else {
      this._stopLiveClock();
    }
  }

  _stopLiveClock() {
    this.isLiveClock = false;
    if (this.liveClockInterval) {
      clearInterval(this.liveClockInterval);
      this.liveClockInterval = null;
    }
    const btn = document.getElementById('btnLiveClock');
    if (btn) btn.classList.remove('active');
  }

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
}

// ═══════════════════════════════════════════════
//  INIT ON DOM READY
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  window.controlPanel = new ControlPanel();
  window.controlPanel.init();
});
