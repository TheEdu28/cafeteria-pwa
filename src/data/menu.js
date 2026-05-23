export const products = [
  // Desayunos
  {
    id: 1,
    name: "Desayuno Completo",
    description: "Huevo, frijoles, café y pan tostado",
    price: 120,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/desayunocompleto.jpg",
    options: [
      { id: "huevo_revuelto", label: "Huevo revuelto" },
      { id: "huevo_frito", label: "Huevo frito" },
      { id: "sin_cafe", label: "Sin café" }
    ]
  },
  {
    id: 2,
    name: "Orden de Huevos",
    description: "Dos huevos preparados a tu gusto",
    price: 85,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/doshuevos.jpg",
    options: [
      { id: "huevo_revuelto", label: "Revueltos" },
      { id: "huevo_frito", label: "Fritos" },
      { id: "huevo_divorciados", label: "Divorciados" }
    ]
  },
  {
    id: 3,
    name: "Orden de Hotcakes",
    description: "Tres hotcakes caseros con miel y mantequilla",
    price: 95,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/3hotcakes.jpg",
    options: [
      { id: "mas_miel", label: "Más miel" },
      { id: "sin_mantequilla", label: "Sin mantequilla" },
      { id: "con_frutas", label: "Con frutas" }
    ]
  },
  {
    id: 4,
    name: "Molletes Salados",
    description: "Pan tostado con jamon, queso y salsa",
    price: 80,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/molletes2.jpg",
    options: [
      { id: "extra_queso", label: "Extra queso" },
      { id: "jamón", label: "Con jamón" },
      { id: "sin_salsa", label: "Sin salsa" }
    ]
  },
  {
    id: 5,
    name: "Chilaquiles",
    description: "Tortillas fritas con salsa verde, queso y crema",
    price: 100,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/chilaquiles.jpg",
    options: [
      { id: "salsa_roja", label: "Salsa roja" },
      { id: "con_huevo", label: "Con huevo" },
      { id: "extra_crema", label: "Extra crema" }
    ]
  },
  {
    id: 6,
    name: "Enfrijoladas",
    description: "Tortillas con salsa fría, queso y crema",
    price: 90,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/enfrijoladas.jpg",
    options: [
      { id: "con_pollo", label: "Con pollo" },
      { id: "sin_crema", label: "Sin crema" },
      { id: "extra_queso", label: "Extra queso" }
    ]
  },
  {
    id: 7,
    name: "Crepas",
    description: "Tres crepas rellenas de tu elección",
    price: 110,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/crepas.jpg",
    options: [
      { id: "relleno_dulce", label: "Relleno dulce" },
      { id: "relleno_salado", label: "Relleno salado" },
      { id: "con_chocolate", label: "Con chocolate" }
    ]
  },
  {
    id: 8,
    name: "Sincronizada",
    description: "Pan tostado con jamón, queso y huevo",
    price: 105,
    category: "Desayunos",
    available: true,
    image: "/ImagenesMenu/sincronizada.jpg",
    options: [
      { id: "extra_jamón", label: "Extra jamón" },
      { id: "extra_queso", label: "Extra queso" },
      { id: "sin_huevo", label: "Sin huevo" }
    ]
  },

  // Comida Rápida
  {
    id: 9,
    name: "Hamburguesa con Papas",
    description: "Hamburguesa premium con papas fritas",
    price: 140,
    category: "Comida Rápida",
    available: true,
      image: "/ImagenesMenu/hamburguesa.jpg",
    options: [
      { id: "doble_carne", label: "Doble carne" },
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "extra_queso", label: "Extra queso" }
    ]
  },
  {
    id: 10,
    name: "Hamburguesa Sencilla",
    description: "Hamburguesa básica con lechuga, tomate y salsa",
    price: 95,
    category: "Comida Rápida",
    available: true,
      image: "/ImagenesMenu/hamburguesa2.jpg",
    options: [
      { id: "sin_salsa", label: "Sin salsa" },
      { id: "extra_lechuga", label: "Extra lechuga" },
      { id: "con_queso", label: "Con queso" }
    ]
  },
  {
    id: 11,
    name: "Hot Dog",
    description: "Hot dog clásico con salsas y vegetales",
    price: 75,
    category: "Comida Rápida",
    available: true,
      image: "/ImagenesMenu/hotdog.jpg",
    options: [
      { id: "sin_mostaza", label: "Sin mostaza" },
      { id: "extra_cebolla", label: "Extra cebolla" },
      { id: "picante", label: "Picante" }
    ]
  },
  {
    id: 12,
    name: "Papas a la Francesa",
    description: "Papas fritas doradas y crujientes",
    price: 60,
    category: "Comida Rápida",
    available: true,
      image: "/ImagenesMenu/papasfrancesa.jpg",
    options: [
      { id: "con_queso", label: "Con queso" },
      { id: "sin_sal", label: "Sin sal" },
      { id: "extra_sal", label: "Extra sal" }
    ]
  },
  {
    id: 13,
    name: "Burritos",
    description: "Burritos rellenos de tu elección",
    price: 110,
    category: "Comida Rápida",
    available: true,
    image: "/ImagenesMenu/burritos.jpg",
    options: [
      { id: "pollo", label: "De pollo" },
      { id: "carne", label: "De carne" },
      { id: "vegetariano", label: "Vegetariano" }
    ]
  },

  // Antojitos Mexicanos
  {
    id: 14,
    name: "Taquitos de Adobada",
    description: "Tres taquitos de carne adobada",
    price: 85,
    category: "Antojitos Mexicanos",
    available: true,
    image: "/ImagenesMenu/adobada.jpg",
    options: [
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "con_guacamole", label: "Con guacamole" },
      { id: "extra_salsa", label: "Extra salsa" }
    ]
  },
  {
    id: 15,
    name: "Tacos Tuxpeños",
    description: "Tacos tradicionales con carne guisada",
    price: 90,
    category: "Antojitos Mexicanos",
    available: true,
    image: "/ImagenesMenu/tuxpeños.jpg",
    options: [
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "carne_doble", label: "Carne doble" },
      { id: "picante", label: "Picante" }
    ]
  },
  {
    id: 16,
    name: "Sopitos",
    description: "Masa frita con carne, queso y lechuga",
    price: 95,
    category: "Antojitos Mexicanos",
    available: true,
    image: "/ImagenesMenu/sopitos.jpg",
    options: [
      { id: "extra_queso", label: "Extra queso" },
      { id: "sin_lechuga", label: "Sin lechuga" },
      { id: "con_guacamole", label: "Con guacamole" }
    ]
  },
  {
    id: 17,
    name: "Flautas de Pollo",
    description: "Tres flautas de pollo doradas",
    price: 100,
    category: "Antojitos Mexicanos",
    available: true,
    image: "/ImagenesMenu/flautas.jpg",
    options: [
      { id: "con_crema", label: "Con crema" },
      { id: "con_guacamole", label: "Con guacamole" },
      { id: "extra_salsa", label: "Extra salsa" }
    ]
  },
  {
    id: 18,
    name: "Enchiladas Suizas",
    description: "Enchiladas rellenas de pollo con salsa verde",
    price: 125,
    category: "Antojitos Mexicanos",
    available: true,
    image: "/ImagenesMenu/enchiladas.jpg",
    options: [
      { id: "salsa_roja", label: "Salsa roja" },
      { id: "sin_crema", label: "Sin crema" },
      { id: "extra_queso", label: "Extra queso" }
    ]
  },

  // Platillos del Día
  {
    id: 19,
    name: "Guiso del Día con Agua",
    description: "Platillo del día con agua fresca",
    price: 85,
    category: "Platillos del Día",
    available: true,
    image: "/ImagenesMenu/guiso.jpg",
    options: [
      { id: "sin_picante", label: "Sin picante" },
      { id: "carne_extra", label: "Carne extra" }
    ]
  },
  {
    id: 20,
    name: "Guiso del Día sin Agua",
    description: "Platillo del día sin agua fresca",
    price: 75,
    category: "Platillos del Día",
    available: true,
    image: "/ImagenesMenu/guiso2.jpg",
    options: [
      { id: "sin_picante", label: "Sin picante" },
      { id: "carne_extra", label: "Carne extra" }
    ]
  },

  // Sandwiches
  {
    id: 21,
    name: "Sandwich de Lomo",
    description: "Pan integral con lomo de res y vegetales",
    price: 115,
    category: "Sandwiches",
    available: true,
    image: "/ImagenesMenu/lomo.jpg",
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "con_aguacate", label: "Con aguacate" }
    ]
  },
  {
    id: 22,
    name: "Sandwich de Pollo",
    description: "Pechuga de pollo desmenuzada con vegetales",
    price: 95,
    category: "Sandwiches",
    available: true,
    image: "/ImagenesMenu/pollo.jpg",
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "carne_extra", label: "Carne extra" }
    ]
  },
  {
    id: 23,
    name: "Sandwich de Panela",
    description: "Queso de panela con vegetales frescos",
    price: 85,
    category: "Sandwiches",
    available: true,
    image: "/ImagenesMenu/panela.jpg",
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "queso_extra", label: "Queso extra" },
      { id: "con_aguacate", label: "Con aguacate" }
    ]
  },
  {
    id: 24,
    name: "Sandwich de Jamón",
    description: "Jamón serrano con queso y vegetales",
    price: 90,
    category: "Sandwiches",
    available: true,
    image: "/ImagenesMenu/jamon.jpg",
    options: [
      { id: "tostado", label: "Tostado" },
      { id: "jamón_extra", label: "Jamón extra" },
      { id: "con_aguacate", label: "Con aguacate" }
    ]
  },

  // Tortas
  {
    id: 25,
    name: "Torta de Lomo",
    description: "Pan blanco con lomo de res y aguacate",
    price: 125,
    category: "Tortas",
    available: true,
    image: "/ImagenesMenu/lomo2.jpg",
    options: [
      { id: "sin_mayonesa", label: "Sin mayonesa" },
      { id: "doble_lomo", label: "Doble lomo" },
      { id: "sin_cebolla", label: "Sin cebolla" }
    ]
  },
  {
    id: 26,
    name: "Torta Hawaiiana",
    description: "Carne, jamón, queso y piña",
    price: 130,
    category: "Tortas",
    available: true,
    image: "/ImagenesMenu/hawaiana.jpg",
    options: [
      { id: "sin_piña", label: "Sin piña" },
      { id: "extra_queso", label: "Extra queso" },
      { id: "picante", label: "Picante" }
    ]
  },
  {
    id: 27,
    name: "Torta Cubana",
    description: "Carne, jamón, queso, huevo y aguacate",
    price: 135,
    category: "Tortas",
    available: true,
    image: "/ImagenesMenu/cubana.jpg",
    options: [
      { id: "sin_huevo", label: "Sin huevo" },
      { id: "extra_carne", label: "Extra carne" },
      { id: "sin_mayonesa", label: "Sin mayonesa" }
    ]
  },
  {
    id: 28,
    name: "Torta de Panela",
    description: "Queso de panela con vegetales frescos",
    price: 105,
    category: "Tortas",
    available: true,
    image: "/ImagenesMenu/panela2.jpeg",
    options: [
      { id: "queso_extra", label: "Queso extra" },
      { id: "con_jamón", label: "Con jamón" },
      { id: "sin_mayonesa", label: "Sin mayonesa" }
    ]
  },
  {
    id: 29,
    name: "Torta de Jamón",
    description: "Jamón serrano con queso y aguacate",
    price: 110,
    category: "Tortas",
    available: true,
    image: "/ImagenesMenu/jamon2.jpg",
    options: [
      { id: "jamón_extra", label: "Jamón extra" },
      { id: "queso_extra", label: "Queso extra" },
      { id: "sin_aguacate", label: "Sin aguacate" }
    ]
  },
  {
    id: 30,
    name: "Medio Pachuco Sencillo",
    description: "Media bolillo con carne y vegetales",
    price: 85,
    category: "Tortas",
    available: true,
    image: "/ImagenesMenu/carne.jpg",
    options: [
      { id: "carne_doble", label: "Carne doble" },
      { id: "sin_cebolla", label: "Sin cebolla" },
      { id: "picante", label: "Picante" }
    ]
  },
  {
    id: 31,
    name: "Medio Pachuco con Carne",
    description: "Media bolillo con carne extra y aguacate",
    price: 105,
    category: "Tortas",
    available: true,
    image: "/ImagenesMenu/carne2.jpg",
    options: [
      { id: "carne_doble", label: "Carne doble" },
      { id: "sin_aguacate", label: "Sin aguacate" },
      { id: "con_queso", label: "Con queso" }
    ]
  },

  // Opciones Ligeras
  {
    id: 32,
    name: "Ensalada de Pollo",
    description: "Lechuga, pollo, tomate y aderezo",
    price: 105,
    category: "Opciones Ligeras",
    available: true,
    image: "/ImagenesMenu/ensalada.jpg",
    options: [
      { id: "aderezo_aparte", label: "Aderezo aparte" },
      { id: "pollo_extra", label: "Pollo extra" },
      { id: "sin_queso", label: "Sin queso" }
    ]
  },
  {
    id: 33,
    name: "Fruta",
    description: "Combinación de frutas frescas de temporada",
    price: 65,
    category: "Opciones Ligeras",
    available: true,
    image: "/ImagenesMenu/frutas.png",
    options: [
      { id: "con_limon", label: "Con limón" },
      { id: "con_chile", label: "Con chile" },
      { id: "sin_limon", label: "Sin limón" }
    ]
  },
  {
    id: 34,
    name: "Gelatina",
    description: "Gelatina de sabor a elegir",
    price: 35,
    category: "Opciones Ligeras",
    available: true,
    image: "/ImagenesMenu/gelatina.jpg",
    options: [
      { id: "sabor_fresa", label: "Fresa" },
      { id: "sabor_lima", label: "Lima" },
      { id: "sabor_piña", label: "Piña" }
    ]
  },

  // Bebidas
  {
    id: 35,
    name: "Agua de Sabor",
    description: "Agua fresca de sabor a elegir",
    price: 30,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/agua.jpg",
    options: [
      { id: "jamaica", label: "Jamaica" },
      { id: "tamarindo", label: "Tamarindo" },
      { id: "horchata", label: "Horchata" }
    ]
  },
  {
    id: 36,
    name: "Jugo Natural de Naranja",
    description: "Jugo fresco de naranja recién exprimido",
    price: 45,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/jugo.jpg",
    options: [
      { id: "con_hielo", label: "Con hielo" },
      { id: "sin_pulpa", label: "Sin pulpa" },
      { id: "con_limon", label: "Con limón" }
    ]
  },
  {
    id: 37,
    name: "Jugo Verde",
    description: "Jugo detox con espinaca, nopal y piña",
    price: 55,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/jugo2.jpg",
    options: [
      { id: "con_hielo", label: "Con hielo" },
      { id: "sin_limon", label: "Sin limón" },
      { id: "extra_jengibre", label: "Extra jengibre" }
    ]
  },
  {
    id: 38,
    name: "Licuado de Frutas",
    description: "Licuado hecho con frutas frescas",
    price: 65,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/licuado.png",
    options: [
      { id: "con_leche", label: "Con leche" },
      { id: "sin_azucar", label: "Sin azúcar" },
      { id: "con_hielo", label: "Con hielo" }
    ]
  },
  {
    id: 39,
    name: "Chocomilk",
    description: "Chocolate con leche caliente o fría",
    price: 55,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/chocomilk.jpg",
    options: [
      { id: "caliente", label: "Caliente" },
      { id: "frio", label: "Frío" },
      { id: "marshmallows", label: "Con marshmallows" }
    ]
  },
  {
    id: 40,
    name: "Vaso con Leche",
    description: "Leche fresca en vaso",
    price: 40,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/leche.jpg",
    options: [
      { id: "leche_entera", label: "Leche entera" },
      { id: "leche_descremada", label: "Leche descremada" },
      { id: "caliente", label: "Caliente" }
    ]
  },
  {
    id: 41,
    name: "Café",
    description: "Café negro recién preparado",
    price: 35,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/cafe.jpg",
    options: [
      { id: "con_leche", label: "Con leche" },
      { id: "sin_azucar", label: "Sin azúcar" },
      { id: "espresso", label: "Espresso" }
    ]
  },
  {
    id: 42,
    name: "Té",
    description: "Té caliente a elegir",
    price: 40,
    category: "Bebidas",
    available: true,
    image: "/ImagenesMenu/te.jpg",
    options: [
      { id: "té_negro", label: "Té negro" },
      { id: "té_verde", label: "Té verde" },
      { id: "té_manzanilla", label: "Té manzanilla" }
    ]
  }
];