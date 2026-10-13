/* INNO TEXNO — product catalogue from the client's price list. Prices are NOT published (client: «цена договорная»).
   poles[].rows — I-type: [height m]; Г-type: [cantilever section, cantilever length m]. */
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
   }
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
   }
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
   }
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
     4.0
    ],
    [
     4.5
    ],
    [
     5.0
    ],
    [
     5.5
    ],
    [
     6.0
    ],
    [
     6.5
    ],
    [
     7.0
    ],
    [
     7.5
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
     4.5
    ],
    [
     5.0
    ],
    [
     5.5
    ],
    [
     6.0
    ],
    [
     6.5
    ],
    [
     7.0
    ],
    [
     7.5
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
     4.5
    ],
    [
     5.0
    ],
    [
     5.5
    ],
    [
     6.0
    ],
    [
     6.5
    ],
    [
     7.0
    ],
    [
     7.5
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
     6.87
    ],
    [
     "d-100",
     2.0
    ],
    [
     "d-100",
     3.0
    ],
    [
     "d-100",
     4.5
    ],
    [
     "100×100",
     3.0
    ],
    [
     "100×100",
     4.5
    ],
    [
     "100×100",
     5.5
    ],
    [
     "125×125",
     3.0
    ],
    [
     "125×125",
     4.5
    ],
    [
     "125×125",
     5.5
    ],
    [
     "150×150",
     3.0
    ],
    [
     "150×150",
     4.5
    ],
    [
     "150×150",
     5.5
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
     3.0
    ],
    [
     "100×100",
     4.5
    ],
    [
     "100×100",
     5.5
    ],
    [
     "125×125",
     3.0
    ],
    [
     "125×125",
     4.5
    ],
    [
     "125×125",
     5.5
    ],
    [
     "150×150",
     3.0
    ],
    [
     "150×150",
     4.5
    ],
    [
     "150×150",
     5.5
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
     3.0
    ],
    [
     "100×100",
     4.5
    ],
    [
     "100×100",
     5.5
    ],
    [
     "125×125",
     3.0
    ],
    [
     "125×125",
     4.5
    ],
    [
     "125×125",
     5.5
    ],
    [
     "150×150",
     3.0
    ],
    [
     "150×150",
     4.5
    ],
    [
     "150×150",
     5.5
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
   }
  },
  {
   "id": "tx",
   "icon": "lucide:radio-tower",
   "name": {
    "uz": "To'lqin tarqatuvchi blok",
    "ru": "Радиопередающий блок",
    "en": "Wireless transmitter unit"
   }
  },
  {
   "id": "rx",
   "icon": "lucide:radio-receiver",
   "name": {
    "uz": "To'lqin qabul qiluvchi blok",
    "ru": "Радиоприёмный блок",
    "en": "Wireless receiver unit"
   }
  },
  {
   "id": "solar-100",
   "icon": "lucide:sun",
   "name": {
    "uz": "Quyosh paneli 100 Vt",
    "ru": "Солнечная панель 100 Вт",
    "en": "Solar panel 100 W"
   }
  },
  {
   "id": "solar-60",
   "icon": "lucide:sun",
   "name": {
    "uz": "Quyosh paneli 60 Vt",
    "ru": "Солнечная панель 60 Вт",
    "en": "Solar panel 60 W"
   }
  },
  {
   "id": "akb-100",
   "icon": "lucide:battery-full",
   "name": {
    "uz": "Akkumulyator 100 A·s",
    "ru": "Аккумулятор 100 А·ч",
    "en": "Battery 100 Ah"
   }
  },
  {
   "id": "akb-58",
   "icon": "lucide:battery-medium",
   "name": {
    "uz": "Akkumulyator 58 A·s",
    "ru": "Аккумулятор 58 А·ч",
    "en": "Battery 58 Ah"
   }
  },
  {
   "id": "solar-ctrl",
   "icon": "lucide:cpu",
   "name": {
    "uz": "Quyosh paneli kontrolleri",
    "ru": "Контроллер солнечной панели",
    "en": "Solar charge controller"
   }
  }
 ]
};
