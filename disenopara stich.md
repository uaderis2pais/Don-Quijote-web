# Documento de Diseño (Design Brief) - Don Quijote Pizza Bar

## 1. Concepto General
El objetivo es crear una Landing Page (sitio de una sola página) **minimalista, prolija y moderna** para "Don Quijote Pizza Bar". La información debe ser directa y fácil de leer desde dispositivos móviles, ya que la mayoría de los usuarios entrarán para pedir comida.
Se utilizará un estilo "Dark Mode" (fondo oscuro) para hacer resaltar los colores vibrantes del logo y darle un toque nocturno/bar elegante.

## 2. Paleta de Colores
Extraída del logo (`image_bd1f9c.png`):
*   **Color de Fondo Principal:** `#121212` (Negro suave, no puro, para descansar la vista).
*   **Color de Fondo Secundario:** `#1E1E1E` (Para tarjetas de menú o secciones divisorias).
*   **Color de Acento (Principal):** `#18D2D8` (Cian/Turquesa brillante, tomado del borde del logo. Usar para botones, enlaces e íconos).
*   **Texto Principal:** `#FFFFFF` (Blanco puro para títulos).
*   **Texto Secundario:** `#B3B3B3` (Gris claro para descripciones y horarios).

## 3. Tipografía
Recomendación de Google Fonts, limpias y sin serifas:
*   **Títulos / Encabezados:** `Montserrat` (Moderna, geométrica, combina con la tipografía del logo). Peso: Bold (700).
*   **Cuerpo de Texto / Menú:** `Inter` o `Roboto`. Peso: Regular (400) y Medium (500) para precios.

## 4. Estructura de la Página (Secciones)

### A. Encabezado (Navbar)
*   Logo pequeño a la izquierda.
*   Botón de "Pedir ahora" a la derecha (enlaza directo a WhatsApp).
*   Diseño "Sticky" (se queda fijo al scrollear).

### B. Hero Section (Inicio)
*   **Elemento visual:** El logo principal (`image_bd1f9c.png`) centrado y grande.
*   **Eslogan:** "¡Compartamos risas y buenos sabores! 😁🍕" (Texto en blanco, tamaño grande).
*   **Call to Action (Botón principal):** Botón color Cian `#18D2D8` con texto negro que diga "Hacer un Pedido" (Icono de WhatsApp + enlace al `wa.me/5493442567262`).

### C. Información Útil (Minimalista)
Tres columnas simples (o apiladas en móvil) con íconos color Cian:
*   **📍 Ubicación:** Ereño 673, Concepción del Uruguay.
*   **🕠 Horarios:** TODOS LOS DÍAS. 11:00 a 15:00 hs | 19:00 a 02:00 hs.
*   **📱 Contacto:** 3442-567262.

### D. Sección de Menú Digital
*   **Estilo:** Ya que no hay fotos, el diseño debe ser puramente tipográfico y muy ordenado.
*   **Categorías:** Separadas por Títulos (Ej: PIZZAS, BEBIDAS, etc.).
*   **Ítems:** 
    *   Nombre del plato a la izquierda (Blanco, Inter Medium).
    *   Línea punteada sutil de separación `........`
    *   Precio a la derecha (Color Cian, Inter Bold).
*   *Nota para el dev:* Importar la lista de precios basándose en el contenido de `todoqr.com/menu/DONQUIJOTE`.

### E. Footer (Pie de página)
*   Redes Sociales: Enlace a Instagram (`@donquijote.pizzabar`).
*   Agradecimiento breve.
*   Créditos de diseño ("Diseñado por [Tu Nombre/Agencia]").

## 5. Instrucciones UX/UI para el Desarrollador (Stich)
1.  **Mobile-First:** El 90% del tráfico vendrá de celulares (gente queriendo pedir pizza). Los botones deben ser grandes y fáciles de tocar.
2.  **Sin distracciones:** No agregar animaciones pesadas ni pop-ups. 
3.  **Botón Flotante:** Agregar un botón flotante (FAB) de WhatsApp en la esquina inferior derecha que esté visible en todo momento.
4.  **Bordes:** Usar bordes levemente redondeados (`border-radius: 8px`) en tarjetas y botones para suavizar el diseño.