/**
 * Don Quijote Pizza Bar - Configuration & Identity Information
 */

export const RESTAURANT_INFO = {
  name: 'Don Quijote',
  subtitle: 'Pizza Bar',
  location: 'Concepción del Uruguay',
  address: 'Ereño 673, Concepción del Uruguay, Entre Ríos',
  shortAddress: 'Ereño 673, CdelU',
  phone: '3442-567262',
  whatsappNumber: '5493442567262',
  whatsappDisplay: '+54 9 3442 56-7262',
  hoursShort: 'Lun a Dom: 11:00 a 15:00 y 19:00 a 02:00 hs',
  hoursDetail: [
    { days: 'Todos los días', lunch: '11:00 a 15:00 hs', dinner: '19:00 a 02:00 hs' },
  ],
  instagram: 'https://instagram.com/donquijote.pizzabar',
  instagramHandle: '@donquijote.pizzabar',
  mapsUrl: 'https://www.google.com/maps/place/pizzeria+don+quijote/data=!4m2!3m1!1s0x0:0x9ab6e4908c4ba56d?sa=X&ved=1t:2428&ictx=111',
};

export const MENU_CATEGORIES = [
  { id: 'pizzas', name: 'Pizzas', title: 'PIZZAS CASERAS', subtitle: 'Masa casera horneada al punto justo' },
  { id: 'calzones', name: 'Calzones', title: 'CALZONES ARTESANALES', subtitle: 'Masa casera rellena con abundante queso y sabor' },
  { id: 'hamburguesas', name: 'Hamburguesas & Lomitos', title: 'HAMBURGUESAS & LOMITOS', subtitle: 'Medallones caseros con pan artesanal y papas' },
  { id: 'empanadas', name: 'Empanadas', title: 'EMPANADAS CRIOLLAS', subtitle: 'Rellenos abundantes y horneadas al punto justo' },
  { id: 'principales', name: 'Platos Principales', title: 'PLATOS PRINCIPALES & MINUTAS', subtitle: 'Cocina casera y platos tradicionales de salón' },
  { id: 'entradas', name: 'Entradas & Papas', title: 'ENTRADAS & PICOTEO', subtitle: 'Porciones para compartir con amigos' },
  { id: 'ensaladas', name: 'Ensaladas', title: 'ENSALADAS FRESCAS', subtitle: 'Vegetales seleccionados del día e ingredientes premium' },
  { id: 'bebidas', name: 'Bebidas & Bar', title: 'BEBIDAS & BAR', subtitle: 'Cervezas heladas, gaseosas y coctelería' },
];
