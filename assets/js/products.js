/* INNO TEXNO — product pages: one page per product model; variants (heights, cantilevers, W, Ah) share a page.
   refs point into CATALOG as "<list>:<id>" (prices come from there only).
   Text fields: {uz,ru,en}, "@i18n_key", or a literal string. Pole names/descriptions/specs are generated.
   gallery (optional, ≥2 items → photo gallery on the page): [{ src, cap, photo? }] — photo: rectangular shot, else a cut-out. */
const PRODUCTS = [
  {
    slug: 'aqlli-piyodalar-otish-joyi', cat: 'smart', form: 'aqlli-otish', refs: ['systems:ai-crossing'],
    gallery: [
      { src: 'assets/img/products/p-crossing-night.webp', cap: '@ai_photo', photo: true },
      { src: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-2.webp', cap: '@g_ai_day1', photo: true },
      { src: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-3.webp', cap: '@g_ai_day2', photo: true },
      { src: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-4.webp', cap: '@g_ai_red', photo: true },
      { src: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-5.webp', cap: '@g_ai_green', photo: true },
      { src: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-6.webp', cap: '@g_ai_close1', photo: true },
      { src: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-7.webp', cap: '@g_ai_close2', photo: true },
      { src: 'assets/img/products/p-crossing-columns.webp', cap: '@g_ai_cols' },
      { src: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-9.webp', cap: '@g_ai_mod' }
    ],
    media: { kind: 'ai' }, thumb: 'assets/img/products/p-crossing-night.webp', photo: true,
    name: '@ai_name', desc: '@ai_goal', extra: 'ai',
    specs: [['@sp1', '@sv1'], ['@sp2', '@sv2'], ['@sp3', '@sv3'], ['@sp4', '@sv4'], ['@sp5', '@sv5'], ['@sp6', '@sv6'], ['@sp7', '@sv7']],
    related: ['aqlli-yol-belgisi', 'piyodalar-svetofori', 'quyosh-paneli']
  },
  {
    slug: 'aqlli-yol-belgisi', cat: 'smart', form: 'aqlli-belgi', refs: [],
    gallery: [
      { src: 'assets/img/products/p-smart-sign.webp', cap: '@g_view_main' },
      { src: 'assets/img/gallery/aqlli-yol-belgisi-2.webp', cap: '@g_ss_front' },
      { src: 'assets/img/gallery/aqlli-yol-belgisi-3.webp', cap: '@g_ss_top' },
      { src: 'assets/img/gallery/aqlli-yol-belgisi-4.webp', cap: '@g_ss_mount' }
    ],
    media: { kind: 'img', src: 'assets/img/products/p-smart-sign.webp' },
    name: '@ss_name', desc: '@ss_desc', extra: 'sign',
    specs: [['@sk_energy', '@ss_f1'], ['@sk_display', '@ss_f3'], ['@sk_patent', '№ SAP 2888'], ['@sk_reg', '03.07.2026']],
    related: ['aqlli-piyodalar-otish-joyi', 'quyosh-paneli', 'akkumulyator']
  },
  {
    slug: 'svetofor-taymerli', cat: 'lights', form: 'transport', refs: ['lights:light-timer'],
    gallery: [
      { src: 'assets/img/products/p-light-timer.webp', cap: '@g_view_main' },
      { src: 'assets/img/gallery/svetofor-taymerli-2.webp', cap: '@g_timer' },
      { src: 'assets/img/gallery/svetofor-taymerli-3.webp', cap: '@g_side' }
    ],
    media: { kind: 'img', src: 'assets/img/products/p-light-timer.webp' },
    desc: {
      uz: "Chorrahalar va magistrallar uchun uch seksiyali LED transport svetofori raqamli taymer bilan: haydovchi signal almashishiga qancha vaqt qolganini ko'radi.",
      ru: "Трёхсекционный LED-светофор для перекрёстков и магистралей с цифровым таймером: водитель видит, сколько осталось до смены сигнала.",
      en: "A three-section LED traffic light for intersections and highways with a countdown timer: drivers see how long until the signal changes."
    },
    specs: [['@sk_sections', '3'], ['@sk_light', 'LED'], ['@sk_timer', '@v_yes'], ['@sk_use', '@use_cross']],
    related: ['svetofor-taymersiz', 'ustun-g-d159', 'boshqaruv-bloki']
  },
  {
    slug: 'svetofor-taymersiz', cat: 'lights', form: 'transport', refs: ['lights:light'],
    gallery: [
      { src: 'assets/img/products/p-light.webp', cap: '@g_view_main' },
      { src: 'assets/img/gallery/svetofor-taymersiz-2.webp', cap: '@g_on' },
      { src: 'assets/img/gallery/svetofor-taymersiz-3.webp', cap: '@g_off' },
      { src: 'assets/img/gallery/svetofor-taymersiz-4.webp', cap: '@g_side' }
    ],
    media: { kind: 'img', src: 'assets/img/products/p-light.webp' },
    desc: {
      uz: "Chorrahalar va magistrallar uchun klassik uch seksiyali LED transport svetofori: qizil, sariq va yashil signallar.",
      ru: "Классический трёхсекционный LED-светофор для перекрёстков и магистралей: красный, жёлтый и зелёный сигналы.",
      en: "A classic three-section LED traffic light for intersections and highways: red, amber and green signals."
    },
    specs: [['@sk_sections', '3'], ['@sk_light', 'LED'], ['@sk_timer', '@v_no'], ['@sk_use', '@use_cross']],
    related: ['svetofor-taymerli', 'ustun-i-d100', 'quyosh-paneli']
  },
  {
    slug: 'piyodalar-svetofori', cat: 'lights', form: 'piyoda', refs: ['lights:light-ped'],
    gallery: [
      { src: 'assets/img/products/p-ped.webp', cap: '@g_view_main' },
      { src: 'assets/img/gallery/piyodalar-svetofori-2.webp', cap: '@g_ped_red' },
      { src: 'assets/img/gallery/piyodalar-svetofori-3.webp', cap: '@g_off' },
      { src: 'assets/img/gallery/piyodalar-svetofori-4.webp', cap: '@g_back' }
    ],
    media: { kind: 'img', src: 'assets/img/products/p-ped.webp' },
    desc: {
      uz: "Piyodalar o'tish joylari uchun LED svetofor: «to'xtang» va «yuring» signallari piyodalarga aniq ko'rinadi.",
      ru: "LED-светофор для пешеходных переходов: сигналы «стойте» и «идите» хорошо видны пешеходам.",
      en: "An LED traffic light for pedestrian crossings: clear “stop” and “walk” signals for pedestrians."
    },
    specs: [['@sk_light', 'LED'], ['@sk_use', '@use_ped']],
    related: ['aqlli-piyodalar-otish-joyi', 'ustun-i-d100', 'svetofor-taymerli']
  },
  { slug: 'ustun-i-d100', cat: 'poles', form: 'ustun', refs: ['poles:i-d100'], media: { kind: 'pole' }, related: ['piyodalar-svetofori', 'svetofor-taymersiz', 'ustun-i-100x100'] },
  { slug: 'ustun-i-100x100', cat: 'poles', form: 'ustun', refs: ['poles:i-sq100'], media: { kind: 'pole' }, related: ['piyodalar-svetofori', 'svetofor-taymersiz', 'ustun-i-150x150'] },
  { slug: 'ustun-i-150x150', cat: 'poles', form: 'ustun', refs: ['poles:i-sq150'], media: { kind: 'pole' }, related: ['svetofor-taymerli', 'piyodalar-svetofori', 'ustun-g-d159'] },
  { slug: 'ustun-g-d159', cat: 'poles', form: 'ustun', refs: ['poles:g-d159'], media: { kind: 'pole' }, related: ['svetofor-taymerli', 'svetofor-taymersiz', 'ustun-g-d219'] },
  { slug: 'ustun-g-8-qirrali', cat: 'poles', form: 'ustun', refs: ['poles:g-oct'], media: { kind: 'pole' }, related: ['svetofor-taymerli', 'boshqaruv-bloki', 'ustun-g-d159'] },
  { slug: 'ustun-g-d219', cat: 'poles', form: 'ustun', refs: ['poles:g-d219'], media: { kind: 'pole' }, related: ['svetofor-taymerli', 'svetofor-taymersiz', 'ustun-g-8-qirrali'] },
  {
    slug: 'boshqaruv-bloki', cat: 'equip', form: 'jihoz', refs: ['equip:ctrl'], media: { kind: 'icon' },
    desc: {
      uz: "Svetofor ob'ektlari ishini boshqaruvchi blok. Konfiguratsiya va ulanish sxemasi bo'yicha menejer maslahat beradi.",
      ru: "Блок, управляющий работой светофорного объекта. По конфигурации и схеме подключения проконсультирует менеджер.",
      en: "A unit that controls a traffic signal installation. A manager will advise on configuration and wiring."
    },
    specs: [['@sk_use', '@use_ctrl']],
    related: ['tolqin-tarqatuvchi-blok', 'tolqin-qabul-qiluvchi-blok', 'svetofor-taymerli']
  },
  {
    slug: 'tolqin-tarqatuvchi-blok', cat: 'equip', form: 'jihoz', refs: ['equip:tx'], media: { kind: 'icon' },
    desc: {
      uz: "Tizim elementlari o'rtasida simsiz aloqa uchun to'lqin tarqatuvchi (radio uzatuvchi) blok. Qabul qiluvchi blok bilan juftlikda ishlaydi.",
      ru: "Радиопередающий блок для беспроводной связи между элементами системы. Работает в паре с радиоприёмным блоком.",
      en: "A wireless transmitter unit linking system components. Works in a pair with the wireless receiver unit."
    },
    specs: [['@sk_use', '@use_wireless'], ['@sk_pair', { uz: "To'lqin qabul qiluvchi blok", ru: 'Радиоприёмный блок', en: 'Wireless receiver unit' }]],
    related: ['tolqin-qabul-qiluvchi-blok', 'boshqaruv-bloki', 'svetofor-taymerli']
  },
  {
    slug: 'tolqin-qabul-qiluvchi-blok', cat: 'equip', form: 'jihoz', refs: ['equip:rx'], media: { kind: 'icon' },
    desc: {
      uz: "Tizim elementlari o'rtasida simsiz aloqa uchun to'lqin qabul qiluvchi (radio qabul qiluvchi) blok. Tarqatuvchi blok bilan juftlikda ishlaydi.",
      ru: "Радиоприёмный блок для беспроводной связи между элементами системы. Работает в паре с радиопередающим блоком.",
      en: "A wireless receiver unit linking system components. Works in a pair with the wireless transmitter unit."
    },
    specs: [['@sk_use', '@use_wireless'], ['@sk_pair', { uz: "To'lqin tarqatuvchi blok", ru: 'Радиопередающий блок', en: 'Wireless transmitter unit' }]],
    related: ['tolqin-tarqatuvchi-blok', 'boshqaruv-bloki', 'piyodalar-svetofori']
  },
  {
    slug: 'quyosh-paneli', cat: 'equip', form: 'jihoz', refs: ['equip:solar-60', 'equip:solar-100'], media: { kind: 'icon' },
    name: { uz: 'Quyosh paneli', ru: 'Солнечная панель', en: 'Solar panel' },
    vlabels: [{ uz: '60 Vt', ru: '60 Вт', en: '60 W' }, { uz: '100 Vt', ru: '100 Вт', en: '100 W' }],
    desc: {
      uz: "Svetofor va yo'l jihozlarini elektr tarmog'isiz energiya bilan ta'minlash uchun quyosh paneli. Akkumulyator va kontroller bilan birga ishlaydi.",
      ru: "Солнечная панель для питания светофоров и дорожного оборудования без подключения к сети. Работает вместе с аккумулятором и контроллером.",
      en: "A solar panel that powers traffic lights and road equipment without a grid connection. Works together with a battery and a charge controller."
    },
    specs: [['@sk_power', { uz: '60 / 100 Vt', ru: '60 / 100 Вт', en: '60 / 100 W' }], ['@sk_use', '@use_solar']],
    related: ['akkumulyator', 'quyosh-paneli-kontrolleri', 'aqlli-yol-belgisi']
  },
  {
    slug: 'akkumulyator', cat: 'equip', form: 'jihoz', refs: ['equip:akb-58', 'equip:akb-100'], media: { kind: 'icon' },
    name: { uz: 'Akkumulyator', ru: 'Аккумулятор', en: 'Battery' },
    vlabels: [{ uz: '58 A·s', ru: '58 А·ч', en: '58 Ah' }, { uz: '100 A·s', ru: '100 А·ч', en: '100 Ah' }],
    desc: {
      uz: "Quyosh energiyasi tizimi uchun akkumulyator: kunduzi to'plangan energiyani saqlaydi va jihozlarni tunda ham ta'minlaydi.",
      ru: "Аккумулятор для солнечной системы: накапливает энергию днём и питает оборудование ночью.",
      en: "A battery for the solar system: it stores energy during the day and powers the equipment at night."
    },
    specs: [['@sk_capacity', { uz: '58 / 100 A·s', ru: '58 / 100 А·ч', en: '58 / 100 Ah' }], ['@sk_use', '@use_solar']],
    related: ['quyosh-paneli', 'quyosh-paneli-kontrolleri', 'aqlli-piyodalar-otish-joyi']
  },
  {
    slug: 'quyosh-paneli-kontrolleri', cat: 'equip', form: 'jihoz', refs: ['equip:solar-ctrl'], media: { kind: 'icon' },
    desc: {
      uz: "Quyosh paneli va akkumulyator o'rtasidagi zaryadlashni boshqaruvchi kontroller — quyosh energiyasi to'plamining zarur qismi.",
      ru: "Контроллер, управляющий зарядом аккумулятора от солнечной панели, — обязательная часть солнечного комплекта.",
      en: "A charge controller between the solar panel and the battery — an essential part of the solar kit."
    },
    specs: [['@sk_use', '@use_charge']],
    related: ['quyosh-paneli', 'akkumulyator', 'aqlli-yol-belgisi']
  }
];
