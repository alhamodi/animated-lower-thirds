/**
 * controller.js - Lower Third Real-time Controller
 * Uses BroadcastChannel for instant OBS communication
 * Supports URL params: ?name=...&title=...&autostart=false
 * 
 * Features:
 * - Text (name, title, location, date, font)
 * - Alignment (left, center, right)
 * - Auto-hide timer (duration in seconds)
 * - Bottom margin control
 * - Custom colors (bg, text, accent)
 * - Animation style (slide-right, slide-left, fade, scale, slide-up)
 * - Logo/image display
 * - Islamic ornament overlays
 */

const LT_CHANNEL = 'lt-control';

// Convert Arabic numbers to Western numbers
function convertArabicDigitsToWestern(str) {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[٠-٩]/g, (w) => arabicDigits.indexOf(w));
}

// Hijri date auto-generator
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
      return `${parts[0]} / ${parts[1]} / ${parts[2]} هجري`;
    }
    return formatted + ' هجري';
  } catch (e) {
    return '٢٨ / ذو الحجة / ١٤٤٧ هجري';
  }
}

class LowerThirdController {
  constructor() {
    this.params   = new URLSearchParams(window.location.search);
    this.apiOrigin = window.location.protocol.startsWith('http') ? window.location.origin : 'http://localhost:8080';
    this.name     = this.params.get('name')  || '';
    this.title    = this.params.get('title') || '';
    this.location = this.params.get('location') || '';
    this.date     = this.params.get('date')     || '';
    this.font     = this.params.get('font')     || '';
    this.align    = this.params.get('align')    || 'right';
    this.autostart = this.params.get('autostart') !== 'false';
    this.duration  = parseInt(this.params.get('duration') || '0');

    this.nameSize     = parseInt(this.params.get('nameSize') || '100');
    this.titleSize    = parseInt(this.params.get('titleSize') || '100');
    this.locationSize = parseInt(this.params.get('locationSize') || '100');
    this.dateSize     = parseInt(this.params.get('dateSize') || '100');

    // Parse margins with backward compatibility (detect pixel values > 20 and convert to %)
    let parsedBottom = parseInt(this.params.get('bottomMargin') || this.params.get('bottom') || '8');
    if (parsedBottom > 20) {
      parsedBottom = Math.round((parsedBottom / 1080) * 100);
    }
    this.bottomMargin = parsedBottom;

    let parsedSide = parseInt(this.params.get('sideMargin') || '3');
    if (parsedSide > 20) {
      parsedSide = Math.round((parsedSide / 1920) * 100);
    }
    this.sideMargin = parsedSide;

    this.colorBg     = this.params.get('colorBg')     || '';
    this.colorText   = this.params.get('colorText')   || '';
    this.colorAccent = this.params.get('colorAccent') || '';
    this.animStyle   = this.params.get('anim')        || 'slide-right';
    this.animSpeed   = this.params.get('animSpeed')   || 'normal';
    this.logo        = this.params.get('logo')        || '';
    this.ornament    = this.params.get('ornament')    || 'none';
    this.layoutDir   = this.params.get('layoutDir')   || 'rtl';

    this.wrapper  = null;
    this.nameEl   = null;
    this.titleEl  = null;
    this.locationEl = null;
    this.dateEl   = null;
    this.panelEl  = null;
    this.state    = 'hidden';
    this.timer    = null;

    // BroadcastChannel: receive commands from control panel
    this.channel = new BroadcastChannel('lt-control');
    this.channel.onmessage = (e) => this._handleCommand(e.data);
    
    // Fallback 1: listen to localStorage events for OBS Custom Docks communication
    window.addEventListener('storage', (e) => {
      if (e.key === 'lt-cmd' && e.newValue) {
        try {
          this._handleCommand(JSON.parse(e.newValue));
        } catch (err) {}
      }
    });

    // Fallback 2: API Polling (100% Bulletproof for OBS isolated sources)
    this.lastCmdString = '';
    setInterval(() => {
      fetch(`${this.apiOrigin}/api/command`)
        .then(res => res.json())
        .then(cmd => {
          const cmdString = JSON.stringify(cmd);
          if (cmd && cmd.type && cmdString !== this.lastCmdString) {
            this.lastCmdString = cmdString;
            this._handleCommand(cmd);
          }
        })
        .catch(() => {});
    }, 250);
  }

  init() {
    this.wrapper    = document.querySelector('.lower-third-wrapper');
    this.nameEl     = document.querySelector('.lt-name');
    this.titleEl    = document.querySelector('.lt-title');
    this.locationEl = document.querySelector('.lt-location');
    this.dateEl     = document.querySelector('.lt-date');
    this.panelEl    = document.querySelector('.lt-panel');
    this._applyText();
    this._applyAlign();
    this._applyMargins();
    this._applyColors();
    this._applyAnimStyle();
    this._applyLogo();
    this._applyOrnament();

    if (this.autostart) {
      setTimeout(() => this.enter(), 600);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') this.toggle();
      if (e.key === 'Escape') this.exit();
    });

    // Auto-scaling for responsiveness
    this._setupAutoScaling();

    // Init Draggable if inside iframe
    if (window !== window.parent) {
      this._initDraggable();
    }
  }

  _initDraggable() {
    if (!this.wrapper) return;
    this.wrapper.style.cursor = 'move';
    this.wrapper.style.pointerEvents = 'auto'; // Ensure pointer events are active in preview iframe

    // Prevent duplicate window event listeners
    if (this._onMouseMoveRef) {
      window.removeEventListener('mousemove', this._onMouseMoveRef);
    }
    if (this._onMouseUpRef) {
      window.removeEventListener('mouseup', this._onMouseUpRef);
    }

    let isDragging = false;
    let startX = 0, startY = 0;
    let initialBottom = 0, initialSide = 0;
    let rafId = null;
    let pendingDx = 0, pendingDy = 0;

    const onMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON') return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialBottom = this.bottomMargin;
      initialSide = this.sideMargin;
      e.preventDefault();
    };

    const applyDrag = () => {
      rafId = null;
      
      // Calculate delta in percentage of actual window/iframe dimensions
      const dxPercent = (pendingDx / window.innerWidth) * 100;
      const dyPercent = (pendingDy / window.innerHeight) * 100;

      // Update margins in percentages (clamp bottom between 0% and 90%)
      this.bottomMargin = Math.max(0, Math.min(90, initialBottom - dyPercent));

      if (this.align === 'left') {
        this.sideMargin = Math.max(0, Math.min(90, initialSide + dxPercent));
      } else if (this.align === 'right') {
        this.sideMargin = Math.max(0, Math.min(90, initialSide - dxPercent));
      }

      this._applyMargins();

      // Post percentage coordinates back to parent control panel
      window.parent.postMessage({
        type: 'lt-drag-update',
        x: Math.round(this.sideMargin),
        y: Math.round(this.bottomMargin)
      }, '*');
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      pendingDx = e.clientX - startX;
      pendingDy = e.clientY - startY;
      if (!rafId) {
        rafId = requestAnimationFrame(applyDrag);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    this.wrapper.addEventListener('mousedown', onMouseDown);
    
    // Store references for cleanup
    this._onMouseMoveRef = onMouseMove;
    this._onMouseUpRef = onMouseUp;
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  _setupAutoScaling() {
    const scale = () => {
      // In OBS, innerWidth can initially be 0 during load. Fallback to 1920x1080.
      const w = window.innerWidth > 0 ? window.innerWidth : 1920;
      const h = window.innerHeight > 0 ? window.innerHeight : 1080;
      
      const widthScale = w / 1920;
      const heightScale = h / 1080;
      // Don't scale up past 1, only scale down
      const targetScale = Math.min(widthScale, heightScale, 1);
      
      if (targetScale !== 1) {
        document.body.style.transform = `scale(${targetScale})`;
        document.body.style.transformOrigin = 'top right'; // RTL default
      } else {
        document.body.style.transform = '';
      }
    };
    
    window.addEventListener('resize', scale);
    scale();
    // Safety check: run again after a short delay in case OBS takes a moment to set viewport
    setTimeout(scale, 500);
  }

  _applyText() {
    // Check if name (main title) is empty or just spaces
    if (this.wrapper) {
      if (!this.name || this.name.trim() === '') {
        this.wrapper.classList.add('lt-empty-title');
      } else {
        this.wrapper.classList.remove('lt-empty-title');
      }
    }

    const setFontFamily = (element) => {
      if (!element) return;
      if (this.font) {
        const sanitizedFont = this.font.replace(/['"]/g, '');
        element.style.setProperty('font-family', `"${sanitizedFont}", sans-serif`, 'important');
      } else {
        element.style.removeProperty('font-family');
      }
    };

    if (this.nameEl) {
      this.nameEl.textContent = this.name;
      setFontFamily(this.nameEl);
      this.nameEl.style.fontSize = this.nameSize === 100 ? '' : `${this.nameSize}%`;
    }
    if (this.titleEl) {
      this.titleEl.textContent = this.title;
      setFontFamily(this.titleEl);
      this.titleEl.style.fontSize = this.titleSize === 100 ? '' : `${this.titleSize}%`;
    }
    if (this.locationEl) {
      this.locationEl.textContent = this.location;
      setFontFamily(this.locationEl);
      this.locationEl.style.fontSize = this.locationSize === 100 ? '' : `${this.locationSize}%`;
    }
    if (this.dateEl) {
      this.dateEl.textContent = this.date;
      setFontFamily(this.dateEl);
      this.dateEl.style.fontSize = this.dateSize === 100 ? '' : `${this.dateSize}%`;
    }
    
    // Auto-fit text to prevent overflow clipping
    this._autoFitText();
  }

  /**
   * Module 4: Dynamic Typography Engine — Auto Text Scaling
   * Measures text elements against panel width and scales down if they overflow.
   * Uses transform: scale() for GPU-accelerated, non-layout-breaking downsizing.
   * Maximum downscale: 60% to maintain readability.
   */
  _autoFitText() {
    if (!this.panelEl) return;
    const panelWidth = this.panelEl.clientWidth;
    if (panelWidth <= 0) return;
    
    const threshold = 0.92; // 92% of panel width triggers scaling
    const minScale = 0.6;   // Never scale below 60%
    
    [this.nameEl, this.titleEl].forEach(el => {
      if (!el) return;
      // Reset any previous scaling to get true measurement
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.whiteSpace = 'nowrap';
      
      // Wait one frame for the layout to settle after reset
      requestAnimationFrame(() => {
        const scrollW = el.scrollWidth;
        const maxW = panelWidth * threshold;
        
        if (scrollW > maxW && scrollW > 0) {
          const ratio = Math.max(minScale, maxW / scrollW);
          const origin = (this.layoutDir === 'ltr') ? 'left center' : 'right center';
          el.style.transform = `scale(${ratio.toFixed(3)})`;
          el.style.transformOrigin = origin;
          el.style.willChange = 'transform';
        } else {
          el.style.transform = '';
          el.style.willChange = '';
        }
        // Restore wrapping for short text
        el.style.whiteSpace = '';
      });
    });
  }

  _applyAlign() {
    if (this.wrapper) {
      this.wrapper.classList.remove('lt-align-left', 'lt-align-center', 'lt-align-right');
      this.wrapper.classList.add(`lt-align-${this.align}`);
    }
  }

  _applyMargins() {
    if (this.wrapper) {
      this.wrapper.style.bottom = `${this.bottomMargin}%`;
      
      // Reset horizontal margins
      this.wrapper.style.left = '';
      this.wrapper.style.right = '';
      this.wrapper.style.transform = ''; // Clear center transform if any

      if (this.align === 'left') {
        this.wrapper.style.left = `${this.sideMargin}%`;
        this.wrapper.style.right = 'auto';
      } else if (this.align === 'right') {
        this.wrapper.style.right = `${this.sideMargin}%`;
        this.wrapper.style.left = 'auto';
      } else if (this.align === 'center') {
        this.wrapper.style.left = '50%';
        this.wrapper.style.right = 'auto';
        this.wrapper.style.transform = 'translateX(-50%)';
      }
    }

    // 4. Animation Speed
    const speedMap = { 'slow': '1.5s', 'normal': '0.8s', 'fast': '0.4s' };
    document.documentElement.style.setProperty('--lt-anim-duration', speedMap[this.animSpeed] || '0.8s');
  }

  _applyColors() {
    if (this.panelEl) {
      if (this.colorBg) {
        this.panelEl.style.setProperty('--custom-bg', this.colorBg);
        this.panelEl.style.background = this.colorBg;
      } else {
        this.panelEl.style.removeProperty('--custom-bg');
        this.panelEl.style.background = '';
      }
    }
    if (this.nameEl && this.colorText) {
      this.nameEl.style.color = this.colorText;
    } else if (this.nameEl) {
      this.nameEl.style.color = '';
    }
    // Apply accent color to gold elements
    if (this.colorAccent) {
      document.documentElement.style.setProperty('--gold', this.colorAccent);
      document.documentElement.style.setProperty('--gold-light', this._lightenColor(this.colorAccent, 20));
    } else {
      document.documentElement.style.removeProperty('--gold');
      document.documentElement.style.removeProperty('--gold-light');
    }
  }

  _lightenColor(hex, percent) {
    try {
      const num = parseInt(hex.replace('#', ''), 16);
      const r = Math.min(255, (num >> 16) + Math.round(2.55 * percent));
      const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(2.55 * percent));
      const b = Math.min(255, (num & 0x0000FF) + Math.round(2.55 * percent));
      return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    } catch (e) {
      return hex;
    }
  }

  /** Apply the selected animation style class to the wrapper */
  _applyAnimStyle() {
    if (this.wrapper) {
      // Remove all animation style classes
      this.wrapper.classList.remove(
        'lt-anim-slide-right', 'lt-anim-slide-left',
        'lt-anim-fade', 'lt-anim-scale', 'lt-anim-slide-up',
        'lt-anim-elastic', 'lt-anim-typewriter', 'lt-anim-cinematic',
        'lt-anim-glitch', 'lt-anim-wipe'
      );
      this.wrapper.classList.add(`lt-anim-${this.animStyle}`);
    }
  }

  _applyLogo() {
    if (!this.panelEl) return;
    let logoEl = this.panelEl.querySelector('.lt-logo');
    if (this.logo) {
      if (!logoEl) {
        logoEl = document.createElement('img');
        logoEl.className = 'lt-logo';
        // Insert before .lt-content
        const contentEl = this.panelEl.querySelector('.lt-content');
        if (contentEl) {
          this.panelEl.insertBefore(logoEl, contentEl);
        } else {
          this.panelEl.appendChild(logoEl);
        }
      }
      logoEl.src = this.logo;
      logoEl.style.display = '';
    } else if (logoEl) {
      logoEl.style.display = 'none';
    }
  }

  _applyOrnament() {
    if (!this.wrapper) return;
    // Remove existing ornament overlay
    const existing = this.wrapper.querySelector('.lt-ornament-overlay');
    if (existing) existing.remove();

    if (this.ornament === 'none') return;

    const overlay = document.createElement('div');
    overlay.className = 'lt-ornament-overlay';

    switch (this.ornament) {
      case 'bismillah':
        overlay.innerHTML = '<div class="lt-ornament-bismillah">﷽</div>';
        break;
      case 'geometric':
        overlay.innerHTML = `<svg class="lt-ornament-geo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
          <polygon points="50,20 56,40 78,40 60,52 67,73 50,60 33,73 40,52 22,40 44,40" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>
        </svg>`;
        break;
      case 'star8':
        overlay.innerHTML = `<svg class="lt-ornament-star" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,5 47,25 67,13 55,33 75,40 55,47 67,67 47,55 40,75 33,55 13,67 25,47 5,40 25,33 13,13 33,25" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.25"/>
        </svg>`;
        break;
    }

    this.wrapper.appendChild(overlay);
  }

  _handleCommand(cmd) {
    this.lastCmdString = JSON.stringify(cmd);
    switch (cmd.type) {
      case 'show':
        if (cmd.name  !== undefined) this.name  = cmd.name;
        if (cmd.title !== undefined) this.title = cmd.title;
        if (cmd.location !== undefined) this.location = cmd.location;
        if (cmd.date !== undefined) this.date = cmd.date;
        if (cmd.font !== undefined) this.font = cmd.font;
        if (cmd.nameSize !== undefined) this.nameSize = cmd.nameSize;
        if (cmd.titleSize !== undefined) this.titleSize = cmd.titleSize;
        if (cmd.locationSize !== undefined) this.locationSize = cmd.locationSize;
        if (cmd.dateSize !== undefined) this.dateSize = cmd.dateSize;
        if (cmd.align !== undefined) this.align = cmd.align;
        if (cmd.duration !== undefined) this.duration = cmd.duration;
        if (cmd.bottomMargin !== undefined) this.bottomMargin = cmd.bottomMargin;
        if (cmd.sideMargin !== undefined) this.sideMargin = cmd.sideMargin;
        if (cmd.colorBg !== undefined) this.colorBg = cmd.colorBg;
        if (cmd.colorText !== undefined) this.colorText = cmd.colorText;
        if (cmd.colorAccent !== undefined) this.colorAccent = cmd.colorAccent;
        if (cmd.animStyle !== undefined) this.animStyle = cmd.animStyle;
        if (cmd.animSpeed !== undefined) this.animSpeed = cmd.animSpeed;
        if (cmd.logo !== undefined) this.logo = cmd.logo;
        if (cmd.ornament !== undefined) this.ornament = cmd.ornament;
        if (cmd.layoutDir !== undefined) this.layoutDir = cmd.layoutDir;
        this._applyAll();
        this.enter();
        break;
      case 'hide':
        this.exit();
        break;
      case 'toggle':
        this.toggle();
        break;
      case 'update':
        if (cmd.name  !== undefined) this.name  = cmd.name;
        if (cmd.title !== undefined) this.title = cmd.title;
        if (cmd.location !== undefined) this.location = cmd.location;
        if (cmd.date !== undefined) this.date = cmd.date;
        if (cmd.font !== undefined) this.font = cmd.font;
        if (cmd.nameSize !== undefined) this.nameSize = cmd.nameSize;
        if (cmd.titleSize !== undefined) this.titleSize = cmd.titleSize;
        if (cmd.locationSize !== undefined) this.locationSize = cmd.locationSize;
        if (cmd.dateSize !== undefined) this.dateSize = cmd.dateSize;
        if (cmd.align !== undefined) this.align = cmd.align;
        if (cmd.duration !== undefined) this.duration = cmd.duration;
        if (cmd.bottomMargin !== undefined) this.bottomMargin = cmd.bottomMargin;
        if (cmd.sideMargin !== undefined) this.sideMargin = cmd.sideMargin;
        if (cmd.colorBg !== undefined) this.colorBg = cmd.colorBg;
        if (cmd.colorText !== undefined) this.colorText = cmd.colorText;
        if (cmd.colorAccent !== undefined) this.colorAccent = cmd.colorAccent;
        if (cmd.animStyle !== undefined) this.animStyle = cmd.animStyle;
        if (cmd.animSpeed !== undefined) this.animSpeed = cmd.animSpeed;
        if (cmd.logo !== undefined) this.logo = cmd.logo;
        if (cmd.ornament !== undefined) this.ornament = cmd.ornament;
        if (cmd.layoutDir !== undefined) this.layoutDir = cmd.layoutDir;
        this._applyAll();
        break;
    }
  }

  _applyAll() {
    this._applyText();
    this._applyAlign();
    this._applyMargins();
    this._applyColors();
    this._applyAnimStyle();
    this._applyLogo();
    this._applyOrnament();
    this._applyLayoutDir();
  }

  _applyLayoutDir() {
    document.documentElement.dir = this.layoutDir || 'rtl';
  }

  enter() {
    if (this.state === 'visible' || this.state === 'entering') return;
    this.state = 'entering';
    this.wrapper?.classList.remove('lt-hidden', 'lt-exiting', 'lt-visible');
    this.wrapper?.classList.add('lt-entering');

    setTimeout(() => {
      this.wrapper?.classList.remove('lt-entering');
      this.wrapper?.classList.add('lt-visible');
      this.state = 'visible';
      if (this.duration > 0) {
        this.timer = setTimeout(() => this.exit(), this.duration * 1000);
      }
    }, 1400);
  }

  exit() {
    if (this.state === 'hidden' || this.state === 'exiting') return;
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
    this.state = 'exiting';
    this.wrapper?.classList.remove('lt-visible', 'lt-entering');
    this.wrapper?.classList.add('lt-exiting');
    setTimeout(() => {
      this.wrapper?.classList.remove('lt-exiting');
      this.wrapper?.classList.add('lt-hidden');
      this.state = 'hidden';
    }, 600);
  }

  toggle() {
    (this.state === 'hidden' || this.state === 'exiting') ? this.enter() : this.exit();
  }
}

// Init on DOM ready
window.LT = new LowerThirdController();
document.addEventListener('DOMContentLoaded', () => window.LT.init());

// Global helpers for OBS scripting
window.showLowerThird = (name, title, location, date, font, align) => {
  window.LT.name = name || window.LT.name;
  window.LT.title = title || window.LT.title;
  window.LT.location = location || window.LT.location;
  window.LT.date = date || window.LT.date;
  window.LT.font = font || window.LT.font;
  window.LT.align = align || window.LT.align;
  window.LT._applyAll();
  window.LT.enter();
};
window.hideLowerThird = () => window.LT.exit();
window.toggleLowerThird = () => window.LT.toggle();
