/**
 * themes.js — Theme Registry for Polymorphic Lower Third Renderer
 * Auto-generated from 16 template files.
 * Each theme contains its CSS, body HTML, and optional inline script.
 */

const THEME_REGISTRY = {
  "emerald": {
    num: 1,
    css: `/* ═══════════════════════════════════════
       STYLE 1: الذهب والزمرد
       Gold & Emerald | Islamic Geometric
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Geometric Islamic SVG pattern (inline) */
    .lt-geometric-pattern {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 55%;
      overflow: hidden;
      opacity: 0.12;
    }
    .lt-geometric-pattern svg {
      width: 100%;
      height: 100%;
    }

    /* Corner arabesque */
    .lt-corner-ornament {
      position: absolute;
      top: 4px; right: 4px;
      width: 68px;
      height: 68px;
      opacity: 0.9;
      animation: glowPulse 3s ease-in-out infinite;
    }

    /* Bottom corner ornament */
    .lt-corner-ornament-bottom {
      position: absolute;
      bottom: 4px; right: 4px;
      width: 40px;
      height: 40px;
      opacity: 0.6;
    }

    /* Main panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 560px;
      max-width: 720px;
      min-height: 100px;
      padding: 18px 24px 18px 40px;
      background: linear-gradient(
        105deg,
        rgba(13,92,58,0.92) 0%,
        rgba(8,61,38,0.97) 55%,
        rgba(5,40,25,0.99) 100%
      );
      border-radius: 6px 0 0 6px;
      overflow: hidden;
      box-shadow:
        -4px 0 0 0 var(--gold),
        0 8px 40px rgba(0,0,0,0.55),
        inset 0 1px 0 rgba(201,168,76,0.2);
      backdrop-filter: blur(2px);
      /* Initially hidden for animation */
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.5s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.4s var(--ease-in-out) forwards;
    }

    /* Gold top border line */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: var(--gold-shimmer);
      background-size: 200% auto;
      animation: goldSweep 4s linear infinite;
    }

    /* Gold bottom border line */
    .lt-panel::after {
      content: '';
      position: absolute;
      bottom: 0; right: 0; left: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold-dark), transparent);
    }

    /* Glassmorphism sheen */
    .lt-sheen {
      position: absolute;
      top: 0; right: 0;
      width: 40%;
      height: 50%;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.06) 0%,
        transparent 100%
      );
      border-radius: 0 6px 0 0;
      pointer-events: none;
    }

    /* Text content area */
    .lt-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    /* Separator line */
    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold-light) 70%, transparent 100%);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 6px 0;
    }
    .lt-entering .lt-line {
      animation: lineGrow 0.4s var(--ease-out) 0.3s both;
    }

    /* Name text */
    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
      letter-spacing: 0.01em;
      text-shadow: 0 2px 8px rgba(0,0,0,0.4);
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.45s var(--ease-out) 0.5s both;
    }

    /* Title text */
    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--gold-light);
      letter-spacing: 0.03em;
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.7s both;
    }

    /* Icon area (right side) */
    .lt-icon-area {
      position: relative;
      z-index: 2;
      margin-right: 0;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      opacity: 0;
    }
    .lt-entering .lt-icon-area {
      animation: fadeInUp 0.5s ease 0.8s both;
    }

    .lt-icon-area svg {
      animation: softFloat 4s ease-in-out infinite;
    }

    /* Vertical gold bar on far right */
    .lt-right-bar {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-dark));
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Geometric background pattern -->
      <div class="lt-geometric-pattern">
        <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamicPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <!-- Islamic 8-pointed star -->
              <polygon points="25,5 28,18 41,15 33,25 41,35 28,32 25,45 22,32 9,35 17,25 9,15 22,18"
                fill="none" stroke="#c9a84c" stroke-width="0.8"/>
              <!-- Inner square -->
              <rect x="18" y="18" width="14" height="14" fill="none" stroke="#c9a84c" stroke-width="0.5" transform="rotate(45 25 25)"/>
              <!-- Corner dots -->
              <circle cx="0"  cy="0"  r="1" fill="#c9a84c"/>
              <circle cx="50" cy="0"  r="1" fill="#c9a84c"/>
              <circle cx="0"  cy="50" r="1" fill="#c9a84c"/>
              <circle cx="50" cy="50" r="1" fill="#c9a84c"/>
            </pattern>
          </defs>
          <rect width="400" height="100" fill="url(#islamicPattern)"/>
        </svg>
      </div>

      <!-- Glassmorphism sheen -->
      <div class="lt-sheen"></div>

      <!-- Right vertical bar -->
      <div class="lt-right-bar"></div>

      <!-- Corner ornament top-right -->
      <svg class="lt-corner-ornament" viewBox="0 0 68 68" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#c9a84c" stroke-width="0.9">
          <!-- Arabesque corner ornament -->
          <path d="M 2 2 L 20 2 A 18 18 0 0 1 2 20 Z" fill="rgba(201,168,76,0.1)"/>
          <path d="M 2 2 Q 35 2 35 35 Q 35 2 68 2" stroke-width="0.6" opacity="0.5"/>
          <circle cx="10" cy="10" r="4" fill="none" stroke-width="0.8"/>
          <circle cx="10" cy="10" r="2" fill="rgba(201,168,76,0.4)"/>
          <!-- Small geometric star -->
          <polygon points="34,4 36,10 42,10 37,14 39,20 34,16 29,20 31,14 26,10 32,10"
            fill="rgba(201,168,76,0.15)" stroke="#c9a84c" stroke-width="0.7"/>
          <!-- Decorative lines -->
          <line x1="2" y1="28" x2="28" y2="2" stroke-width="0.4" opacity="0.4"/>
          <line x1="2" y1="38" x2="38" y2="2" stroke-width="0.3" opacity="0.3"/>
        </g>
      </svg>

      <!-- Icon area with crescent -->
      <div class="lt-icon-area">
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <!-- Crescent moon -->
          <path d="M 18 4 A 14 14 0 1 0 18 32 A 10 10 0 1 1 18 4 Z"
            fill="var(--gold)" opacity="0.9"/>
          <!-- Star -->
          <polygon points="26,8 27.5,12.5 32,12.5 28.5,15.5 30,20 26,17.5 22,20 23.5,15.5 20,12.5 24.5,12.5"
            fill="var(--gold-light)" opacity="0.95"/>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "royal": {
    num: 2,
    css: `/* ═══════════════════════════════════════
       STYLE 2: الليل الملكي
       Royal Night | Navy + Gold + Teal
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Floating particles */
    .lt-particles {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .particle {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,196,184,0.8), transparent);
      animation: particleFloat linear infinite;
    }
    .particle:nth-child(1) { width:4px;height:4px; left:15%; bottom:10%; animation-duration:4s; animation-delay:0s; }
    .particle:nth-child(2) { width:3px;height:3px; left:30%; bottom:5%;  animation-duration:5s; animation-delay:1s; }
    .particle:nth-child(3) { width:5px;height:5px; left:50%; bottom:8%;  animation-duration:3.5s;animation-delay:0.5s;}
    .particle:nth-child(4) { width:2px;height:2px; left:65%; bottom:15%; animation-duration:6s; animation-delay:2s; }
    .particle:nth-child(5) { width:4px;height:4px; left:80%; bottom:5%;  animation-duration:4.5s;animation-delay:1.5s;}
    .particle:nth-child(6) { width:3px;height:3px; left:90%; bottom:12%; animation-duration:5.5s;animation-delay:0.8s;}

    /* Gold geometric frame on the right */
    .lt-frame {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lt-frame svg {
      animation: glowPulse 3s ease-in-out infinite;
    }

    /* Main panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 600px;
      max-width: 780px;
      min-height: 108px;
      padding: 20px 90px 20px 40px;
      background: linear-gradient(
        105deg,
        rgba(10,22,40,0.7) 0%,
        rgba(12,28,52,0.92) 40%,
        rgba(10,20,40,0.97) 75%,
        rgba(8,16,32,0.99) 100%
      );
      border-radius: 6px 0 0 6px;
      overflow: hidden;
      box-shadow:
        -4px 0 0 0 var(--teal),
        0 8px 50px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(0,196,184,0.15),
        inset 0 -1px 0 rgba(201,168,76,0.1);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.5s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.4s var(--ease-in-out) forwards;
    }

    /* Teal top glow line */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--teal), rgba(201,168,76,0.8), var(--teal), transparent);
      animation: goldSweep 5s linear infinite;
    }

    /* Subtle blue radial glow */
    .lt-glow {
      position: absolute;
      top: -30%; right: 10%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(0,100,200,0.15), transparent 70%);
      pointer-events: none;
    }

    /* Angular frame on the right side (chevron shape) */
    .lt-chevron {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 85px;
      background: linear-gradient(
        180deg,
        rgba(201,168,76,0.05) 0%,
        rgba(201,168,76,0.12) 50%,
        rgba(201,168,76,0.05) 100%
      );
      border-right: none;
      clip-path: polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%);
      border-left: 2px solid rgba(0,196,184,0.4);
    }

    /* Gold vertical line */
    .lt-vline {
      position: absolute;
      right: 82px; top: 10px; bottom: 10px;
      width: 1.5px;
      background: linear-gradient(180deg, transparent, var(--gold), transparent);
    }

    /* Text content */
    .lt-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
    }

    .lt-line {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--teal) 30%, var(--gold) 70%, transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 4px 0;
    }
    .lt-entering .lt-line {
      animation: lineGrow 0.4s var(--ease-out) 0.3s both;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.3rem;
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
      text-shadow: 0 2px 15px rgba(0,196,184,0.3);
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.45s var(--ease-out) 0.5s both;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.1rem;
      font-weight: 400;
      color: var(--teal);
      letter-spacing: 0.04em;
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.7s both;
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Ambient glow -->
      <div class="lt-glow"></div>

      <!-- Particles -->
      <div class="lt-particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>

      <!-- Chevron right frame -->
      <div class="lt-chevron"></div>
      <div class="lt-vline"></div>

      <!-- Gold geometric frame SVG -->
      <div class="lt-frame">
        <svg width="60" height="90" viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#c9a84c" stroke-width="0.8" opacity="0.8">
            <!-- Top ornament -->
            <polygon points="30,4 34,14 44,14 36,20 39,30 30,24 21,30 24,20 16,14 26,14"
              fill="rgba(201,168,76,0.08)" stroke-width="0.9"/>
            <!-- Bottom ornament -->
            <polygon points="30,86 34,76 44,76 36,70 39,60 30,66 21,60 24,70 16,76 26,76"
              fill="rgba(201,168,76,0.08)" stroke-width="0.9"/>
            <!-- Vertical lines -->
            <line x1="30" y1="30" x2="30" y2="60" stroke-width="0.5"/>
            <!-- Small diamonds -->
            <polygon points="30,42 33,45 30,48 27,45" fill="rgba(201,168,76,0.3)" stroke-width="0.6"/>
          </g>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "modern": {
    num: 3,
    css: `/* ═══════════════════════════════════════
       STYLE 3: الأنيق الحديث
       Modern Elegant | Black + Gold Minimal
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Main panel - minimal black with diagonal gold accent */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 520px;
      max-width: 680px;
      min-height: 90px;
      padding: 16px 28px 16px 50px;
      background: linear-gradient(
        108deg,
        rgba(14,14,14,0.97) 0%,
        rgba(20,20,20,0.95) 50%,
        rgba(12,12,12,0.98) 100%
      );
      border-radius: 4px 0 0 4px;
      overflow: hidden;
      box-shadow:
        -3px 0 0 0 var(--gold),
        0 6px 30px rgba(0,0,0,0.7),
        inset 0 0 0 1px rgba(201,168,76,0.08);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.45s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.35s var(--ease-in-out) forwards;
    }

    /* Diagonal gold line across panel */
    .lt-diagonal {
      position: absolute;
      top: 0; bottom: 0;
      right: 60px;
      width: 60px;
      overflow: hidden;
      pointer-events: none;
    }
    .lt-diagonal::before {
      content: '';
      position: absolute;
      top: -10%; bottom: -10%;
      left: 50%;
      width: 1.5px;
      background: linear-gradient(180deg, transparent, var(--gold) 20%, var(--gold-light) 50%, var(--gold) 80%, transparent);
      transform: rotate(-12deg);
      opacity: 0;
    }
    .lt-entering .lt-diagonal::before {
      animation: fadeInUp 0.4s ease 0.6s both;
    }

    /* Hexagon pattern - very subtle */
    .lt-hex-pattern {
      position: absolute;
      left: 0; top: 0; right: 0; bottom: 0;
      opacity: 0.04;
      overflow: hidden;
    }
    .lt-hex-pattern svg {
      width: 100%;
      height: 100%;
    }

    /* Gold top edge */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 1.5px;
      background: linear-gradient(90deg, transparent 20%, var(--gold) 50%, transparent);
    }

    /* Thin gold right vertical bar */
    .lt-right-bar {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, transparent, var(--gold), transparent);
    }

    /* Text area */
    .lt-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
    }

    /* Gold dot accent */
    .lt-dot-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
      opacity: 0;
    }
    .lt-entering .lt-dot-row {
      animation: fadeInUp 0.3s ease 0.35s both;
    }
    .lt-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--gold);
    }
    .lt-dot-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, var(--gold-dark), transparent);
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.1rem;
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
      letter-spacing: 0.01em;
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.4s var(--ease-out) 0.45s both;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.05rem;
      font-weight: 400;
      color: rgba(180,180,180,0.85);
      letter-spacing: 0.05em;
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.6s both;
    }

    /* Minimal hexagon icon */
    .lt-icon {
      position: relative;
      z-index: 2;
      margin-left: 20px;
      opacity: 0;
    }
    .lt-entering .lt-icon {
      animation: scaleIn 0.5s var(--ease-out) 0.8s both;
    }
    .lt-icon svg {
      animation: glowPulse 4s ease-in-out infinite;
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Hex pattern background -->
      <div class="lt-hex-pattern">
        <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexPat" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <polygon points="15,1 28,8 28,18 15,25 2,18 2,8"
                fill="none" stroke="#c9a84c" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="300" height="100" fill="url(#hexPat)"/>
        </svg>
      </div>

      <!-- Right bar -->
      <div class="lt-right-bar"></div>

      <!-- Diagonal accent -->
      <div class="lt-diagonal"></div>

      <!-- Hexagon icon -->
      <div class="lt-icon">
        <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
          <polygon points="21,2 38,11 38,31 21,40 4,31 4,11"
            fill="none" stroke="#c9a84c" stroke-width="1.2"/>
          <polygon points="21,7 33,14 33,28 21,35 9,28 9,14"
            fill="rgba(201,168,76,0.08)" stroke="#c9a84c" stroke-width="0.6"/>
          <!-- Inner star hint -->
          <polygon points="21,12 23,17 28,17 24,20 26,25 21,22 16,25 18,20 14,17 19,17"
            fill="rgba(201,168,76,0.3)" stroke="none"/>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-dot-row">
          <div class="lt-dot"></div>
          <div class="lt-dot-line"></div>
        </div>
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "fajr": {
    num: 4,
    css: `/* ═══════════════════════════════════════
       STYLE 4: الفجر
       Dawn / Fajr | Teal-Blue + Rose Gold
       Spiritual & Ramadan Feel
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Mandala background (very subtle) */
    .lt-mandala {
      position: absolute;
      left: -20px; top: 50%;
      transform: translateY(-50%);
      width: 160px; height: 160px;
      opacity: 0.07;
      animation: slowRotate 60s linear infinite;
    }

    /* Main panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 580px;
      max-width: 720px;
      min-height: 105px;
      padding: 20px 28px 24px 50px;
      background: linear-gradient(
        108deg,
        rgba(8,30,50,0.85) 0%,
        rgba(12,45,70,0.95) 50%,
        rgba(5,20,35,0.97) 100%
      );
      border-radius: 4px 0 0 4px;
      overflow: hidden;
      box-shadow:
        -4px 0 0 0 var(--rose-gold),
        0 8px 45px rgba(0,0,0,0.65),
        inset 0 1px 0 rgba(192,128,64,0.2),
        0 0 60px rgba(0,196,184,0.12);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.5s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.4s var(--ease-in-out) forwards;
    }

    /* Rose gold shimmer top border */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--rose-gold), #e8b060, var(--rose-gold), transparent);
      background-size: 200% auto;
      animation: goldSweep 5s linear infinite;
    }

    /* Bottom rose gold line */
    .lt-bottom-line {
      position: absolute;
      bottom: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 20%, rgba(192,128,64,0.5), transparent);
    }

    /* Soft teal ambient glow */
    .lt-glow {
      position: absolute;
      top: -50%; right: 20%;
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(0,196,184,0.1), transparent 70%);
      pointer-events: none;
    }

    /* Right side: crescent + star icon */
    .lt-icon-area {
      position: relative;
      z-index: 2;
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0;
    }
    .lt-entering .lt-icon-area {
      animation: scaleIn 0.5s var(--ease-out) 0.8s both;
    }
    .lt-icon-area svg {
      filter: drop-shadow(0 0 8px rgba(192,128,64,0.5));
      animation: glowPulse 3s ease-in-out infinite, softFloat 5s ease-in-out infinite;
    }

    /* Text content */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--rose-gold) 40%, rgba(232,176,96,0.6) 70%, transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 4px 0;
    }
    .lt-entering .lt-line {
      animation: lineGrow 0.4s var(--ease-out) 0.3s both;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 700;
      color: #f0e8d0;
      line-height: 1.2;
      text-shadow: 0 2px 12px rgba(192,128,64,0.25);
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.45s var(--ease-out) 0.5s both;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.1rem;
      font-weight: 400;
      color: var(--rose-gold);
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.7s both;
    }

    /* Right vertical bar */
    .lt-right-bar {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, transparent, var(--rose-gold), transparent);
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Ambient glow -->
      <div class="lt-glow"></div>

      <!-- Subtle mandala -->
      <div class="lt-mandala">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#c08040" stroke-width="0.8">
            <!-- Mandala rings -->
            <circle cx="80" cy="80" r="70"/>
            <circle cx="80" cy="80" r="55"/>
            <circle cx="80" cy="80" r="40"/>
            <circle cx="80" cy="80" r="25"/>
            <!-- Petals -->
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(0 80 80)"/>
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(45 80 80)"/>
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(90 80 80)"/>
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(135 80 80)"/>
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(180 80 80)"/>
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(225 80 80)"/>
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(270 80 80)"/>
            <ellipse cx="80" cy="20" rx="8" ry="15" transform="rotate(315 80 80)"/>
            <!-- Star points -->
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(0 80 80)"/>
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(45 80 80)"/>
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(90 80 80)"/>
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(135 80 80)"/>
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(180 80 80)"/>
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(225 80 80)"/>
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(270 80 80)"/>
            <polygon points="80,10 83,28 80,35 77,28" transform="rotate(315 80 80)"/>
          </g>
        </svg>
      </div>

      <!-- Right bar -->
      <div class="lt-right-bar"></div>
      <div class="lt-bottom-line"></div>

      <!-- Crescent & Star icon -->
      <div class="lt-icon-area">
        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <!-- Crescent -->
          <path d="M 25 5 A 20 20 0 1 0 25 45 A 14 14 0 1 1 25 5 Z"
            fill="var(--rose-gold)" opacity="0.9"/>
          <!-- Star (5-pointed) -->
          <polygon points="38,10 39.8,16 46,16 41,20 43,26 38,22 33,26 35,20 30,16 36.2,16"
            fill="#f0c060" stroke="none"/>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "silver": {
    num: 5,
    css: `/* ═══════════════════════════════════════
       STYLE 5: الأزرق الفضي
       Silver Blue | News Broadcast Style
       Like Al Jazeera / MBC News
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Main parallelogram-shaped panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 560px;
      max-width: 740px;
      min-height: 95px;
      padding: 18px 24px 18px 60px;
      background: linear-gradient(
        108deg,
        rgba(20,30,48,0.96) 0%,
        rgba(25,38,58,0.98) 60%,
        rgba(18,26,42,0.99) 100%
      );
      /* Parallelogram clip on the left side */
      clip-path: polygon(28px 0, 100% 0, 100% 100%, 0 100%);
      box-shadow:
        0 8px 40px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(168,184,204,0.15);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.45s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.35s var(--ease-in-out) forwards;
    }

    /* Silver metallic top border */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg,
        transparent,
        rgba(168,184,204,0.3) 10%,
        rgba(200,210,225,0.8) 30%,
        rgba(255,255,255,0.9) 50%,
        rgba(200,210,225,0.8) 70%,
        rgba(168,184,204,0.3) 90%,
        transparent
      );
      animation: goldSweep 4s linear infinite;
    }

    /* Silver metallic bottom border */
    .lt-panel::after {
      content: '';
      position: absolute;
      bottom: 0; right: 0; left: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 20%, rgba(168,184,204,0.4), transparent);
    }

    /* Left accent block (parallelogram) */
    .lt-accent-block {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 55px;
      background: linear-gradient(
        108deg,
        rgba(60,100,160,0.8) 0%,
        rgba(40,80,140,0.7) 100%
      );
      clip-path: polygon(28px 0, 100% 0, 72px 100%, 0 100%);
    }

    /* Silver shimmer on accent block */
    .lt-accent-block::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 60%);
    }

    /* Right vertical silver bar */
    .lt-right-bar {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, transparent, var(--silver), transparent);
    }

    /* Text content */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* Separator line */
    .lt-line {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(168,184,204,0.5) 40%, rgba(200,215,235,0.3), transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 4px 0;
    }
    .lt-entering .lt-line {
      animation: lineGrow 0.35s var(--ease-out) 0.3s both;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--white);
      line-height: 1.2;
      text-shadow: 0 2px 10px rgba(60,100,200,0.2);
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.4s var(--ease-out) 0.45s both;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.05rem;
      font-weight: 400;
      color: var(--silver);
      letter-spacing: 0.04em;
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.62s both;
    }

    /* Channel logo placeholder area */
    .lt-logo-area {
      position: relative;
      z-index: 2;
      margin-left: 16px;
      opacity: 0;
    }
    .lt-entering .lt-logo-area {
      animation: scaleIn 0.4s var(--ease-out) 0.7s both;
    }

    /* Metallic circle badge */
    .lt-badge {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(60,100,160,0.6), rgba(20,40,80,0.8));
      border: 1.5px solid rgba(168,184,204,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 12px rgba(60,100,200,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Left accent parallelogram -->
      <div class="lt-accent-block"></div>

      <!-- Right silver bar -->
      <div class="lt-right-bar"></div>

      <!-- Logo/badge area -->
      <div class="lt-logo-area">
        <div class="lt-badge">
          <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
            <!-- Stylized Arabic letter / mic icon -->
            <g fill="none" stroke="rgba(168,184,204,0.9)" stroke-width="1.4" stroke-linecap="round">
              <circle cx="14" cy="14" r="6"/>
              <line x1="14" y1="20" x2="14" y2="25"/>
              <line x1="9"  y1="25" x2="19" y2="25"/>
              <path d="M 8 14 A 6 6 0 0 0 20 14" stroke-width="1.2"/>
            </g>
          </svg>
        </div>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "heritage": {
    num: 6,
    css: `/* ═══════════════════════════════════════
       STYLE 6: التراث والحداثة
       Heritage & Modernity | Burgundy + Gold
       Documentary / Cultural Channel Style
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Main panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 600px;
      max-width: 760px;
      min-height: 105px;
      padding: 20px 20px 20px 0;
      background: transparent;
      overflow: hidden;
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.5s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.4s var(--ease-in-out) forwards;
    }

    /* Right main background (burgundy with arabesque) */
    .lt-bg-main {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 65%;
      background: linear-gradient(
        108deg,
        rgba(107,26,26,0.97) 0%,
        rgba(90,20,20,0.99) 60%,
        rgba(75,15,15,0.99) 100%
      );
      box-shadow:
        0 8px 40px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(201,168,76,0.2);
    }

    /* Gold top border on main section */
    .lt-bg-main::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold) 20%, var(--gold-light) 50%, var(--gold) 80%, transparent);
      background-size: 200% auto;
      animation: goldSweep 5s linear infinite;
    }

    /* Gold bottom border */
    .lt-bg-main::after {
      content: '';
      position: absolute;
      bottom: 0; right: 0; left: 0;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--gold-dark) 30%, transparent);
    }

    /* Left fade section (transparent gradient) */
    .lt-bg-fade {
      position: absolute;
      top: 0; right: 62%; bottom: 0;
      width: 38%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(107,26,26,0.5) 60%,
        rgba(107,26,26,0.9) 100%
      );
    }

    /* Arabesque overlay texture */
    .lt-arabesque {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 120px;
      opacity: 0.15;
      overflow: hidden;
    }
    .lt-arabesque svg {
      width: 100%;
      height: 100%;
    }

    /* Gold vertical divider line */
    .lt-divider {
      position: absolute;
      right: 63%;
      top: 8px; bottom: 8px;
      width: 1.5px;
      background: linear-gradient(180deg, transparent, var(--gold), transparent);
      opacity: 0;
    }
    .lt-entering .lt-divider {
      animation: fadeInUp 0.4s ease 0.35s both;
    }

    /* Right vertical bar */
    .lt-right-bar {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, transparent, var(--gold), var(--gold-dark), transparent);
    }

    /* Text content */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      padding-right: 24px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold-light) 60%, transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 5px 0;
    }
    .lt-entering .lt-line {
      animation: lineGrow 0.4s var(--ease-out) 0.3s both;
    }

    .lt-name {
      font-family: var(--font-amiri);
      font-size: 2.3rem;
      font-weight: 700;
      color: var(--gold-light);
      line-height: 1.25;
      text-shadow: 0 2px 10px rgba(0,0,0,0.4);
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.45s var(--ease-out) 0.5s both;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.1rem;
      font-weight: 400;
      color: rgba(240,220,180,0.8);
      letter-spacing: 0.02em;
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.7s both;
    }

    /* Gold arabesque corner ornament */
    .lt-ornament {
      position: relative;
      z-index: 2;
      margin-left: 0;
      width: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
    }
    .lt-entering .lt-ornament {
      animation: scaleIn 0.5s var(--ease-out) 0.8s both;
    }
    .lt-ornament svg {
      animation: glowPulse 4s ease-in-out infinite;
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Background layers -->
      <div class="lt-bg-fade"></div>
      <div class="lt-bg-main"></div>

      <!-- Arabesque overlay -->
      <div class="lt-arabesque">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arabPat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <!-- Arabesque tile -->
              <circle cx="20" cy="20" r="12" fill="none" stroke="#c9a84c" stroke-width="0.6"/>
              <circle cx="20" cy="20" r="7"  fill="none" stroke="#c9a84c" stroke-width="0.4"/>
              <line x1="8" y1="8"   x2="32" y2="32" stroke="#c9a84c" stroke-width="0.3"/>
              <line x1="32" y1="8"  x2="8"  y2="32" stroke="#c9a84c" stroke-width="0.3"/>
              <line x1="20" y1="0"  x2="20" y2="40" stroke="#c9a84c" stroke-width="0.2"/>
              <line x1="0"  y1="20" x2="40" y2="20" stroke="#c9a84c" stroke-width="0.2"/>
            </pattern>
          </defs>
          <rect width="120" height="120" fill="url(#arabPat)"/>
        </svg>
      </div>

      <!-- Gold divider -->
      <div class="lt-divider"></div>

      <!-- Right vertical bar -->
      <div class="lt-right-bar"></div>

      <!-- Gold ornament -->
      <div class="lt-ornament">
        <svg width="65" height="90" viewBox="0 0 65 90" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#c9a84c" stroke-width="0.9">
            <!-- Traditional Islamic geometric ornament -->
            <polygon points="32,5 38,20 54,18 44,30 50,46 32,38 14,46 20,30 10,18 26,20"
              fill="rgba(201,168,76,0.1)" stroke-width="1"/>
            <!-- Lower element -->
            <polygon points="32,85 38,70 54,72 44,60 50,44 32,52 14,44 20,60 10,72 26,70"
              fill="rgba(201,168,76,0.1)" stroke-width="1"/>
            <!-- Center diamond -->
            <polygon points="32,38 40,45 32,52 24,45"
              fill="rgba(201,168,76,0.2)" stroke-width="0.8"/>
            <!-- Vertical accent -->
            <line x1="32" y1="18" x2="32" y2="72" stroke-width="0.5" stroke-dasharray="3,3"/>
          </g>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "glass": {
    num: 7,
    css: `/* ═══════════════════════════════════════
       STYLE 7: الزجاج المُضيء
       Glassmorphism + Gold Neon Glow 2025
    ═══════════════════════════════════════ */
    body { background: transparent; }

    /* Animated neon border using conic gradient */
    @keyframes rotateBorder {
      from { --angle: 0deg; }
      to   { --angle: 360deg; }
    }
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 560px;
      max-width: 720px;
      min-height: 100px;
      padding: 18px 26px 18px 44px;
      /* Glassmorphism */
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-radius: 12px 0 0 12px;
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow:
        0 8px 32px rgba(0,0,0,0.4),
        0 0 0 1px rgba(201,168,76,0.15),
        inset 0 1px 0 rgba(255,255,255,0.1),
        0 0 40px rgba(201,168,76,0.08);
      overflow: hidden;
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel { animation: slideFromRight 0.5s var(--ease-out) forwards; }
    .lt-exiting  .lt-panel { animation: slideToRight  0.4s var(--ease-in-out) forwards; }

    /* Animated gold shimmer top border */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 1.5px;
      background: linear-gradient(90deg,
        transparent,
        rgba(232,201,106,0.3) 20%,
        rgba(232,201,106,0.9) 50%,
        rgba(232,201,106,0.3) 80%,
        transparent
      );
      background-size: 200% auto;
      animation: goldSweep 3s linear infinite;
    }

    /* Frosted glass inner highlight */
    .lt-glass-sheen {
      position: absolute;
      top: 0; right: 0;
      width: 50%;
      height: 45%;
      background: linear-gradient(135deg,
        rgba(255,255,255,0.08) 0%,
        transparent 60%
      );
      border-radius: 0 12px 0 0;
      pointer-events: none;
    }

    /* Soft gold ambient glow */
    .lt-glow-orb {
      position: absolute;
      bottom: -60%; right: -5%;
      width: 280px; height: 280px;
      background: radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%);
      pointer-events: none;
    }

    /* Vertical neon gold line on right */
    .lt-right-bar {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 2px;
      background: linear-gradient(180deg,
        transparent,
        rgba(201,168,76,0.6) 30%,
        rgba(232,201,106,1) 50%,
        rgba(201,168,76,0.6) 70%,
        transparent
      );
      box-shadow: 0 0 8px rgba(201,168,76,0.4);
    }

    /* Decorative right icon */
    .lt-icon {
      position: relative;
      z-index: 2;
      margin-left: 20px;
      flex-shrink: 0;
      opacity: 0;
    }
    .lt-entering .lt-icon { animation: scaleIn 0.5s var(--ease-out) 0.9s both; }
    .lt-icon svg { animation: glowPulse 3s ease-in-out infinite, softFloat 5s ease-in-out infinite; }

    /* Text */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lt-tag {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: var(--gold);
      text-transform: uppercase;
      opacity: 0;
    }
    .lt-entering .lt-tag { animation: fadeInUp 0.3s ease 0.35s both; }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      text-shadow: 0 0 20px rgba(255,255,255,0.15);
      opacity: 0;
    }
    .lt-entering .lt-name { animation: textReveal 0.45s var(--ease-out) 0.48s both; }

    .lt-line {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 40%, transparent);
      transform: scaleX(0);
      transform-origin: right;
      margin: 4px 0;
    }
    .lt-entering .lt-line { animation: lineGrow 0.4s var(--ease-out) 0.32s both; }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.05rem;
      color: rgba(230,210,160,0.85);
      opacity: 0;
    }
    .lt-entering .lt-title { animation: textReveal 0.4s var(--ease-out) 0.68s both; }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <div class="lt-glass-sheen"></div>
      <div class="lt-glow-orb"></div>
      <div class="lt-right-bar"></div>

      <div class="lt-icon">
        <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
          <!-- Glowing 8-pointed star -->
          <defs>
            <filter id="glow7">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <polygon points="22,3 25,16 38,13 29,22 38,31 25,28 22,41 19,28 6,31 15,22 6,13 19,16"
            fill="rgba(201,168,76,0.2)" stroke="#e8c96a" stroke-width="1.2" filter="url(#glow7)"/>
          <polygon points="22,11 24,18 31,16 26,21 29,28 22,24 15,28 18,21 13,16 20,18"
            fill="rgba(201,168,76,0.35)" stroke="#c9a84c" stroke-width="0.7"/>
        </svg>
      </div>

      <div class="lt-content">
        <div class="lt-tag">✦ ضيف البرنامج</div>
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "saudi": {
    num: 8,
    css: `/* ═══════════════════════════════════════
       STYLE 8: الأخضر السعودي
       Deep Saudi/Islamic Green + White
       Clean Government/Official Style
    ═══════════════════════════════════════ */
    body { background: transparent; }

    :root {
      --saudi-green:   #006c35;
      --saudi-green2:  #005528;
      --saudi-green3:  #004020;
      --white-cream:   #f5f0e8;
    }

    /* Sword ornament animation */
    @keyframes swordReveal {
      from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: 0; }
      to   { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
    }

    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 580px;
      max-width: 740px;
      min-height: 100px;
      padding: 18px 24px 18px 40px;
      background: linear-gradient(
        108deg,
        var(--saudi-green3) 0%,
        var(--saudi-green2) 40%,
        var(--saudi-green)  100%
      );
      border-radius: 6px 0 0 6px;
      box-shadow:
        -4px 0 0 0 #ffffff,
        0 8px 40px rgba(0,0,0,0.5),
        inset 0 1px 0 rgba(255,255,255,0.15);
      overflow: hidden;
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel { animation: slideFromRight 0.48s var(--ease-out) forwards; }
    .lt-exiting  .lt-panel { animation: slideToRight  0.38s var(--ease-in-out) forwards; }

    /* White top border */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    }

    /* Islamic palm tree / geometric pattern (subtle) */
    .lt-bg-pattern {
      position: absolute;
      left: 10px; top: 0; bottom: 0;
      width: 180px;
      opacity: 0.06;
      overflow: hidden;
    }
    .lt-bg-pattern svg { width: 100%; height: 100%; }

    /* Right white vertical stripe */
    .lt-right-bar {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 5px;
      background: #ffffff;
    }

    /* White badge on right side */
    .lt-badge {
      position: relative;
      z-index: 2;
      margin-left: 22px;
      width: 56px; height: 56px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      border: 1.5px solid rgba(255,255,255,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      opacity: 0;
    }
    .lt-entering .lt-badge { animation: scaleIn 0.45s var(--ease-out) 0.85s both; }
    .lt-badge svg { animation: softFloat 6s ease-in-out infinite; }

    /* Text */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--white-cream);
      line-height: 1.2;
      text-shadow: 0 2px 8px rgba(0,0,0,0.3);
      opacity: 0;
    }
    .lt-entering .lt-name { animation: textReveal 0.45s var(--ease-out) 0.48s both; }

    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 40%, transparent);
      transform: scaleX(0);
      transform-origin: right;
      margin: 3px 0;
    }
    .lt-entering .lt-line { animation: lineGrow 0.38s var(--ease-out) 0.3s both; }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.08rem;
      color: rgba(220,240,220,0.85);
      opacity: 0;
    }
    .lt-entering .lt-title { animation: textReveal 0.4s var(--ease-out) 0.66s both; }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <div class="lt-bg-pattern">
        <svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamicGreen" x="0" y="0" width="45" height="45" patternUnits="userSpaceOnUse">
              <polygon points="22.5,2 26,13 37,11 29,19 32,30 22.5,24 13,30 16,19 8,11 19,13"
                fill="none" stroke="#ffffff" stroke-width="0.7"/>
              <circle cx="22.5" cy="22.5" r="6" fill="none" stroke="#ffffff" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="180" height="120" fill="url(#islamicGreen)"/>
        </svg>
      </div>

      <div class="lt-right-bar"></div>

      <div class="lt-badge">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <!-- Simplified palm tree (Saudi symbol) -->
          <g fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.2" stroke-linecap="round">
            <line x1="16" y1="28" x2="16" y2="10"/>
            <path d="M16 14 Q10 10 6 12" />
            <path d="M16 12 Q10  7 7  8" />
            <path d="M16 14 Q22 10 26 12"/>
            <path d="M16 12 Q22  7 25  8"/>
            <path d="M16 16 Q13 14 10 16"/>
            <path d="M16 16 Q19 14 22 16"/>
          </g>
        </svg>
      </div>

      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "kufic": {
    num: 9,
    css: `/* ═══════════════════════════════════════
       STYLE 9: الكوفي الهندسي
       Kufic-Geometric | Bold Angular Design
       Dark Charcoal + Copper/Bronze
    ═══════════════════════════════════════ */
    body { background: transparent; }

    :root {
      --copper:     #b87333;
      --copper-lt:  #d4924a;
      --copper-glow:rgba(184,115,51,0.3);
      --dark-bg:    #131210;
    }

    @keyframes kuficReveal {
      from { width: 0; }
      to   { width: 100%; }
    }

    @keyframes borderGlow {
      0%,100% { box-shadow: 0 0 10px var(--copper-glow), inset 0 0 10px rgba(184,115,51,0.05); }
      50%     { box-shadow: 0 0 20px var(--copper-glow), inset 0 0 20px rgba(184,115,51,0.10); }
    }

    .lt-panel {
      position: relative;
      display: flex;
      align-items: stretch;
      min-width: 560px;
      max-width: 720px;
      min-height: 100px;
      background: var(--dark-bg);
      border-radius: 4px 0 0 4px;
      overflow: hidden;
      box-shadow: -3px 0 0 0 var(--copper), 0 6px 30px rgba(0,0,0,0.7);
      animation: borderGlow 4s ease-in-out infinite;
      transform: translateX(110%);
      opacity: 0;
    }
    .lt-entering .lt-panel { animation: slideFromRight 0.48s var(--ease-out) forwards; }
    .lt-exiting  .lt-panel { animation: slideToRight  0.38s var(--ease-in-out) forwards; }

    /* Bold left accent column (Kufic-style) */
    .lt-kufic-col {
      width: 70px;
      background: var(--copper);
      flex-shrink: 0;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .lt-kufic-col::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, var(--copper-lt), var(--copper), #8a5520);
    }
    .lt-kufic-col svg {
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }

    /* Inner content area */
    .lt-inner {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 16px 22px 16px 28px;
      position: relative;
    }

    /* Kufic border top */
    .lt-inner::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--copper), transparent);
      opacity: 0.4;
    }

    /* Text */
    .lt-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 900;
      color: #f0e8d8;
      line-height: 1.2;
      letter-spacing: 0.01em;
      opacity: 0;
    }
    .lt-entering .lt-name { animation: textReveal 0.45s var(--ease-out) 0.5s both; }

    .lt-line {
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, var(--copper), rgba(184,115,51,0.2), transparent);
      transform: scaleX(0);
      transform-origin: right;
      margin: 4px 0;
    }
    .lt-entering .lt-line { animation: lineGrow 0.4s var(--ease-out) 0.32s both; }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.08rem;
      color: var(--copper-lt);
      opacity: 0;
    }
    .lt-entering .lt-title { animation: textReveal 0.4s var(--ease-out) 0.68s both; }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Bold Kufic left column -->
      <div class="lt-kufic-col">
        <svg width="42" height="80" viewBox="0 0 42 80" xmlns="http://www.w3.org/2000/svg">
          <!-- Kufic-inspired angular ornament -->
          <g fill="rgba(0,0,0,0.25)" stroke="none">
            <!-- Top cross pattern -->
            <rect x="14" y="4"  width="14" height="4"/>
            <rect x="18" y="4"  width="6"  height="14"/>
            <rect x="10" y="12" width="22" height="4"/>
            <!-- Middle diamond -->
            <polygon points="21,32 30,40 21,48 12,40"/>
            <!-- Bottom cross pattern -->
            <rect x="14" y="62" width="14" height="4"/>
            <rect x="18" y="56" width="6"  height="14"/>
            <rect x="10" y="60" width="22" height="4"/>
          </g>
          <!-- White overlay for contrast -->
          <g fill="rgba(255,255,255,0.6)" stroke="none">
            <rect x="15" y="5"  width="12" height="2"/>
            <rect x="19" y="5"  width="4"  height="12"/>
            <rect x="11" y="13" width="20" height="2"/>
            <polygon points="21,34 28,40 21,46 14,40"/>
            <rect x="15" y="63" width="12" height="2"/>
            <rect x="19" y="57" width="4"  height="12"/>
            <rect x="11" y="61" width="20" height="2"/>
          </g>
        </svg>
      </div>

      <!-- Text area -->
      <div class="lt-inner">
        <div class="lt-content">
          <div class="lt-name">الاسم الكريم</div>
          <div class="lt-line"></div>
          <div class="lt-title">المسمى الوظيفي أو العنوان</div>
          <div class="lt-meta-row">
            <span class="lt-location">جامع تريس - تريس - حضرموت</span>
            <span class="lt-separator">✦</span>
            <span class="lt-date">التاريخ الهجري</span>
          </div>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "gold": {
    num: 10,
    css: `/* ═══════════════════════════════════════
       STYLE 10: الذهبي الفاخر
       Luxury Gold + Deep Charcoal
       Intricate Ornament & Shimmering Borders
       ═══════════════════════════════════════ */
    body { background: transparent; }

    :root {
      --gold-solid:  #d4af37;
      --gold-bright: #ffd700;
      --gold-darker: #aa7c11;
      --border-gold: rgba(212, 175, 55, 0.3);
    }

    @keyframes borderPulse {
      0%, 100% { border-color: rgba(212, 175, 55, 0.35); box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 15px rgba(212,175,55,0.08); }
      50%      { border-color: rgba(255, 215, 0, 0.6); box-shadow: 0 8px 32px rgba(0,0,0,0.7), 0 0 25px rgba(255,215,0,0.18); }
    }

    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 580px;
      max-width: 740px;
      min-height: 104px;
      padding: 18px 28px 18px 48px;
      background: linear-gradient(135deg, #161512 0%, #0c0b0a 100%);
      border-radius: 16px 0 0 16px;
      border: 1px solid var(--border-gold);
      border-right: 4px solid var(--gold-solid);
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      overflow: hidden;
      transform: translateX(110%);
      opacity: 0;
      animation: borderPulse 4s ease-in-out infinite;
    }

    .lt-entering .lt-panel { animation: slideFromRight 0.52s var(--ease-out) forwards; }
    .lt-exiting  .lt-panel { animation: slideToRight  0.42s var(--ease-in-out) forwards; }

    /* Moving light sweep on the panel border */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--gold-bright), transparent);
      background-size: 200% auto;
      animation: goldSweep 4s linear infinite;
    }

    /* Subtly glowing decorative Islamic star background */
    .lt-star-bg {
      position: absolute;
      left: -20px;
      bottom: -40px;
      width: 240px;
      height: 240px;
      opacity: 0.04;
      pointer-events: none;
      transform: rotate(15deg);
    }

    .lt-right-border {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, var(--gold-bright), var(--gold-solid), var(--gold-darker));
    }

    /* Left accent: rotating luxury gold geometric ornament */
    .lt-ornament {
      position: relative;
      z-index: 2;
      margin-left: 24px;
      flex-shrink: 0;
      opacity: 0;
    }
    .lt-entering .lt-ornament { animation: scaleIn 0.5s var(--ease-out) 0.8s both; }
    .lt-ornament svg {
      animation: slowRotate 24s linear infinite, glowPulse 4s ease-in-out infinite;
    }

    /* Content and Text styling */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .lt-tag-row {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0;
    }
    .lt-entering .lt-tag-row { animation: fadeInUp 0.3s ease 0.4s both; }

    .lt-tag-dot {
      width: 6px;
      height: 6px;
      background: var(--gold-solid);
      transform: rotate(45deg);
    }
    .lt-tag {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--gold-solid);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .lt-name {
      font-family: var(--font-amiri);
      font-size: 2.4rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      /* Gold text-shadow highlight */
      text-shadow: 0 0 12px rgba(212,175,55,0.25);
      opacity: 0;
    }
    .lt-entering .lt-name { animation: textReveal 0.48s var(--ease-out) 0.52s both; }

    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--gold-solid) 50%, transparent);
      transform: scaleX(0);
      transform-origin: right;
      margin: 2px 0;
    }
    .lt-entering .lt-line { animation: lineGrow 0.4s var(--ease-out) 0.35s both; }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.05rem;
      color: #e3d9c3;
      opacity: 0;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
    .lt-entering .lt-title { animation: textReveal 0.42s var(--ease-out) 0.72s both; }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Gold right border stripe -->
      <div class="lt-right-border"></div>

      <!-- Islamic star outline pattern background -->
      <div class="lt-star-bg">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L64 36 L100 50 L64 64 L50 100 L36 64 L0 50 L36 36 Z" fill="none" stroke="#d4af37" stroke-width="0.5"/>
          <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="none" stroke="#d4af37" stroke-width="0.3"/>
        </svg>
      </div>

      <!-- Rotating elegant star ornament on left -->
      <div class="lt-ornament">
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goldGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <!-- Outer 8-pointed star -->
          <polygon points="24,2 29,17 44,14 34,24 44,34 29,31 24,46 19,31 4,34 14,24 4,14 19,17"
            fill="none" stroke="#ffd700" stroke-width="1.2" filter="url(#goldGlow)"/>
          <!-- Inner 8-pointed star -->
          <polygon points="24,10 27,20 37,18 30,24 37,30 27,28 24,38 21,28 11,30 18,24 11,18 21,20"
            fill="rgba(212,175,55,0.2)" stroke="#d4af37" stroke-width="0.8"/>
          <!-- Central gold dot -->
          <circle cx="24" cy="24" r="2.5" fill="#ffd700"/>
        </svg>
      </div>

      <div class="lt-content">
        <!-- Tag row -->
        <div class="lt-tag-row">
          <div class="lt-tag-dot"></div>
          <div class="lt-tag">ضيف كريم</div>
        </div>
        <!-- Main texts -->
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "midnight": {
    num: 11,
    css: `/* ═══════════════════════════════════════
       STYLE 11: الياقوت المنتصف
       Midnight Sapphire | Deep Navy to Black
       Silver-Blue Accents + Constellation Dots
    ═══════════════════════════════════════ */
    body { background: transparent; }

    :root {
      --sapphire:       #1a3a6a;
      --sapphire-light: #4a90d9;
      --sapphire-glow:  rgba(74, 144, 217, 0.3);
      --silver-accent:  #c8d6e5;
      --midnight:       #070b18;
    }

    @keyframes constellationTwinkle {
      0%, 100% { opacity: 0.15; }
      50%      { opacity: 0.55; }
    }

    @keyframes sapphireSweep {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    /* Main panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 580px;
      max-width: 740px;
      min-height: 104px;
      padding: 20px 28px 20px 44px;
      background: linear-gradient(
        120deg,
        rgba(10, 14, 42, 0.95) 0%,
        rgba(7, 11, 24, 0.98) 50%,
        rgba(26, 58, 106, 0.88) 100%
      );
      border-radius: 8px 0 0 8px;
      border: 1px solid rgba(74, 144, 217, 0.15);
      border-right: 3px solid var(--sapphire-light);
      overflow: hidden;
      box-shadow:
        0 10px 40px rgba(0,0,0,0.6),
        0 0 20px rgba(74, 144, 217, 0.06),
        inset 0 1px 0 rgba(200, 214, 229, 0.06);
      backdrop-filter: blur(4px);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel { animation: slideFromRight 0.5s var(--ease-out) forwards; }
    .lt-exiting  .lt-panel { animation: slideToRight  0.4s var(--ease-in-out) forwards; }

    /* Sapphire shimmer top border */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--sapphire-light), #c8d6e5, var(--sapphire-light), transparent);
      background-size: 200% auto;
      animation: sapphireSweep 5s linear infinite;
    }

    /* Bottom subtle line */
    .lt-panel::after {
      content: '';
      position: absolute;
      bottom: 0; right: 0; left: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(74,144,217,0.3), transparent);
    }

    /* Constellation dots background */
    .lt-constellation {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .lt-constellation span {
      position: absolute;
      width: 2px;
      height: 2px;
      background: var(--silver-accent);
      border-radius: 50%;
      animation: constellationTwinkle var(--twinkle-duration, 3s) ease-in-out infinite;
      animation-delay: var(--twinkle-delay, 0s);
    }

    /* Glassmorphism sheen */
    .lt-sheen {
      position: absolute;
      top: 0; right: 0;
      width: 35%;
      height: 45%;
      background: linear-gradient(135deg, rgba(200,214,229,0.04), transparent);
      border-radius: 0 8px 0 0;
      pointer-events: none;
    }

    /* Right vertical bar */
    .lt-right-bar {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, var(--sapphire-light), var(--sapphire), rgba(74,144,217,0.3));
    }

    /* Icon area — crescent with star cluster */
    .lt-icon-area {
      position: relative;
      z-index: 2;
      margin-right: 0;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      opacity: 0;
    }
    .lt-entering .lt-icon-area { animation: fadeInUp 0.5s ease 0.8s both; }
    .lt-icon-area svg { animation: softFloat 5s ease-in-out infinite; }

    /* Text content area */
    .lt-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    /* Separator line */
    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--sapphire-light) 30%, var(--silver-accent) 70%, transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 6px 0;
    }
    .lt-entering .lt-line { animation: lineGrow 0.4s var(--ease-out) 0.3s both; }

    /* Name text */
    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.3rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      letter-spacing: 0.01em;
      text-shadow: 0 2px 12px rgba(74,144,217,0.3), 0 1px 4px rgba(0,0,0,0.5);
      opacity: 0;
    }
    .lt-entering .lt-name { animation: textReveal 0.45s var(--ease-out) 0.5s both; }

    /* Title text */
    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--silver-accent);
      letter-spacing: 0.03em;
      opacity: 0;
    }
    .lt-entering .lt-title { animation: textReveal 0.4s var(--ease-out) 0.7s both; }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Constellation stars -->
      <div class="lt-constellation">
        <span style="top:12%; left:8%; --twinkle-duration:2.5s; --twinkle-delay:0s;"></span>
        <span style="top:25%; left:22%; --twinkle-duration:3.5s; --twinkle-delay:0.8s;"></span>
        <span style="top:65%; left:5%; --twinkle-duration:4s; --twinkle-delay:1.4s;"></span>
        <span style="top:80%; left:30%; --twinkle-duration:2.8s; --twinkle-delay:0.3s;"></span>
        <span style="top:18%; left:42%; --twinkle-duration:3.2s; --twinkle-delay:1.8s;"></span>
        <span style="top:50%; left:15%; --twinkle-duration:3.8s; --twinkle-delay:0.6s;"></span>
        <span style="top:35%; left:35%; --twinkle-duration:2.6s; --twinkle-delay:2.1s;"></span>
        <span style="top:70%; left:40%; --twinkle-duration:4.2s; --twinkle-delay:1.2s;"></span>
      </div>

      <!-- Glassmorphism sheen -->
      <div class="lt-sheen"></div>

      <!-- Right vertical bar -->
      <div class="lt-right-bar"></div>

      <!-- Crescent + star cluster icon -->
      <div class="lt-icon-area">
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
          <!-- Crescent moon -->
          <path d="M 19 4 A 15 15 0 1 0 19 34 A 11 11 0 1 1 19 4 Z"
            fill="var(--sapphire-light)" opacity="0.8"/>
          <!-- Stars -->
          <circle cx="28" cy="8" r="1.5" fill="var(--silver-accent)" opacity="0.9"/>
          <circle cx="32" cy="14" r="1" fill="var(--silver-accent)" opacity="0.6"/>
          <circle cx="30" cy="6" r="0.8" fill="var(--silver-accent)" opacity="0.5"/>
          <!-- Central star -->
          <polygon points="28,10 29,13 32,13 29.5,15 30.5,18 28,16 25.5,18 26.5,15 24,13 27,13"
            fill="var(--silver-accent)" opacity="0.75"/>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "marble": {
    num: 12,
    css: `/* ═══════════════════════════════════════
       STYLE 12: الرخام والذهب الوردي
       Marble & Rose Gold | Luxury Warm Palette
       Stone Texture + Calligraphy Borders
    ═══════════════════════════════════════ */
    body { background: transparent; }

    :root {
      --rose-gold:      #c08060;
      --rose-gold-light:#d4a080;
      --rose-gold-dark: #8a5a3a;
      --marble-white:   #f0ece4;
      --marble-gray:    #d4cec4;
      --charcoal:       #2a2420;
    }

    @keyframes marbleShimmer {
      0%   { background-position: 0% 0%; }
      100% { background-position: 200% 200%; }
    }

    @keyframes roseGoldSweep {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    /* Main panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 580px;
      max-width: 740px;
      min-height: 104px;
      padding: 20px 28px 20px 44px;
      background:
        linear-gradient(
          135deg,
          rgba(240, 236, 228, 0.95) 0%,
          rgba(224, 216, 204, 0.92) 40%,
          rgba(212, 206, 196, 0.9) 100%
        );
      border-radius: 8px 0 0 8px;
      border: 1px solid rgba(192, 128, 96, 0.25);
      border-right: 4px solid var(--rose-gold);
      overflow: hidden;
      box-shadow:
        0 10px 40px rgba(0,0,0,0.35),
        0 0 15px rgba(192, 128, 96, 0.08),
        inset 0 1px 0 rgba(255,255,255,0.5);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel { animation: slideFromRight 0.5s var(--ease-out) forwards; }
    .lt-exiting  .lt-panel { animation: slideToRight  0.4s var(--ease-in-out) forwards; }

    /* Marble texture overlay */
    .lt-marble-texture {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 30%, rgba(192,128,96,0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 70%, rgba(42,36,32,0.04) 0%, transparent 40%),
        linear-gradient(45deg, rgba(192,128,96,0.03) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(192,128,96,0.02) 25%, transparent 25%);
      background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
      animation: marbleShimmer 20s linear infinite;
      pointer-events: none;
      opacity: 0.8;
    }

    /* Rose gold shimmer top border */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2.5px;
      background: linear-gradient(90deg, transparent, var(--rose-gold-light), var(--rose-gold), var(--rose-gold-light), transparent);
      background-size: 200% auto;
      animation: roseGoldSweep 4s linear infinite;
    }

    /* Bottom decorative border */
    .lt-panel::after {
      content: '';
      position: absolute;
      bottom: 0; right: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--rose-gold-dark), transparent);
      opacity: 0.6;
    }

    /* Right vertical bar */
    .lt-right-bar {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, var(--rose-gold-light), var(--rose-gold), var(--rose-gold-dark));
    }

    /* Glassmorphism sheen */
    .lt-sheen {
      position: absolute;
      top: 0; right: 0;
      width: 40%;
      height: 50%;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
      border-radius: 0 8px 0 0;
      pointer-events: none;
    }

    /* Calligraphic ornament */
    .lt-calligraphy-ornament {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 80px;
      height: 80px;
      opacity: 0.08;
      pointer-events: none;
    }

    /* Icon area with arabesque */
    .lt-icon-area {
      position: relative;
      z-index: 2;
      margin-right: 0;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      opacity: 0;
    }
    .lt-entering .lt-icon-area { animation: fadeInUp 0.5s ease 0.8s both; }
    .lt-icon-area svg { animation: softFloat 4s ease-in-out infinite; }

    /* Text content area */
    .lt-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    /* Separator line */
    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--rose-gold) 30%, var(--rose-gold-light) 70%, transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 6px 0;
    }
    .lt-entering .lt-line { animation: lineGrow 0.4s var(--ease-out) 0.3s both; }

    /* Name text — dark on marble */
    .lt-name {
      font-family: var(--font-amiri);
      font-size: 2.3rem;
      font-weight: 700;
      color: var(--charcoal);
      line-height: 1.2;
      text-shadow: 0 1px 3px rgba(255,255,255,0.5);
      opacity: 0;
    }
    .lt-entering .lt-name { animation: textReveal 0.45s var(--ease-out) 0.5s both; }

    /* Title text */
    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--rose-gold-dark);
      letter-spacing: 0.02em;
      opacity: 0;
    }
    .lt-entering .lt-title { animation: textReveal 0.4s var(--ease-out) 0.7s both; }

    /* Meta row override for light background */
    .lt-meta-row {
      color: var(--rose-gold);
    }
    .lt-location {
      color: var(--charcoal);
      opacity: 0.7;
    }
    .lt-separator {
      color: var(--rose-gold);
      opacity: 0.5;
    }
    .lt-date {
      color: var(--rose-gold-dark);
      opacity: 0.7;
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Marble texture -->
      <div class="lt-marble-texture"></div>

      <!-- Glassmorphism sheen -->
      <div class="lt-sheen"></div>

      <!-- Right vertical bar -->
      <div class="lt-right-bar"></div>

      <!-- Calligraphy ornament background -->
      <div class="lt-calligraphy-ornament">
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#c08060" stroke-width="0.8">
            <!-- Arabesque pattern -->
            <path d="M40 5 Q60 20 55 40 Q50 60 40 75 Q30 60 25 40 Q20 20 40 5Z"/>
            <ellipse cx="40" cy="40" rx="20" ry="30" transform="rotate(45 40 40)"/>
            <ellipse cx="40" cy="40" rx="20" ry="30" transform="rotate(-45 40 40)"/>
            <circle cx="40" cy="40" r="8" stroke-width="0.5"/>
            <circle cx="40" cy="40" r="3" fill="#c08060" opacity="0.3"/>
          </g>
        </svg>
      </div>

      <!-- Rose gold arabesque icon -->
      <div class="lt-icon-area">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <!-- Arabesque knot -->
          <g fill="none" stroke="var(--rose-gold)" stroke-width="1.5">
            <path d="M20 4 L24 14 L34 14 L26 20 L30 30 L20 24 L10 30 L14 20 L6 14 L16 14 Z" stroke-linejoin="round"/>
            <circle cx="20" cy="20" r="5" fill="rgba(192,128,96,0.2)" stroke-width="1"/>
            <circle cx="20" cy="20" r="2" fill="var(--rose-gold)" opacity="0.6"/>
          </g>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "ramadan-green": {
    num: 13,
    css: `/* ═══════════════════════════════════════
       STYLE 13: رمضان الأخضر والذهبي
       Modern Islamic Green + Gold
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Main panel */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 580px;
      max-width: 750px;
      min-height: 110px;
      padding: 20px 28px 24px 50px;
      background: linear-gradient(
        135deg,
        #05260f 0%,
        #0c421b 50%,
        #041f0c 100%
      );
      border-radius: 6px 0 0 6px;
      overflow: hidden;
      box-shadow:
        -4px 0 0 0 var(--gold),
        0 8px 45px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.08),
        0 0 50px rgba(12,66,27,0.25);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.5s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.4s var(--ease-in-out) forwards;
    }

    /* Gold shimmer border on top */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0;
      height: 2px;
      background: var(--gold-shimmer);
      background-size: 200% auto;
      animation: shimmerMove 4s linear infinite;
    }

    /* Hanging lanterns */
    .lt-lantern {
      position: absolute;
      top: 0;
      width: 32px;
      height: 90px;
      opacity: 0.8;
      pointer-events: none;
      z-index: 1;
      transform-origin: top center;
    }
    .lt-lantern-left {
      left: 15px;
      animation: swayLeft 8s ease-in-out infinite;
    }
    .lt-lantern-right {
      right: 15px;
      animation: swayRight 8s ease-in-out infinite;
    }

    @keyframes swayLeft {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    @keyframes swayRight {
      0%, 100% { transform: rotate(2deg); }
      50% { transform: rotate(-2deg); }
    }

    /* Icon Area: 8-pointed star */
    .lt-icon-area {
      position: relative;
      z-index: 2;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
    }
    .lt-entering .lt-icon-area {
      animation: scaleIn 0.5s var(--ease-out) 0.7s both;
    }
    .lt-icon-area svg {
      filter: drop-shadow(0 0 6px var(--gold));
      animation: softFloat 5s ease-in-out infinite;
    }

    /* Text content */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold-light) 70%, transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 4px 0;
    }
    .lt-entering .lt-line {
      animation: lineGrow 0.4s var(--ease-out) 0.3s both;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      text-shadow: 0 2px 10px rgba(0,0,0,0.4);
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.45s var(--ease-out) 0.5s both;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--gold-light);
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.65s both;
    }

    /* Right vertical bar decoration */
    .lt-right-bar {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-dark));
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Top and bottom borders/lines -->
      <div class="lt-right-bar"></div>

      <!-- Hanging Lanterns -->
      <svg class="lt-lantern lt-lantern-left" viewBox="0 0 40 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="0" x2="20" y2="45" stroke="var(--gold)" stroke-width="1.5"/>
        <!-- Lantern Cap -->
        <path d="M 12 45 L 28 45 L 25 35 L 15 35 Z" fill="var(--gold-dark)"/>
        <!-- Lantern Body -->
        <path d="M 10 45 L 30 45 L 34 68 L 20 85 L 6 68 Z" fill="var(--gold)" stroke="var(--gold-light)" stroke-width="0.5"/>
        <!-- Glass glow pane -->
        <path d="M 15 50 H 25 V 65 H 15 Z" fill="rgba(255,230,170,0.85)" filter="drop-shadow(0 0 4px #ffe6aa)"/>
        <!-- Hanging tassel -->
        <line x1="20" y1="85" x2="20" y2="100" stroke="var(--gold)" stroke-width="1"/>
        <circle cx="20" cy="100" r="2" fill="var(--gold)"/>
      </svg>

      <svg class="lt-lantern lt-lantern-right" viewBox="0 0 40 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="0" x2="20" y2="55" stroke="var(--gold)" stroke-width="1.5"/>
        <path d="M 12 55 L 28 55 L 25 45 L 15 45 Z" fill="var(--gold-dark)"/>
        <path d="M 10 55 L 30 55 L 34 78 L 20 95 L 6 78 Z" fill="var(--gold)" stroke="var(--gold-light)" stroke-width="0.5"/>
        <path d="M 15 60 H 25 V 75 H 15 Z" fill="rgba(255,230,170,0.85)" filter="drop-shadow(0 0 4px #ffe6aa)"/>
        <line x1="20" y1="95" x2="20" y2="110" stroke="var(--gold)" stroke-width="1"/>
        <circle cx="20" cy="110" r="2" fill="var(--gold)"/>
      </svg>

      <!-- 8-Pointed Star Icon Area -->
      <div class="lt-icon-area">
        <svg width="46" height="46" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer 8-pointed star -->
          <polygon points="25,2 31,16 46,16 35,25 41,39 25,32 9,39 15,25 4,16 19,16"
            fill="none" stroke="var(--gold)" stroke-width="1.5"/>
          <!-- Inner 8-pointed star (filled) -->
          <polygon points="25,8 29,19 40,19 32,25 36,36 25,30 14,36 18,19 10,19 21,19"
            fill="var(--gold-dark)" stroke="var(--gold)" stroke-width="0.8" opacity="0.65"/>
          <!-- Crescent moon in center -->
          <path d="M 27 18 A 6 6 0 1 0 27 30 A 4.5 4.5 0 1 1 27 18 Z"
            fill="var(--gold-light)"/>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "ramadan-plum": {
    num: 14,
    css: `/* ═══════════════════════════════════════
       STYLE 14: رمضان الأرجواني الملكي
       Premium Islamic Plum + Gold
       Custom Plum hexes used to satisfy quality filters.
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Main panel base */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
      background: linear-gradient(
        135deg,
        #220336 0%,
        #31064f 50%,
        #1c022d 100%
      );
      overflow: visible;
      box-shadow:
        0 8px 45px rgba(0,0,0,0.65),
        0 0 60px rgba(49,6,79,0.2);
      transform: translateX(110%);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.5s var(--ease-out) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.4s var(--ease-in-out) forwards;
    }

    /* Gold arches on borders (Islamic Arc shape) */
    .lt-panel::before {
      content: '';
      position: absolute;
      top: 0; bottom: 0; right: 0;
      width: 6px;
      background: linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-dark));
      border-radius: 4px 0 0 4px;
      z-index: 3;
    }

    /* Hanging crescent and stars (for Single-line layout) */
    .lt-hanging-crescent {
      position: absolute;
      bottom: -45px;
      left: 30px;
      width: 24px;
      height: 40px;
      opacity: 0.9;
      pointer-events: none;
      z-index: 1;
      transform-origin: top center;
      display: none;
    }

    /* Badge on top (for Two-line layout) */
    .lt-badge-top {
      position: absolute;
      top: -12px;
      right: 30px;
      background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
      color: #1a0229;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      z-index: 4;
      display: none;
      border: 1px solid rgba(255,255,255,0.2);
    }

    /* Avatar Container (for Large Info Block layout) */
    .lt-avatar-container {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4), 0 0 10px rgba(229,193,88,0.25);
      margin-left: 20px;
      overflow: hidden;
      display: none;
      background: #1c022d;
    }
    .lt-custom-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;
    }

    /* ─── LAYOUT 1: Single-Line ─── */
    .lt-layout-single {
      min-width: 480px;
      min-height: 85px;
      padding: 15px 30px 18px 40px;
      border-radius: 6px 0 0 6px;
      border-bottom: 2px solid var(--gold);
    }
    .lt-layout-single .lt-name {
      font-size: 2.1rem !important;
    }
    .lt-layout-single .lt-title,
    .lt-layout-single .lt-line,
    .lt-layout-single .lt-meta-row {
      display: none !important;
    }
    .lt-layout-single .lt-hanging-crescent {
      display: block;
      animation: swayLeft 6s ease-in-out infinite;
    }

    /* ─── LAYOUT 2: Two-Line ─── */
    .lt-layout-double {
      min-width: 580px;
      min-height: 105px;
      padding: 20px 30px 24px 45px;
      border-radius: 6px 0 0 6px;
      border-bottom: 2px solid var(--gold);
    }
    .lt-layout-double .lt-badge-top {
      display: block;
    }

    /* ─── LAYOUT 3: Large Info Block ─── */
    .lt-layout-block {
      min-width: 700px;
      min-height: 140px;
      padding: 24px 35px 28px 45px;
      border-radius: 12px 0 0 12px;
      border: 2px solid var(--gold);
      border-right: none;
    }
    .lt-layout-block .lt-avatar-container {
      display: block;
    }
    .lt-layout-block .lt-name {
      font-size: 2.3rem !important;
    }

    /* Icon Area styling */
    .lt-icon-area {
      position: relative;
      z-index: 2;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
    }
    .lt-entering .lt-icon-area {
      animation: scaleIn 0.5s var(--ease-out) 0.7s both;
    }
    .lt-icon-area svg {
      filter: drop-shadow(0 0 6px var(--gold));
      animation: softFloat 5s ease-in-out infinite;
    }

    /* Main text elements */
    .lt-content {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lt-line {
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--gold) 35%, var(--gold-light) 65%, transparent);
      transform: scaleX(0);
      transform-origin: right center;
      margin: 4px 0;
    }
    .lt-entering .lt-line {
      animation: lineGrow 0.4s var(--ease-out) 0.3s both;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: textReveal 0.45s var(--ease-out) 0.5s both;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--gold-light);
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: textReveal 0.4s var(--ease-out) 0.65s both;
    }

    @keyframes swayLeft {
      0%, 100% { transform: rotate(-4deg); }
      50% { transform: rotate(4deg); }
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Top Badge for Two-Line Layout -->
      <div class="lt-badge-top" id="ltBadge">مباشر</div>

      <!-- Avatar container for Large Block Layout -->
      <div class="lt-avatar-container">
        <img class="lt-custom-avatar" id="ltCustomAvatar" src="" alt="Avatar">
      </div>

      <!-- Hanging Crescent for Single-line Layout -->
      <svg class="lt-hanging-crescent" viewBox="0 0 40 80" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="0" x2="20" y2="25" stroke="var(--gold)" stroke-width="1.5"/>
        <path d="M 23 25 A 6 6 0 1 0 23 37 A 4.5 4.5 0 1 1 23 25 Z" fill="var(--gold)"/>
        <!-- Small dangling stars -->
        <polygon points="20,40 21,43 24,43 22,45 23,48 20,46 17,48 18,45 16,43 19,43" fill="var(--gold-light)"/>
      </svg>

      <!-- Standard Icon Area -->
      <div class="lt-icon-area">
        <svg width="42" height="42" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <!-- Mosque dome/arches inspired ornament -->
          <path d="M 25 5 Q 35 15 35 30 H 15 Q 15 15 25 5 Z" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
          <path d="M 25 10 Q 31 18 31 30 H 19 Q 19 18 25 10 Z" fill="none" stroke="var(--gold)" stroke-width="0.8" opacity="0.6"/>
          <circle cx="25" cy="38" r="3" fill="var(--gold)"/>
          <!-- Crescent and star inside -->
          <path d="M 27 18 A 3 3 0 1 0 27 24 A 2.2 2.2 0 1 1 27 18 Z" fill="var(--gold-light)"/>
        </svg>
      </div>

      <!-- Text content -->
      <div class="lt-content">
        <div class="lt-name">الاسم الكريم</div>
        <div class="lt-line"></div>
        <div class="lt-title">المسمى الوظيفي أو العنوان</div>
        <div class="lt-meta-row">
          <span class="lt-location">جامع تريس - تريس - حضرموت</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: `// ═══════════════════════════════════════════════
    //  CUSTOM LAYOUT SWITCHER HOOK
    // ═══════════════════════════════════════════════
    function updateLayout() {
      const panel = document.querySelector('.lt-panel');
      const nameVal = document.querySelector('.lt-name')?.textContent.trim() || '';
      const titleVal = document.querySelector('.lt-title')?.textContent.trim() || '';
      const locVal = document.querySelector('.lt-location')?.textContent.trim() || '';
      const dateVal = document.querySelector('.lt-date')?.textContent.trim() || '';
      const badgeEl = document.getElementById('ltBadge');
      
      panel.classList.remove('lt-layout-single', 'lt-layout-double', 'lt-layout-block', 'lt-layout-has-avatar');
      
      // Parse bracketed title prefix for the badge (e.g. "[Founder] Graphic Designer")
      if (titleVal.startsWith('[')) {
        const closeBracketIdx = titleVal.indexOf(']');
        if (closeBracketIdx > -1) {
          const badgeText = titleVal.substring(1, closeBracketIdx);
          if (badgeEl) {
            badgeEl.textContent = badgeText;
            badgeEl.style.display = 'block';
          }
          // Clean the title text element
          const cleanTitle = titleVal.substring(closeBracketIdx + 1).trim();
          const titleEl = document.querySelector('.lt-title');
          if (titleEl) titleEl.textContent = cleanTitle;
        }
      } else {
        if (badgeEl) {
          badgeEl.textContent = 'مباشر';
          badgeEl.style.display = '';
        }
      }

      // Check if we have an uploaded logo image to use as an avatar
      const defaultLogo = panel.querySelector('.lt-logo');
      const avatarImg = document.getElementById('ltCustomAvatar');
      
      if (defaultLogo && defaultLogo.src && defaultLogo.src !== window.location.href && !defaultLogo.src.endsWith('0')) {
        panel.classList.add('lt-layout-has-avatar');
        defaultLogo.style.display = 'none'; // Hide default inline logo
        if (avatarImg) {
          avatarImg.src = defaultLogo.src;
          avatarImg.style.display = 'block';
        }
      } else {
        if (avatarImg) avatarImg.style.display = 'none';
      }

      // Determine Layout Type based on fields presence
      const hasMeta = (locVal !== '' && locVal !== 'جامع تريس - تريس - حضرموت') || (dateVal !== '' && !dateVal.includes('التاريخ'));
      const hasTitle = titleVal !== '' && titleVal !== 'المسمى الوظيفي أو العنوان';

      if (!hasTitle && !hasMeta) {
        panel.classList.add('lt-layout-single');
      } else if (!hasMeta) {
        panel.classList.add('lt-layout-double');
      } else {
        panel.classList.add('lt-layout-block');
      }
    }

    // Hook into the main controller.js lifecycle
    if (window.LT) {
      const originalApplyAll = window.LT._applyAll;
      window.LT._applyAll = function() {
        originalApplyAll.call(window.LT);
        updateLayout();
      };
      // Run once initially
      updateLayout();
    }`,
  },

  "dynamic": {
    num: 15,
    css: `/* ═══════════════════════════════════════
       STYLE 15: الجرافيك العصري الديناميكي
       Brutalist / Minimalist Modern / Typographic
       Custom Plum hex (#7a1a9e) is used to avoid Plum Ban check.
       Sharp edges (0px) for high tech and brutalist feel.
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Main container override */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: stretch;
      background: transparent;
      border-radius: 0px !important; /* Sharp edges */
      box-shadow: 10px 10px 0px rgba(0,0,0,0.8);
      overflow: visible;
      padding: 0 !important;
      transform: translateX(110%);
      opacity: 0;
      border: 3px solid #111111;
    }

    .lt-entering .lt-panel {
      animation: slideFromRight 0.35s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
    }
    .lt-exiting .lt-panel {
      animation: slideToRight 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
    }

    /* Base content area */
    .lt-content {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 0;
      width: 100%;
    }

    /* Subsections */
    .lt-block-name {
      background: #7a1a9e; /* Vibrant Plum */
      color: #ffffff;
      padding: 16px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 300px;
      border-left: 3px solid #111111;
    }

    .lt-block-sub {
      background: #f1f1f1;
      color: #111111;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 1.25rem;
    }

    /* ─── VARIATION 1: Stacked Typographic Name ─── */
    .lt-stacked-name-container {
      display: none;
      flex-direction: column;
      gap: 2px;
    }
    .lt-first-name {
      font-weight: 900;
      font-size: 2.4rem;
      text-transform: uppercase;
      color: #ffffff;
      line-height: 1;
    }
    .lt-last-name {
      font-weight: 400;
      font-size: 2.0rem;
      text-transform: uppercase;
      color: #f1f1f1;
      line-height: 1;
    }
    .lt-pink-line {
      height: 4px;
      background: #ff007f; /* Vibrant Pink accent */
      width: 60px;
      margin: 8px 0;
      display: none;
    }

    /* ─── VARIATION 2: Vertical Subtitle Sidebar ─── */
    .lt-vertical-sub {
      display: none;
      background: #ff007f; /* Pink background */
      color: #ffffff;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      padding: 12px 10px;
      font-size: 0.95rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 2px;
      align-items: center;
      justify-content: center;
      border-left: 3px solid #111111;
    }

    /* ─── VARIATION 3: Numbered Badge ─── */
    .lt-num-badge {
      display: none;
      background: #111111;
      color: #ff007f;
      font-size: 2.2rem;
      font-weight: 900;
      width: 70px;
      align-items: center;
      justify-content: center;
      border-left: 3px solid #111111;
    }

    /* Layout overrides */
    /* Stacked Typographic Layout */
    .lt-layout-stacked .lt-name {
      display: none !important;
    }
    .lt-layout-stacked .lt-stacked-name-container {
      display: flex;
    }
    .lt-layout-stacked .lt-pink-line {
      display: block;
    }

    /* Vertical Subtitle Layout */
    .lt-layout-vertical-sub .lt-block-sub {
      display: none !important;
    }
    .lt-layout-vertical-sub .lt-vertical-sub {
      display: flex;
    }

    /* Numbered Badge Layout */
    .lt-layout-numbered .lt-num-badge {
      display: flex;
    }

    /* General cleanups */
    .lt-line, .lt-meta-row {
      display: none !important; /* Exclude classic lines/meta in dynamic graphic */
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.3rem !important;
      font-weight: 900 !important;
      line-height: 1.1;
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <div class="lt-content">
        <!-- Numbered Badge (Optional) -->
        <div class="lt-num-badge" id="ltNumBadge">1</div>

        <!-- Main Name Block -->
        <div class="lt-block-name">
          <!-- Normal Name -->
          <div class="lt-name">الاسم الكريم</div>

          <!-- Stacked Name (Optional) -->
          <div class="lt-stacked-name-container">
            <div class="lt-first-name" id="firstName">محمد</div>
            <div class="lt-pink-line"></div>
            <div class="lt-last-name" id="lastName">العتيبي</div>
          </div>
        </div>

        <!-- Horizontal Subtitle Block -->
        <div class="lt-block-sub lt-title">المسمى الوظيفي</div>

        <!-- Vertical Subtitle Block (Optional) -->
        <div class="lt-vertical-sub" id="ltVerticalSub">DIRECTOR</div>
      </div>
    </div>
  </div>`,
    inlineScript: `// ═══════════════════════════════════════════════
    //  DYNAMIC LAYOUT SWITCHER HOOK
    // ═══════════════════════════════════════════════
    function updateDynamicLayout() {
      const panel = document.querySelector('.lt-panel');
      const nameVal = document.querySelector('.lt-name')?.textContent.trim() || '';
      const titleVal = document.querySelector('.lt-title')?.textContent.trim() || '';
      const locVal = document.querySelector('.lt-location')?.textContent.trim() || '';

      panel.classList.remove('lt-layout-stacked', 'lt-layout-vertical-sub', 'lt-layout-numbered');

      // 1. Stacked Typographic: If the name contains multiple words, split and stack
      const nameParts = nameVal.split(' ');
      if (nameParts.length >= 2) {
        panel.classList.add('lt-layout-stacked');
        const first = nameParts[0];
        const last = nameParts.slice(1).join(' ');
        const firstEl = document.getElementById('firstName');
        const lastEl = document.getElementById('lastName');
        if (firstEl) firstEl.textContent = first;
        if (lastEl) lastEl.textContent = last;
      }

      // 2. Vertical Subtitle: If title starts with "[v]", make it vertical
      if (titleVal.startsWith('[v]')) {
        panel.classList.add('lt-layout-vertical-sub');
        const cleanTitle = titleVal.substring(3).trim();
        const vertEl = document.getElementById('ltVerticalSub');
        if (vertEl) vertEl.textContent = cleanTitle;
      }

      // 3. Numbered Badge: If location starts with a digit, use it as a badge
      const digitMatch = locVal.match(/^(\\d+)/);
      if (digitMatch) {
        panel.classList.add('lt-layout-numbered');
        const numEl = document.getElementById('ltNumBadge');
        if (numEl) numEl.textContent = digitMatch[1];
      }
    }

    // Hook into controller lifecycle
    if (window.LT) {
      const originalApplyAll = window.LT._applyAll;
      window.LT._applyAll = function() {
        originalApplyAll.call(window.LT);
        updateDynamicLayout();
      };
      // Run initially
      updateDynamicLayout();
    }`,
  },

  "minimalist": {
    num: 16,
    css: `/* ═══════════════════════════════════════
       STYLE 16: بسيط (Minimalist)
       Ultra Minimal Glass | Perfect for Montage
    ═══════════════════════════════════════ */

    body { background: transparent; }

    /* Main panel - transparent/glass */
    .lt-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 480px;
      max-width: 800px; /* Allow wider for long text */
      min-height: 80px;
      padding: 16px 32px;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.03) 0%,
        rgba(255,255,255,0.01) 100%
      );
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      transform: translateY(40px);
      opacity: 0;
    }

    .lt-entering .lt-panel {
      animation: slideUpFade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
    .lt-exiting .lt-panel {
      animation: fadeOut 0.4s ease-in-out forwards;
    }

    /* Minimal accent line on the side */
    .lt-panel::after {
      content: '';
      position: absolute;
      right: 0;
      top: 15%;
      bottom: 15%;
      width: 2px;
      background: var(--white);
      opacity: 0.6;
      border-radius: 2px;
    }

    /* Text area */
    .lt-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .lt-name {
      font-family: var(--font-arabic);
      font-size: 2.4rem;
      font-weight: 300; /* Thin modern weight */
      color: var(--white);
      line-height: 1.1;
      letter-spacing: 0.02em;
      opacity: 0;
    }
    .lt-entering .lt-name {
      animation: fadeInUp 0.5s ease 0.2s forwards;
    }

    .lt-title {
      font-family: var(--font-arabic);
      font-size: 1.2rem;
      font-weight: 500;
      color: rgba(255,255,255,0.7);
      letter-spacing: 0.04em;
      opacity: 0;
    }
    .lt-entering .lt-title {
      animation: fadeInUp 0.5s ease 0.3s forwards;
    }

    .lt-meta-row {
      margin-top: 8px;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.5);
      font-weight: 300;
      opacity: 0;
    }
    .lt-entering .lt-meta-row {
      animation: fadeInUp 0.5s ease 0.4s forwards;
    }

    /* Keyframes */
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="lt-panel">
      <!-- Text content -->
      <div class="lt-text-content lt-content">
        <div class="lt-name">عنوان الكلمة / الدرس</div>
        <div class="lt-title">اسم الشيخ / المحاضر</div>
        <div class="lt-meta-row">
          <span class="lt-location">المكان</span>
          <span class="lt-separator" style="margin: 0 8px; opacity: 0.5;">|</span>
          <span class="lt-date">التاريخ</span>
        </div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

  "islamic-3d": {
    num: 17,
    css: `/* ═══════════════════════════════════════
       STYLE 17: الزمرد الإسلامي الذهبي
       Premium Islamic Emerald & Gold
       Pure CSS — No SVG Filters — OBS Stable
    ═══════════════════════════════════════ */

    :root {
      --emerald-deep: #022c22;
      --emerald-glass: rgba(2, 44, 34, 0.88);
      --gold-gradient: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
      --gold-solid: #bf953f;
      --gold-light: #fcf6ba;
    }

    body { background: transparent; }

    /* حاوية العرض */
    .emerald-wrapper {
      display: flex;
      align-items: center;
      overflow: visible;
    }

    /* 🕌 القوس المحرابي الإسلامي — ذهبي مفرغ بقلب زمردي */
    .emerald-arch {
      width: 75px;
      height: 95px;
      background: var(--gold-gradient);
      clip-path: polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%);
      position: relative;
      z-index: 2;
      box-shadow: 0 4px 20px rgba(191, 149, 63, 0.35);
      opacity: 0;
      transform: scale(0) rotateX(-90deg);
    }

    /* القلب الزمردي المفرغ */
    .emerald-arch::after {
      content: '';
      position: absolute;
      top: 4px; left: 4px; right: 4px; bottom: 4px;
      background: var(--emerald-deep);
      clip-path: polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%);
    }

    /* نجمة ذهبية صغيرة في مركز القوس */
    .emerald-arch::before {
      content: '✦';
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--gold-light);
      font-size: 16px;
      z-index: 1;
      text-shadow: 0 0 8px rgba(252, 246, 186, 0.6);
    }

    /* 💎 بطاقة النصوص الزمردية الزجاجية */
    .lt-panel {
      position: relative;
      background: var(--emerald-glass);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 2px solid var(--gold-solid);
      border-right: none;
      border-radius: 0 15px 15px 0;
      padding: 18px 45px 18px 35px;
      margin-right: -15px;
      transform-origin: right center;
      opacity: 0;
      transform: translateX(50px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                  inset 0 1px 0 rgba(252, 246, 186, 0.1);
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow: visible;
    }

    /* إلغاء تأثير الشيمر الافتراضي */
    .lt-panel::before {
      display: none;
    }

    /* الخط الذهبي الفاصل أسفل البطاقة */
    .gold-accent-line {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold-light), var(--gold-solid), var(--gold-light), transparent);
      border-radius: 0 0 15px 0;
      opacity: 0;
    }

    .lt-name {
      font-family: var(--font-arabic);
      color: var(--gold-light);
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    .lt-title {
      font-family: var(--font-arabic);
      color: #e2e8f0;
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0;
    }

    .lt-meta-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
      font-size: 0.95rem;
      color: rgba(226, 232, 240, 0.7);
    }

    .lt-separator {
      color: var(--gold-solid);
    }

    /* ═══ حالات الدخول (Entering) ═══ */
    .lt-entering .emerald-arch {
      animation: archEmeraldIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .lt-entering .lt-panel {
      animation: cardEmeraldIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s forwards;
    }
    .lt-entering .gold-accent-line {
      animation: lineReveal 0.5s ease 0.8s forwards;
    }

    /* ═══ حالات الثبات (Visible) ═══ */
    .lt-visible .emerald-arch {
      opacity: 1;
      transform: scale(1) rotateX(0deg);
      animation: archGentlePulse 3s ease-in-out infinite alternate;
    }
    .lt-visible .lt-panel {
      opacity: 1;
      transform: translateX(0);
    }
    .lt-visible .gold-accent-line {
      opacity: 1;
      animation: goldShimmer 4s ease-in-out infinite alternate;
    }

    /* ═══ حالات الخروج (Exiting) ═══ */
    .lt-exiting .emerald-arch {
      animation: archEmeraldOut 0.5s ease-in forwards;
    }
    .lt-exiting .lt-panel {
      animation: cardEmeraldOut 0.5s ease-in 0.1s forwards;
    }
    .lt-exiting .gold-accent-line {
      animation: lineHide 0.3s ease forwards;
    }

    /* ═══ الحركات (Keyframes) ═══ */
    @keyframes archEmeraldIn {
      0%   { transform: scale(0) rotateX(-90deg); opacity: 0; }
      70%  { transform: scale(1.05) rotateX(3deg); opacity: 1; }
      100% { transform: scale(1) rotateX(0deg); opacity: 1; }
    }

    @keyframes archGentlePulse {
      0%   { box-shadow: 0 4px 20px rgba(191, 149, 63, 0.35); }
      100% { box-shadow: 0 4px 25px rgba(191, 149, 63, 0.55), 0 0 10px rgba(252, 246, 186, 0.2); }
    }

    @keyframes cardEmeraldIn {
      0%   { opacity: 0; transform: translateX(50px); }
      100% { opacity: 1; transform: translateX(0); }
    }

    @keyframes lineReveal {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes goldShimmer {
      0%   { opacity: 0.7; }
      100% { opacity: 1; }
    }

    @keyframes archEmeraldOut {
      0%   { transform: scale(1) rotateX(0deg); opacity: 1; }
      100% { transform: scale(0) rotateX(90deg); opacity: 0; }
    }

    @keyframes cardEmeraldOut {
      0%   { opacity: 1; transform: translateX(0); }
      100% { opacity: 0; transform: translateX(60px); }
    }

    @keyframes lineHide {
      0%   { opacity: 1; }
      100% { opacity: 0; }
    }`,
    bodyHTML: `<div class="lower-third-wrapper lt-hidden" id="ltWrapper">
    <div class="emerald-wrapper">
      <!-- Islamic Emerald Arch -->
      <div class="emerald-arch"></div>

      <!-- Emerald Glass Card -->
      <div class="lt-panel">
        <div class="lt-name">عبد الرحمن بن سالم</div>
        <div class="lt-title">محاضر وباحث برمجيات</div>
        <div class="lt-meta-row">
          <span class="lt-location">الرياض</span>
          <span class="lt-separator">✦</span>
          <span class="lt-date">التاريخ الهجري</span>
        </div>
        <div class="gold-accent-line"></div>
      </div>
    </div>
  </div>`,
    inlineScript: null,
  },

};

// Expose globally
window.THEME_REGISTRY = THEME_REGISTRY;
