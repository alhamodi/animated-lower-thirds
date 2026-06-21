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
      return `${parts[0]} / ${parts[1]} / ${parts[2]} هـ`;
    }
    return formatted + ' هـ';
  } catch (e) {
    return '٢٨ / ذو الحجة / ١٤٤٧ هـ';
  }
}

class LowerThirdController {
  constructor() {
    this.params   = new URLSearchParams(window.location.search);
    this.name     = this.params.get('name')  || 'الحبيب علي';
    this.title    = this.params.get('title') || 'المسمى الوظيفي';
    this.location = this.params.get('location') || 'جامع تريس - تريس - حضرموت';
    this.date     = this.params.get('date')     || getHijriDate();
    this.font     = this.params.get('font')     || '';
    this.align    = this.params.get('align')    || 'left';
    this.autostart = this.params.get('autostart') !== 'false';
    this.duration  = parseInt(this.params.get('duration') || '0');

    // New feature properties
    this.bottomMargin = parseInt(this.params.get('bottom') || '80');
    this.colorBg     = this.params.get('colorBg')     || '';
    this.colorText   = this.params.get('colorText')   || '';
    this.colorAccent = this.params.get('colorAccent') || '';
    this.animStyle   = this.params.get('anim')        || 'slide-right';
    this.logo        = this.params.get('logo')        || '';
    this.ornament    = this.params.get('ornament')    || 'none';

    this.wrapper  = null;
    this.nameEl   = null;
    this.titleEl  = null;
    this.locationEl = null;
    this.dateEl   = null;
    this.panelEl  = null;
    this.state    = 'hidden';
    this.timer    = null;

    // BroadcastChannel: receive commands from control panel
    this.channel  = new BroadcastChannel(LT_CHANNEL);
    this.channel.onmessage = (e) => this._handleCommand(e.data);
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
    this._applyBottomMargin();
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
  }

  _applyText() {
    if (this.nameEl) {
      this.nameEl.textContent = this.name;
      this.nameEl.style.fontFamily = this.font || '';
    }
    if (this.titleEl) {
      this.titleEl.textContent = this.title;
      this.titleEl.style.fontFamily = this.font || '';
    }
    if (this.locationEl) {
      this.locationEl.textContent = this.location;
      this.locationEl.style.fontFamily = this.font || '';
    }
    if (this.dateEl) {
      this.dateEl.textContent = this.date;
      this.dateEl.style.fontFamily = this.font || '';
    }
  }

  _applyAlign() {
    if (this.wrapper) {
      this.wrapper.classList.remove('lt-align-left', 'lt-align-center', 'lt-align-right');
      this.wrapper.classList.add(`lt-align-${this.align}`);
    }
  }

  _applyBottomMargin() {
    if (this.wrapper) {
      this.wrapper.style.bottom = `${this.bottomMargin}px`;
    }
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
        'lt-anim-elastic', 'lt-anim-typewriter', 'lt-anim-cinematic'
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
    switch (cmd.type) {
      case 'show':
        if (cmd.name  !== undefined) this.name  = cmd.name;
        if (cmd.title !== undefined) this.title = cmd.title;
        if (cmd.location !== undefined) this.location = cmd.location;
        if (cmd.date !== undefined) this.date = cmd.date;
        if (cmd.font !== undefined) this.font = cmd.font;
        if (cmd.align !== undefined) this.align = cmd.align;
        if (cmd.duration !== undefined) this.duration = cmd.duration;
        if (cmd.bottomMargin !== undefined) this.bottomMargin = cmd.bottomMargin;
        if (cmd.colorBg !== undefined) this.colorBg = cmd.colorBg;
        if (cmd.colorText !== undefined) this.colorText = cmd.colorText;
        if (cmd.colorAccent !== undefined) this.colorAccent = cmd.colorAccent;
        if (cmd.animStyle !== undefined) this.animStyle = cmd.animStyle;
        if (cmd.logo !== undefined) this.logo = cmd.logo;
        if (cmd.ornament !== undefined) this.ornament = cmd.ornament;
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
        if (cmd.align !== undefined) this.align = cmd.align;
        if (cmd.duration !== undefined) this.duration = cmd.duration;
        if (cmd.bottomMargin !== undefined) this.bottomMargin = cmd.bottomMargin;
        if (cmd.colorBg !== undefined) this.colorBg = cmd.colorBg;
        if (cmd.colorText !== undefined) this.colorText = cmd.colorText;
        if (cmd.colorAccent !== undefined) this.colorAccent = cmd.colorAccent;
        if (cmd.animStyle !== undefined) this.animStyle = cmd.animStyle;
        if (cmd.logo !== undefined) this.logo = cmd.logo;
        if (cmd.ornament !== undefined) this.ornament = cmd.ornament;
        this._applyAll();
        break;
    }
  }

  _applyAll() {
    this._applyText();
    this._applyAlign();
    this._applyBottomMargin();
    this._applyColors();
    this._applyAnimStyle();
    this._applyLogo();
    this._applyOrnament();
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
