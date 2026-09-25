/* INNO TEXNO — product catalogue. Prices: UZS, from the client's price list ("katalog" column only).
   poles[].rows — I-type: [height m, price]; Г-type: [cantilever section, cantilever length m, price]. */
const CATALOG = {
 "lights": [
  {
   "id": "light-timer",
   "img": "assets/img/products/p-light-timer.webp",
   "product": "transport",
   "name": {
    "uz": "Transport svetofori, raqamli taymerli",
    "ru": "Транспортный светофор с цифровым таймером",
    "en": "Vehicle traffic light with countdown timer"
   },
   "spec": {
    "uz": "3 seksiya · LED · taymer",
    "ru": "3 секции · LED · таймер",
    "en": "3 sections · LED · timer"
   },
   "price": 6496000
  },
  {
   "id": "light",
   "img": "assets/img/products/p-light.webp",
   "product": "transport",
   "name": {
    "uz": "Transport svetofori, taymersiz",
    "ru": "Транспортный светофор без таймера",
    "en": "Vehicle traffic light, no timer"
   },
   "spec": {
    "uz": "3 seksiya · LED",
    "ru": "3 секции · LED",
    "en": "3 sections · LED"
   },
   "price": 5936000
  },
  {
   "id": "light-ped",
   "img": "assets/img/products/p-ped.webp",
   "product": "piyoda",
   "name": {
    "uz": "Piyodalar svetofori",
    "ru": "Пешеходный светофор",
    "en": "Pedestrian traffic light"
   },
   "spec": {
    "uz": "Piyodalar o'tish joylari uchun",
    "ru": "Для пешеходных переходов",
    "en": "For pedestrian crossings"
   },
   "price": 3920000
  }
 ],
 "poles": [
  {
   "id": "i-d100",
   "shape": "i",
   "section": "d-100",
   "profile": "round",
   "rows": [
    [
     4.0,
     296479
    ],
    [
     4.5,
     330000
    ],
    [
     5.0,
     363000
    ],
    [
     5.5,
     396000
    ],
    [
     6.0,
     430000
    ],
    [
     6.5,
     463000
    ],
    [
     7.0,
     496000
    ],
    [
     7.5,
     530000
    ]
   ]
  },
  {
   "id": "i-sq100",
   "shape": "i",
   "section": "100×100",
   "profile": "square",
   "rows": [
    [
     4.5,
     280000
    ],
    [
     5.0,
     307000
    ],
    [
     5.5,
     335000
    ],
    [
     6.0,
     363000
    ],
    [
     6.5,
     390000
    ],
    [
     7.0,
     418000
    ],
    [
     7.5,
     446000
    ]
   ]
  },
  {
   "id": "i-sq150",
   "shape": "i",
   "section": "150×150",
   "profile": "square",
   "rows": [
    [
     4.5,
     586103
    ],
    [
     5.0,
     647000
    ],
    [
     5.5,
     709000
    ],
    [
     6.0,
     771000
    ],
    [
     6.5,
     833260
    ],
    [
     7.0,
     895000
    ],
    [
     7.5,
     956000
    ]
   ]
  },
  {
   "id": "g-d159",
   "shape": "g",
   "section": "d-159",
   "profile": "round",
   "height": 7.5,
   "rows": [
    [
     "d-55",
     6.87,
     1246931
    ],
    [
     "d-100",
     2.0,
     1194489
    ],
    [
     "d-100",
     3.0,
     1261109
    ],
    [
     "d-100",
     4.5,
     1361039
    ],
    [
     "100×100",
     3.0,
     1227788
    ],
    [
     "100×100",
     4.5,
     1311057
    ],
    [
     "100×100",
     5.5,
     1366570
    ],
    [
     "125×125",
     3.0,
     1368250
    ],
    [
     "125×125",
     4.5,
     1521250
    ],
    [
     "125×125",
     5.5,
     1624250
    ],
    [
     "150×150",
     3.0,
     1432250
    ],
    [
     "150×150",
     4.5,
     1618250
    ],
    [
     "150×150",
     5.5,
     1741250
    ]
   ]
  },
  {
   "id": "g-oct",
   "shape": "g",
   "section": "oct",
   "profile": "oct",
   "height": 5.95,
   "rows": [
    [
     "100×100",
     3.0,
     8192000
    ],
    [
     "100×100",
     4.5,
     8275000
    ],
    [
     "100×100",
     5.5,
     8331000
    ],
    [
     "125×125",
     3.0,
     8332000
    ],
    [
     "125×125",
     4.5,
     8486000
    ],
    [
     "125×125",
     5.5,
     8588000
    ],
    [
     "150×150",
     3.0,
     8396000
    ],
    [
     "150×150",
     4.5,
     8582000
    ],
    [
     "150×150",
     5.5,
     8705000
    ]
   ]
  },
  {
   "id": "g-d219",
   "shape": "g",
   "section": "d-219",
   "profile": "round",
   "height": 7.5,
   "rows": [
    [
     "100×100",
     3.0,
     1969000
    ],
    [
     "100×100",
     4.5,
     2052000
    ],
    [
     "100×100",
     5.5,
     2108000
    ],
    [
     "125×125",
     3.0,
     2109000
    ],
    [
     "125×125",
     4.5,
     2263000
    ],
    [
     "125×125",
     5.5,
     2365000
    ],
    [
     "150×150",
     3.0,
     2173000
    ],
    [
     "150×150",
     4.5,
     2359000
    ],
    [
     "150×150",
     5.5,
     2481000
    ]
   ]
  }
 ],
 "equip": [
  {
   "id": "ctrl",
   "icon": "lucide:circuit-board",
   "name": {
    "uz": "Boshqaruv bloki",
    "ru": "Блок управления",
    "en": "Control unit"
   },
   "price": 12880000
  },
  {
   "id": "tx",
   "icon": "lucide:radio-tower",
   "name": {
    "uz": "To'lqin tarqatuvchi blok",
    "ru": "Радиопередающий блок",
    "en": "Wireless transmitter unit"
   },
   "price": 11200000
  },
  {
   "id": "rx",
   "icon": "lucide:radio-receiver",
   "name": {
    "uz": "To'lqin qabul qiluvchi blok",
    "ru": "Радиоприёмный блок",
    "en": "Wireless receiver unit"
   },
   "price": 7840000
  },
  {
   "id": "solar-100",
   "icon": "lucide:sun",
   "name": {
    "uz": "Quyosh paneli 100 Vt",
    "ru": "Солнечная панель 100 Вт",
    "en": "Solar panel 100 W"
   },
   "price": 950000
  },
  {
   "id": "solar-60",
   "icon": "lucide:sun",
   "name": {
    "uz": "Quyosh paneli 60 Vt",
    "ru": "Солнечная панель 60 Вт",
    "en": "Solar panel 60 W"
   },
   "price": 630000
  },
  {
   "id": "akb-100",
   "icon": "lucide:battery-full",
   "name": {
    "uz": "Akkumulyator 100 A·s",
    "ru": "Аккумулятор 100 А·ч",
    "en": "Battery 100 Ah"
   },
   "price": 1532000
  },
  {
   "id": "akb-58",
   "icon": "lucide:battery-medium",
   "name": {
    "uz": "Akkumulyator 58 A·s",
    "ru": "Аккумулятор 58 А·ч",
    "en": "Battery 58 Ah"
   },
   "price": 1064000
  },
  {
   "id": "solar-ctrl",
   "icon": "lucide:cpu",
   "name": {
    "uz": "Quyosh paneli kontrolleri",
    "ru": "Контроллер солнечной панели",
    "en": "Solar charge controller"
   },
   "price": 840000
  }
 ],
 "systems": {
  "ai-crossing": 50000000
 }
};
