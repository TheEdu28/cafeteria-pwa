export const products = [
  // Desayunos
  {
    id: 1,
    name: "Desayuno Completo",
    description: "Huevos, tocino, pan tostado y frutas frescas",
    price: 120,
    category: "Desayunos",
    available: true,
    options: [
      { id: "huevos_revueltos", label: "Huevos revueltos" },
      { id: "pan_tostado", label: "Pan tostado" },
      { id: "sin_tocino", label: "Sin tocino" }
    ]
  },
  {
    id: 2,
    name: "Omelette de Queso",
    description: "Omelette relleno de queso oaxaca y epazote",
    price: 95,
    category: "Desayunos",
    available: true,
    options: [
      { id: "extra_queso", label: "Extra queso" },
      { id: "sin_epazote", label: "Sin epazote" },
      { id: "verduras_extra", label: "Verduras extra" }
    ]
  },
  {
    id: 3,
    name: "Pancakes de Avena",
    description: "Pancakes caseros acompañados con mermelada",
    price: 85,
    category: "Desayunos",
    available: true,
    options: [
      { id: "mas_mermelada", label: "Más mermelada" },
      { id: "miel_extra", label: "Miel extra" },
      { id: "sin_azucar", label: "Sin azúcar" }
    ]
  },
  {
    id: 4,
    name: "Huevos Rancheros",
    description: "Huevos con salsa roja, frijoles y tortillas",
    price: 90,
    category: "Desayunos",
    available: true,
    options: [
      { id: "salsa_verde", label: "Salsa verde en lugar de roja" },
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "tortillas_extra", label: "Tortillas extra" }
    ]
  },

  // Comida Rápida
  {
    id: 5,
    name: "Hamburguesa Premium",
    description: "Carne de res molida, queso, lechuga, tomate y salsa especial",
    price: 140,
    category: "Comida Rápida",
    available: true,
    options: [
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "sin_lechuga", label: "Sin lechuga" },
      { id: "extra_queso", label: "Extra queso" },
      { id: "sin_salsa", label: "Sin salsa" },
      { id: "doble_carne", label: "Doble carne" }
    ]
  },
  {
    id: 6,
    name: "Papas Fritas",
    description: "Papas crujientes y doradas con sal marina",
    price: 50,
    category: "Comida Rápida",
    available: true,
    options: [
      { id: "sin_sal", label: "Sin sal" },
      { id: "con_queso", label: "Con queso fundido" },
      { id: "picante", label: "Con salsa picante" }
    ]
  },
  {
    id: 7,
    name: "Alitas de Pollo",
    description: "Alitas crujientes con salsa BBQ",
    price: 110,
    category: "Comida Rápida",
    available: true,
    options: [
      { id: "sin_bbq", label: "Sin salsa BBQ" },
      { id: "salsa_picante", label: "Salsa picante" },
      { id: "salsa_ranch", label: "Salsa ranch" }
    ]
  },
  {
    id: 8,
    name: "Nuggets de Pollo",
    description: "Nuggets caseros, dorados y crujientes",
    price: 80,
    category: "Comida Rápida",
    available: true,
    options: [
      { id: "salsa_barbecue", label: "Salsa barbecue" },
      { id: "salsa_mostaza", label: "Salsa mostaza" },
      { id: "sin_salsa", label: "Sin salsa" }
    ]
  },

  // Antojitos Mexicanos
  {
    id: 9,
    name: "Tacos al Pastor",
    description: "Tres tacos con carne marinada, piña y cebolla",
    price: 85,
    category: "Antojitos Mexicanos",
    available: true,
    options: [
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "sin_pina", label: "Sin piña" },
      { id: "carne_doble", label: "Carne doble" },
      { id: "salsa_extra", label: "Salsa extra" }
    ]
  },
  {
    id: 10,
    name: "Enchiladas Verdes",
    description: "Enchiladas rellenas de queso y pollo, bañadas en salsa verde",
    price: 125,
    category: "Antojitos Mexicanos",
    available: true,
    options: [
      { id: "sin_crema", label: "Sin crema" },
      { id: "extra_queso", label: "Extra queso" },
      { id: "salsa_roja", label: "Salsa roja en lugar de verde" },
      { id: "carne_extra", label: "Carne extra" }
    ]
  },
  {
    id: 11,
    name: "Quesadillas de Rajas",
    description: "Quesadillas rellenas de rajas con queso oaxaca",
    price: 95,
    category: "Antojitos Mexicanos",
    available: true,
    options: [
      { id: "extra_queso", label: "Extra queso" },
      { id: "sin_rajas", label: "Solo queso" },
      { id: "pollo_extra", label: "Con pollo extra" }
    ]
  },
  {
    id: 12,
    name: "Chilaquiles Verdes",
    description: "Tortillas fritas con salsa verde, pollo y queso",
    price: 105,
    category: "Antojitos Mexicanos",
    available: true,
    options: [
      { id: "crema_extra", label: "Crema extra" },
      { id: "queso_extra", label: "Queso extra" },
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "huevo_extra", label: "Con huevo" }
    ]
  },

  // Platillos del Día
  {
    id: 13,
    name: "Caldo de Pollo",
    description: "Caldo casero con verduras y pollo",
    price: 70,
    category: "Platillos del Día",
    available: true,
    options: [
      { id: "sin_verduras", label: "Sin verduras" },
      { id: "carne_extra", label: "Carne extra" },
      { id: "limón_extra", label: "Con limón extra" }
    ]
  },
  {
    id: 14,
    name: "Arroz con Pollo",
    description: "Arroz blanco con pollo desmenuzado y verduras",
    price: 110,
    category: "Platillos del Día",
    available: true,
    options: [
      { id: "sin_verduras", label: "Sin verduras" },
      { id: "arroz_integral", label: "Arroz integral" },
      { id: "carne_doble", label: "Carne doble" }
    ]
  },
  {
    id: 15,
    name: "Pechuga a la Plancha",
    description: "Pechuga de pollo a la plancha con guarnición",
    price: 135,
    category: "Platillos del Día",
    available: true,
    options: [
      { id: "sin_sal", label: "Sin sal" },
      { id: "verduras_extra", label: "Verduras extra" },
      { id: "salsa_aparte", label: "Salsa aparte" }
    ]
  },
  {
    id: 16,
    name: "Camarones a la Garlic",
    description: "Camarones frescos con salsa de ajo",
    price: 160,
    category: "Platillos del Día",
    available: false,
    options: [
      { id: "menos_ajo", label: "Menos ajo" },
      { id: "sin_mantequilla", label: "Sin mantequilla" },
      { id: "salsa_extra", label: "Salsa extra" }
    ]
  },

  // Sandwiches
  {
    id: 17,
    name: "Sandwich de Jamón y Queso",
    description: "Pan integral con jamón serrano, queso y tomate",
    price: 75,
    category: "Sandwiches",
    available: true,
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "extra_queso", label: "Extra queso" },
      { id: "con_aguacate", label: "Con aguacate" }
    ]
  },
  {
    id: 18,
    name: "Sandwich de Pollo",
    description: "Pechuga de pollo desmenuzada, aguacate y mayonesa",
    price: 85,
    category: "Sandwiches",
    available: true,
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "sin_aguacate", label: "Sin aguacate" },
      { id: "carne_extra", label: "Carne extra" }
    ]
  },
  {
    id: 19,
    name: "Sandwich Club",
    description: "Triple deck con jamón, pollo, queso, lechuga y tomate",
    price: 115,
    category: "Sandwiches",
    available: true,
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "sin_bacon", label: "Sin bacon" },
      { id: "carne_extra", label: "Carne extra" }
    ]
  },
  {
    id: 20,
    name: "Sandwich Vegano",
    description: "Vegetales frescos, hummus y aguacate",
    price: 80,
    category: "Sandwiches",
    available: true,
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "sin_hummus", label: "Sin hummus" },
      { id: "verduras_extra", label: "Verduras extra" }
    ]
  },

  // Tortas
  {
    id: 21,
    name: "Torta de Milanesa",
    description: "Pan blanco con milanesa de pollo, aguacate y cebolla",
    price: 95,
    category: "Tortas",
    available: true,
    options: [
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "doble_milanesa", label: "Doble milanesa" },
      { id: "con_queso", label: "Con queso" }
    ]
  },
  {
    id: 22,
    name: "Torta Cubana",
    description: "Pan bolillo con carne, queso, jamón y huevo",
    price: 110,
    category: "Tortas",
    available: true,
    options: [
      { id: "sin_huevo", label: "Sin huevo" },
      { id: "extra_queso", label: "Extra queso" },
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "carne_doble", label: "Carne doble" }
    ]
  },
  {
    id: 23,
    name: "Torta de Pollo",
    description: "Pollo desmenuzado, frijoles, queso y jalapeños",
    price: 100,
    category: "Tortas",
    available: true,
    options: [
      { id: "sin_jalapenos", label: "Sin jalapeños" },
      { id: "extra_queso", label: "Extra queso" },
      { id: "carne_extra", label: "Carne extra" },
      { id: "picante", label: "Más picante" }
    ]
  },
  {
    id: 24,
    name: "Torta Yucateca",
    description: "Carne de cerdo, salsa habanero y cebolla",
    price: 105,
    category: "Tortas",
    available: true,
    options: [
      { id: "menos_picante", label: "Menos picante" },
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "carne_extra", label: "Carne extra" }
    ]
  },

  // Opciones Ligeras
  {
    id: 25,
    name: "Ensalada César",
    description: "Lechuga romana, crutones, queso parmesano y aderezo",
    price: 85,
    category: "Opciones Ligeras",
    available: true,
    options: [
      { id: "sin_crutones", label: "Sin crutones" },
      { id: "aderezo_aparte", label: "Aderezo aparte" },
      { id: "queso_extra", label: "Queso extra" },
      { id: "pollo_extra", label: "Con pollo extra" }
    ]
  },
  {
    id: 26,
    name: "Ensalada de Frutas",
    description: "Mezcla de frutas frescas de temporada",
    price: 65,
    category: "Opciones Ligeras",
    available: true,
    options: [
      { id: "sin_limon", label: "Sin limón" },
      { id: "miel_extra", label: "Miel extra" },
      { id: "menta", label: "Con menta" }
    ]
  },
  {
    id: 27,
    name: "Wrap de Verduras",
    description: "Tortilla integral rellena de vegetales y hummus",
    price: 75,
    category: "Opciones Ligeras",
    available: true,
    options: [
      { id: "sin_hummus", label: "Sin hummus" },
      { id: "verduras_extra", label: "Verduras extra" },
      { id: "sin_queso", label: "Sin queso" }
    ]
  },
  {
    id: 28,
    name: "Ceviche",
    description: "Pescado marinado en limón con cebolla y cilantro",
    price: 125,
    category: "Opciones Ligeras",
    available: true,
    options: [
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "sin_cilantro", label: "Sin cilantro" },
      { id: "picante_extra", label: "Picante extra" },
      { id: "camaron_extra", label: "Camarón extra" }
    ]
  },

  // Bebidas
  {
    id: 29,
    name: "Café Americano",
    description: "Café molido fresco en agua caliente",
    price: 35,
    category: "Bebidas",
    available: true,
    options: [
      { id: "con_leche", label: "Con leche" },
      { id: "sin_azucar", label: "Sin azúcar" },
      { id: "mas_azucar", label: "Más azúcar" },
      { id: "con_hielo", label: "Con hielo" }
    ]
  },
  {
    id: 30,
    name: "Cappuccino",
    description: "Espresso con leche vaporizada y espuma",
    price: 55,
    category: "Bebidas",
    available: true,
    options: [
      { id: "sin_azucar", label: "Sin azúcar" },
      { id: "mas_espuma", label: "Más espuma" },
      { id: "sin_espuma", label: "Sin espuma" },
      { id: "con_hielo", label: "Con hielo" }
    ]
  },
  {
    id: 31,
    name: "Jugo Natural",
    description: "Jugo fresco de naranja o zanahoria",
    price: 45,
    category: "Bebidas",
    available: true,
    options: [
      { id: "con_hielo", label: "Con hielo" },
      { id: "sin_pulpa", label: "Sin pulpa" },
      { id: "naranja", label: "Naranja" },
      { id: "zanahoria", label: "Zanahoria" }
    ]
  },
  {
    id: 32,
    name: "Smoothie de Fresa",
    description: "Fresa, yogur natural y miel",
    price: 65,
    category: "Bebidas",
    available: true,
    options: [
      { id: "sin_miel", label: "Sin miel" },
      { id: "mas_hielo", label: "Más hielo" },
      { id: "leche_extra", label: "Leche extra" },
      { id: "proteina", label: "Con proteína" }
    ]
  },
  {
    id: 33,
    name: "Refresco",
    description: "Refresco frio a elegir",
    price: 40,
    category: "Bebidas",
    available: true,
    options: [
      { id: "sin_hielo", label: "Sin hielo" },
      { id: "mas_hielo", label: "Más hielo" },
      { id: "con_limon", label: "Con limón" }
    ]
  }
]