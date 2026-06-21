# ☽✦ Animated Lower Thirds — الإضافة العربية المطوّرة لـ OBS

[العربية (Arabic)](#arabic) | [English](#english)

---

<div id="arabic"></div>

## ☽✦ Animated Lower Thirds — الإضافة العربية المطوّرة لـ OBS (النسخة العربية)

شريط سفلي (Lower Thirds) احترافي للبث المباشر مصمم خصيصاً بالهوية العربية والإسلامية. يتضمن 16 تصميماً مميزاً، لوحة تحكم فورية متعددة اللغات، ونظام تحكم ذكي ومتجاوب بالكامل.

---

## ✨ المميزات الجديدة والمطورة (Architectural Overhaul)

1. **محرك القوالب الموحد (Polymorphic Template Engine) 📁**
   * تم استبدال القوالب الـ 16 المنفصلة بملف عرض موحد `templates/render.html` يستقبل نمط القالب كمعلمة (`?style=emerald`) ويقوم بتحميل الهيكل والـ CSS والزخارف برمجياً.
   * **تحديث فوري بدون إعادة تحميل**: يتم تغيير أنماط القوالب على الهواء مباشرة (Hot-Swap) عبر الـ BroadcastChannel دون الحاجة لإعادة تحميل الإطار (Iframe)، مما يحافظ على استهلاك المعالج والرسوميات **أقل من 1% CPU/GPU** لمنع سقوط الإطارات (Dropped Frames) أثناء البث بدقة 1080p60.

2. **تحجيم وتموضع مرن بالنسبة المئوية (Responsive Layout) 📐**
   * تحول نظام إزاحة التموضع (X/Y Offset) من البكسل الثابت إلى **النسب المئوية المتجاوبة** (`left: X%`, `bottom: Y%`).
   * تضمن هذه الميزة بقاء الشريط في موضعه الصحيح تماماً بغض النظر عن الدقة التي يضبطها المستخدم لمصدر المتصفح في OBS (سواء كانت 1080p أو 720p أو 4K).
   * **توافقية رجعية تلقائية**: إذا قمت باستخدام روابط قديمة تحتوي على قيم إزاحة بالبكسل (أكبر من 20px)، سيقوم المحرك تلقائياً بتحويلها برمجياً لنسب مئوية مكافئة لكي لا تتأثر مشاهدك الحالية.

3. **اتجاه تخطيط مستقل (Independent Layout Direction) ↔️**
   * خيار مستقل تماماً في الإعدادات لتحديد اتجاه الحركة والتخطيط (RTL من اليمين إلى اليسار / LTR من اليسار إلى اليمين).
   * يمكنك الآن تشغيل واجهة لوحة التحكم باللغة الإنجليزية مع الاحتفاظ بتخطيط وحركة القوالب باللغة العربية (RTL).

4. **نظام التشغيل والتمرير التلقائي (Auto-Loop Sequencer) 🔄**
   * أضف Presets إلى قائمة التشغيل (Queue) واتركها تدور تلقائياً مع تحديد مدة العرض ووقت الانتقال الفاصل بين القوالب.
   * **أولوية التحكم اليدوي (Manual Override Priority)**: بمجرد قيام المخرج بأي إجراء يدوي (مثل الضغط على إظهار، إخفاء، تحديث، أو تشغيل قالب معين)، يتم إيقاف التمرير التلقائي فوراً لإعطاء الأولوية المطلقة لإجراءات المشغل المباشرة.

5. **خطوط محلية بالكامل (100% Offline Mode) ⚡**
   * تم حفظ 53 ملف خط أصلي (WOFF2) داخل مجلد `css/fonts/`. لا تحتاج الإضافة للاتصال بالإنترنت إطلاقاً (Zero External Requests)، مما يعطي استجابة فورية وأمان كامل للبث في الصالات والشبكات المغلقة.

6. **توافقية كاملة ودعم النقل التلقائي (Backward Compatibility)**
   * تم الاحتفاظ بجميع مسارات القوالب القديمة (مثل `style1-emerald.html`) كملفات إعادة توجيه ذكية تنقل الإعدادات تلقائياً إلى الملف الموحد الجديد لضمان عدم تلف أي مشاهد مسجلة مسبقاً لدى مستخدمي OBS الحاليين.

---

## 🚀 أسرع طريقة للاستخدام (في أقل من دقيقة!)

### 1. تحميل وتشغيل الإضافة
* **الطريقة اليدوية**: اضغط على الزر الأخضر (Code > Download ZIP) وفك الضغط عن الملف، ثم افتح `index.html` في متصفحك.
* **عبر موجه الأوامر (Terminal)**:
  * **ويندوز (Windows)**:
    ```cmd
    git clone https://github.com/alhamodi/animated-lower-thirds.git
    cd animated-lower-thirds
    start index.html
    ```
  * **الماك (Mac)**:
    ```bash
    git clone https://github.com/alhamodi/animated-lower-thirds.git
    cd animated-lower-thirds
    open index.html
    ```
  * **لينكس (Linux)**:
    ```bash
    git clone https://github.com/alhamodi/animated-lower-thirds.git
    cd animated-lower-thirds
    xdg-open index.html
    ```

### 2. الربط مع برنامج OBS Studio
1. في مصادر OBS، أضف مصدر متصفح جديد **(Browser Source)**.
2. قم بتفعيل خيار ملف محلي **(Local File)**.
3. انقر على `Browse` واختر ملف **`obs.html`** من المجلد الرئيسي للمشروع (يعمل كبوابة موحدة ديناميكية ومستمع للأوامر).
4. اضبط العرض (`Width`) على **1920** والارتفاع (`Height`) على **1080**.
5. اضغط `OK`.

> **💡 ملاحظة هامة لمستخدمي نظام Mac/Linux**: إذا لم تتحدث البيانات تلقائياً في OBS بسبب قيود متصفح OBS المدمج، قم بتشغيل السيرفر المحلي المدمج بكتابة `npm start` في مجلد المشروع، واستخدم الرابط التالي كمصدر متصفح في OBS بدلاً من خيار الملف المحلي:
> `http://localhost:8080/obs.html`

---

## 🎨 قائمة القوالب البصرية الـ 16

| النمط (Style Key) | الاسم العربي في لوحة التحكم | الوصف البصري والزخرفي |
|---|---|---|
| `emerald` | الذهب والزمرد | خلفية خضراء متدرجة مع زخارف إسلامية ثمانية وتذهيب فاخر |
| `royal` | الليل الملكي | تدرج كحلي داكن مع إضاءة وجزيئات عائمة بلون التيل والذهب |
| `modern` | الأنيق الحديث | تصميم بسيط باللون الأسود وخطوط ذهبية هندسية مائلة |
| `fajr` | الفجر | أزرق داكن مع لمسات ذهبية وردية وزخرفة الماندالا الدائرية |
| `silver` | الأزرق الفضي | تدرج أزرق بارد مع فضيات وزخارف هندسية ناعمة |
| `heritage` | التراث والحداثة | لون أحمر قرمزي تراثي مدمج مع نقوش تذهيب شرقية |
| `glass` | الزجاج المضيء | زجاج شبه شفاف (Glassmorphism) عالي الأناقة |
| `saudi` | الأخضر السعودي | مستوحى من ألوان الهوية السعودية الرسمية وتناسقها |
| `kufic` | الكوفي الهندسي | زوايا حادة وتناسق مربع يليق بالخط الكوفي المربع والحديث |
| `gold` | الذهبي الفاخر | تباين أسود وفحم مع لمعان الذهب الفاخر |
| `midnight` | الياقوت المنتصف | أزرق ياقوتي ليلي مريح للعين أثناء البث الطويل |
| `marble` | الرخام والذهب الوردي | تصميم رخامي أبيض فاخر بإطار ذهبي وردي عصري |
| `ramadan-green` | رمضان الأخضر والذهبي | زخارف هلال ونجمة رمضانية باللونين الأخضر الداكن والذهبي |
| `ramadan-plum` | رمضان الأرجواني والذهبي | تصميم أرجواني فاخر مخصص للمناسبات والتهاني الرمضانية |
| `dynamic` | الجرافيك العصري | شكل هندسي مائل بحدود متدرجة تناسب البث المبتكر والتقني |
| `minimalist` | البسيط (Minimalist) | زجاجي ضيق خالٍ من الأيقونات، يتسع تلقائياً في حالة العناوين الطويلة |

---

## 📁 هيكل المشروع

```text
Animated-Lower-Thirds/
├── index.html               # لوحة التحكم الرئيسية لإدارة النصوص وقائمة التشغيل
├── obs.html                 # البوابة البرمجية الموحدة لإضافتها كـ Browser Source في OBS
├── templates/
│   ├── render.html          # محرك العرض الموحد والبوليمورفي لكافة القوالب
│   └── style*.html          # ملفات تحويل وتوجيه تلقائي للمحافظة على توافقية المشاهد القديمة
├── js/
│   ├── controller.js        # محرك التحكم والتموضع المئوي وعمليات تفادي فيضان النصوص
│   ├── control-panel.js     # واجهة إدارة المدخلات، والسحب، والجدولة، والـ Presets
│   ├── themes.js            # سجل القوالب والمخزن الموحد للأكواد التنسيقية والزخارف (THEME_REGISTRY)
│   └── i18n.js              # نظام الترجمة والتوطين الفوري لوجهة التحكم (عربي / إنجليزي)
├── css/
│   ├── base.css             # التنسيقات الهيكلية العامة ونظام التموضع الذكي
│   ├── animations.css       # حركات الدخول والخروج المتعددة (انزلاق، تلاشي، مطاطي، آلة كاتبة...)
│   ├── control-panel.css    # واجهة وتنسيق لوحة التحكم اللمسية المتجاوبة
│   ├── fonts.css            # سجل الخطوط المحلية المدمجة بالكامل
│   └── fonts/               # 53 ملف خط أصلي عالي الأداء للمتصفح دون الحاجة للإنترنت
└── tests/                   # ملفات اختبارات الوحدة والجودة وضمان التكامل الثنائي
```

---

## 🧪 بيئة التطوير والاختبارات (للمطورين)

تم بناء بيئة التطوير باختبارات تكامل تلقائية لضمان استقرار الإضافة وأمانها:

1. **تشغيل خادم التطوير**:
   ```bash
   npm install
   npm start
   ```
2. **تشغيل اختبارات الوحدة (Unit Tests)**:
   ```bash
   npm test
   ```
3. **تشغيل اختبارات التكامل الثنائية (E2E Tests عبر Playwright)**:
   ```bash
   npm run test:e2e
   ```

---

<div id="english"></div>

## ☽✦ Animated Lower Thirds — The Arabic-Optimized OBS Plugin (English Version)

A professional Lower Thirds overlay for live streaming, designed with Arabic and Islamic visual identities. It features 16 custom styles, a real-time multi-lingual control panel, and a fully responsive, intelligent layout engine.

---

## ✨ New & Upgraded Features (Architectural Overhaul)

1. **Polymorphic Template Engine 📁**
   * Consolidated all 16 separate HTML templates into a single unified render view: `templates/render.html`. It loads the layout, styling, and ornaments dynamically via a query parameter (`?style=emerald`).
   * **Hot-Swapping without Reloading**: Change visual styles instantly on-air via `BroadcastChannel` messaging without reloading the iframe, maintaining **less than 1% CPU/GPU overhead** to prevent dropped frames in 1080p60 streams.

2. **Responsive Percentage-Based Layouts 📐**
   * Position coordinates (X/Y Offsets) have migrated from fixed pixels to **responsive viewport percentages** (`left: X%`, `bottom: Y%`).
   * This guarantees the overlay remains perfectly positioned regardless of your OBS Browser Source resolution (1080p, 720p, 4K, etc.).
   * **Backward Compatibility**: Legacy URLs containing pixel offsets (> 20px) are automatically converted to responsive percentages in real-time.

3. **Independent Layout Direction ↔️**
   * An independent toggle in the settings allows you to set the layout and animation direction (RTL or LTR) regardless of the control panel UI language.
   * You can operate the dashboard in English while keeping the Arabic RTL text animations and layout orientation.

4. **Auto-Loop Sequencer 🔄**
   * Queue your presets and let them loop automatically with customizable display duration and transition intervals.
   * **Manual Override Priority**: The auto-sequencer immediately halts if the operator manually triggers any direct actions (Show, Hide, Update, or preset click), ensuring absolute priority for live manual control.

5. **100% Offline Mode & Local Fonts ⚡**
   * Integrated with 53 local font files (WOFF2) inside `css/fonts/`. The plugin requires zero internet connection, delivering instant rendering and maximum security for offline broadcasts.

6. **Backward Compatibility Stubs**
   * Legacy paths (e.g., `style1-emerald.html`) act as smart redirect stubs, automatically carrying over settings to the new unified engine to keep existing scenes intact.

---

## 🚀 Quick Start (Get Running in < 1 Min!)

### 1. Download & Launch

* **Manual Download**: Click the green button (**Code > Download ZIP**), extract the file, and open `index.html` in your browser.
* **Via Terminal**:
  * **Windows**:
    ```cmd
    git clone https://github.com/alhamodi/animated-lower-thirds.git
    cd animated-lower-thirds
    start index.html
    ```
  * **macOS**:
    ```bash
    git clone https://github.com/alhamodi/animated-lower-thirds.git
    cd animated-lower-thirds
    open index.html
    ```
  * **Linux**:
    ```bash
    git clone https://github.com/alhamodi/animated-lower-thirds.git
    cd animated-lower-thirds
    xdg-open index.html
    ```

### 2. Connect to OBS Studio
1. In OBS, add a new **Browser Source**.
2. Check the **Local File** option.
3. Click **Browse** and select `obs.html` from the project directory.
4. Set the Width to **1920** and Height to **1080**.
5. Click **OK**.

> **💡 Note for macOS & Linux Users**: If the layout data does not update instantly due to OBS browser permissions, start the built-in local server by running `npm start` in the terminal, and set the OBS Browser Source URL to:
> `http://localhost:8080/obs.html` (instead of using the Local File checkbox).

---

## 🎨 The 16 Visual Styles

| Style Key | English Display Name | Arabic Display Name | Visual / Decorative Theme |
|---|---|---|---|
| `emerald` | Gold & Emerald | الذهب والزمرد | Green gradient background with 8-point Islamic star ornaments and luxury gold framing |
| `royal` | Royal Night | الليل الملكي | Dark navy gradient with teal highlights, floating particle effects, and gold accents |
| `modern` | Modern Elegance | الأنيق الحديث | Sleek minimalist dark gray/black styling with modern diagonal gold framing |
| `fajr` | Fajr | الفجر | Rich deep blue with rose-gold highlights and decorative mandala shapes |
| `silver` | Silver Blue | الأزرق الفضي | Cool light-blue gradient with silver geometric borders |
| `heritage` | Heritage | التراث والحداثة | Classic crimson red combined with traditional oriental gold ornaments |
| `glass` | Illuminated Glass | الزجاج المضيء | Highly elegant semi-transparent glassmorphism with subtle highlights |
| `saudi` | Saudi Green | الأخضر السعودي | Inspired by the official Saudi identity colors and proportions |
| `kufic` | Geometric Kufic | الكوفي الهندسي | Sharp angles and square-proportioned layout designed for Kufic calligraphy |
| `gold` | Luxury Gold | الذهبي الفاخر | High-contrast charcoal and gold styling for premium broadcasts |
| `midnight` | Midnight Sapphire | الياقوت المنتصف | Rich midnight blue, designed to prevent eye strain during long broadcasts |
| `marble` | Marble & Rose Gold | الرخام والذهب الوردي | Premium white marble textures framed with contemporary rose-gold lines |
| `ramadan-green` | Ramadan Green & Gold | رمضان الأخضر والذهبي | Islamic crescent and star ornaments with green and gold gradients |
| `ramadan-plum` | Ramadan Plum & Gold | رمضان الأرجواني والذهبي | Royal plum purple and gold ornaments designed for Eid & Ramadan greetings |
| `dynamic` | Dynamic Graphic | الجرافيك العصري | Slanted geometric layouts with glowing borders for gaming or tech broadcasts |
| `minimalist` | Minimalist | بسيط (Minimalist) | Glassmorphism layout that auto-expands to prevent text overflow |

---

## 📁 Project Directory Structure

```text
Animated-Lower-Thirds/
├── index.html               # Main Control Panel for managing texts, presets, and queue
├── obs.html                 # Unified OBS overlay gate (added as a Browser Source)
├── templates/
│   ├── render.html          # Polymorphic single rendering template for all styles
│   └── style*.html          # Automated backward-compatibility stubs redirecting to render.html
├── js/
│   ├── controller.js        # OBS controller handling offsets, auto-fit, and text overflow checks
│   ├── control-panel.js     # Dashboard state manager for settings, drag-and-drop, and presets
│   ├── themes.js            # Unified registry for code-defined styles and layouts (THEME_REGISTRY)
│   └── i18n.js              # Localization translation database (English / Arabic)
├── css/
│   ├── base.css             # Base structure layout and responsive positioning
│   ├── animations.css       # Transition styles (slide, fade, bounce, typewriter, cinematic...)
│   ├── control-panel.css    # Responsive styles for the dashboard interface
│   ├── fonts.css            # Local font registration stylesheet
│   └── fonts/               # 53 high-quality offline font files (WOFF2)
└── tests/                   # Automated Vitest and Playwright test suite
```

---

## 🧪 Development & Testing

Automated verification suite to maintain code quality:

1. **Start Local Development Server**:
   ```bash
   npm install
   npm start
   ```
2. **Run Unit Tests (Vitest)**:
   ```bash
   npm test
   ```
3. **Run End-to-End Tests (Playwright)**:
   ```bash
   npm run test:e2e
   ```

---

## 📄 License (الترخيص)

This project is open-source and licensed under the [MIT License](LICENSE).
المشروع مفتوح المصدر ومتاح بالكامل تحت رخصة [MIT License](LICENSE). يسعدنا استقبال مساهماتكم وتعديلاتكم لتطوير المحتوى العربي الرقمي!
