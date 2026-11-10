/* ============================================================
   SLICE CRAFT BAKERY — Main JavaScript
   Menu data sourced from SLICE_CRAFT_BAKERY_MENU.xlsx
   ============================================================ */

'use strict';

// ===== CUSTOM CURSOR =====
const ring = document.getElementById('cursor-ring');
let pulseT = 0;

document.addEventListener('mousemove', e => {
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

(function animateCursor() {
  pulseT += 0.07;
  const pulse   = 0.5 + Math.sin(pulseT) * 0.5;
  const size    = 4 + pulse * 3;
  const glow    = 4 + pulse * 10;
  const opacity = 0.5 + pulse * 0.5;
  ring.style.width     = size + 'px';
  ring.style.height    = size + 'px';
  ring.style.boxShadow = `0 0 ${glow}px ${glow/2}px rgba(212,168,75,${opacity})`;
  requestAnimationFrame(animateCursor);
})();

// ===== NAV SCROLL =====
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== FLOATING PARTICLES =====
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 28; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = [
    `left:${Math.random()*100}%`,
    `bottom:-10px`,
    `--dur:${6+Math.random()*8}s`,
    `--delay:${Math.random()*8}s`,
    `--drift:${(Math.random()-0.5)*80}px`,
    `width:${1+Math.random()*2}px`,
    `height:${1+Math.random()*2}px`,
  ].join(';');
  particleContainer.appendChild(p);
}

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== CARD REVEAL =====
function observeCards() {
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.menu-card').forEach(c => cardObs.observe(c));
}

// ===== GALLERY =====
const GALLERY_IMAGES = [
  'images/gallery-1.svg','images/gallery-2.svg','images/gallery-3.svg','images/gallery-4.svg',
  'images/gallery-5.svg','images/gallery-6.svg','images/gallery-7.svg','images/gallery-8.svg',
];
function populateGallery() {
  const html = GALLERY_IMAGES.map(src =>
    `<div class="gallery-thumb"><img src="${src}" alt="" loading="lazy"></div>`
  ).join('');
  document.getElementById('galleryInner1').innerHTML = html + html;
  document.getElementById('galleryInner2').innerHTML = html + html;
}

// ===== CATEGORY IMAGE MAP (fallback only — used when an item has no own photo) =====
const CAT_IMAGES = {
  cakes:          ['images/cake-1.svg','images/cake-2.svg','images/cake-3.svg'],
  cheesecakes:    ['images/cheesecake-1.svg','images/cheesecake-2.svg'],
  tiramisu:       ['images/cheesecake-1.svg','images/cake-2.svg'],
  sansrival:      ['images/sansrival-1.svg','images/cake-3.svg'],
  drinks:         ['images/drink-1.svg','images/drink-2.svg'],
  cookies:        ['images/tart-1.svg','images/tart-2.svg'],
  bars:           ['images/sourdough-1.svg','images/sansrival-1.svg'],
  pasta:          ['images/sourdough-2.svg','images/gallery-3.svg'],
  frenchtoast:    ['images/cake-2.svg','images/gallery-5.svg'],
  focaccia:       ['images/sourdough-1.svg','images/gallery-6.svg'],
  toasties:       ['images/gallery-7.svg','images/sourdough-2.svg'],
  croissant:      ['images/gallery-8.svg','images/tart-2.svg'],
  crinkles:       ['images/tart-1.svg','images/cake-1.svg'],
  empanada:       ['images/sourdough-1.svg','images/gallery-6.svg'],
  sourdoughbread: ['images/sourdough-1.svg','images/sourdough-2.svg'],
  creampuff:      ['images/tart-2.svg','images/cake-2.svg'],
  biscuit:        ['images/sourdough-2.svg','images/gallery-7.svg'],
  grabandgo:      ['images/gallery-8.svg','images/tart-1.svg'],
};
function getImg(cat) {
  const arr = CAT_IMAGES[cat] || CAT_IMAGES.cakes;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ===== FULL MENU DATA (from SLICE_CRAFT_BAKERY_MENU.xlsx, Nov 2026 update) =====
// Pricing format:
//   single price  -> { price: '₱480' }
//   two sizes     -> { sizes: ['7"','10"'], prices: ['₱1,200','₱2,100'] }
//   img, when present, is the item's own photo; otherwise a category placeholder is used.

const MENU = [

  // ── CAKES ───────────────────────────────────────────────────────
  { cat:'cakes', name:'Chocolate Strawberry', desc:'Moist chocolate cake layers, dark chocolate mousse, dark chocolate ganache, strawberries.', sizes:['7"','10"'], prices:['₱1,380','₱2,580'], img:'images/menu/cakes/1.jpg' },
  { cat:'cakes', name:'Carrot Pecan', desc:'Moist carrot pecan cake layers, caramel cream cheese frosting, caramel, roasted pecans.', sizes:['7"','10"'], prices:['₱1,470','₱2,780'], img:'images/menu/cakes/2.jpg' },
  { cat:'cakes', name:'Red Velvet', desc:'Moist red velvet cake layers, cream cheese frosting, white chocolate ganache, strawberries.', sizes:['7"','10"'], prices:['₱1,950','₱3,700'], img:'images/menu/cakes/3.jpg' },
  { cat:'cakes', name:'Ube Flan Entremet', desc:'Moist ube cake layers, homemade ube halaya, macapuno, cream cheese leche flan, ube frosting.', sizes:['7"','10"'], prices:['₱2,800','₱4,500'], img:'images/menu/cakes/4.jpg' },
  { cat:'cakes', name:'Cabernet Berry Delight', desc:'Chocolate cookie crust, spiced chocolate cake layer, cream with mixed berry compote, dark chocolate ganche, mixed berries.', sizes:['7"','10"'], prices:['₱1,760','₱3,350'], img:'images/menu/cakes/5.jpg' },
  { cat:'cakes', name:'Matcha Gateau Cake', desc:'Matcha gateau layer, matcha white chocolate, matcha cream frosting, cream, buttered biscuits.', sizes:['7"','10"'], prices:['₱1,700','₱2,600'], img:'images/menu/cakes/6.jpg' },
  { cat:'cakes', name:'Banana Hojicha & Black Sesame', desc:'Moist black sesame cake layers, fresh bananas, caramel, roasted cashews, hojicha cream frosting.', sizes:['7"','10"'], prices:['₱1,450','₱2,750'], img:'images/menu/cakes/7.jpg' },
  { cat:'cakes', name:'Butterscotch Cashew', desc:'Butterscotch cake layers with cashews, butterscotch cream cheese frosting, caramel, roasted cashews.', sizes:['7"','10"'], prices:['₱1,350','₱2,500'], img:'images/menu/cakes/8.jpg' },
  { cat:'cakes', name:'Dark Chocolate Berry Brownie', desc:'Dark chocolate brownie layers, strawberries with cream, dark chocolate frosting.', sizes:['7"','10"'], prices:['₱2,750','₱5,300'], img:'images/menu/cakes/9.jpg' },
  { cat:'cakes', name:'Strawberry Cream Cake', desc:'Vanilla sponge cake layers, vanilla cream frosting, strawberry compote, fresh strawberries.', sizes:['7"','10"'], prices:['₱2,000','₱3,850'], img:'images/menu/cakes/10.jpg' },
  { cat:'cakes', name:'Fruits & Fleurs', desc:'Vanilla tres leches cake layers, lemon curd, mango chunks, vanilla bean chantilly cream.', sizes:['7"','10"'], prices:['₱1,400','₱2,600'], img:'images/menu/cakes/11.jpg' },
  { cat:'cakes', name:'Sweet Clay', desc:'Moist banana cake layers, espresso caramel sauce, espresso cream frosting, roasted macadamia.', sizes:['7"','10"'], prices:['₱2,600','₱4,980'], img:'images/menu/cakes/12.jpg' },
  { cat:'cakes', name:'Dear Ruby', desc:'Moist earl grey cake layers, lemon curd, lychee slices, ruby chocolate frosting, edible rose petals.', sizes:['7"','10"'], prices:['₱2,550','₱4,860'], img:'images/menu/cakes/13.jpg' },
  { cat:'cakes', name:'Ferrero Rocher', desc:'Brownie layers, hazelnut meringue layers, nutella frosting, dark chocolate ganache, roasted hazelnuts, dark chocolate glaze, Ferrero Rocher chocolate truffle.', sizes:['7"','10"'], prices:['₱5,270','₱6,900'], img:'images/menu/cakes/14.jpg' },
  { cat:'cakes', name:'Chocolate Pistachio', desc:'Moist chocolate cake layers, pistachio buttercream, chocolate ganache, cream cheese flowers.', sizes:['7"','10"'], prices:['₱2,100','₱3,950'], img:'images/menu/cakes/15.jpg' },
  { cat:'cakes', name:'Turtle Pecan', desc:'Moist chocolate cake layers, caramel with roasted pecans, salted caramel buttercream, dark chocolate ganache, caramel, pecan praline.', sizes:['7"','10"'], prices:['₱2,470','₱4,800'], img:'images/menu/cakes/16.jpg' },
  { cat:'cakes', name:'Chocolate Kahlua', desc:'Moist chocolate cake layers, mocha cream frosting, Kahlua buttercream, chocolate sail, cacao nibs.', sizes:['7"','10"'], prices:['₱1,900','₱3,700'], img:'images/menu/cakes/17.jpg' },
  { cat:'cakes', name:'Charlotte Tiramisu', desc:'Espresso - Amaretto soaked ladyfingers, cream, cocoa powder.', sizes:['7"','10"'], prices:['₱1,750','₱3,300'], img:'images/menu/cakes/18.jpg' },
  { cat:'cakes', name:'Opera Cake', desc:'Paillete feuilletine, hazelnut praline, joconde sponge, coffee buttercream, dark chocolate cream, dark chocolate glaze.', sizes:['7"','10"'], prices:['₱1,900','₱3,100'], img:'images/menu/cakes/19.jpg' },
  { cat:'cakes', name:'Vanilla Pistachio', desc:'Moist vanilla cake layers with pistachios, pistachio buttercream, roasted pistachios.', sizes:['7"','10"'], prices:['₱1,920','₱3,700'], img:'images/menu/cakes/20.jpg' },
  { cat:'cakes', name:'Berry Bliss', desc:'Moist vanilla lemon cake layers, mixed berry compote, white chocolate cream frosting, mixed berries.', sizes:['7"','10"'], prices:['₱3,550','₱6,900'], img:'images/menu/cakes/21.jpg' },
  { cat:'cakes', name:'Mango Cream', desc:'Moist vanilla cake layers, vanilla cream cheese frosting, fresh mango slices.', sizes:['7"','10"'], prices:['₱1,950','₱3,600'], img:'images/menu/cakes/22.jpg' },
  { cat:'cakes', name:'Pistachio Chocolate Kataifi', desc:'Dark chocolate brownie layers, pistachio kataifi, dark chocolate frosting.', sizes:['7"','10"'], prices:['₱2,750','₱5,300'], img:'images/menu/cakes/23.jpg' },
  { cat:'cakes', name:'Strawberry Tres Leches', desc:'Vanilla tres leches cake layers, lemon curd, fresh strawberries, vanilla bean chantilly cream.', sizes:['7"','10"'], prices:['₱3,300','₱5,860'], img:'images/menu/cakes/24.jpg' },
  { cat:'cakes', name:'Earl Grey Olive Oil Cake', desc:'Moist earl grey olive oil cake layers, French lemon curd, honey cream frosting.', sizes:['7"','10"'], prices:['₱1,600','₱3,000'], img:'images/menu/cakes/25.jpg' },
  { cat:'cakes', name:'Pistachio Rose Olive Oil Cake', desc:'Pistachio olive oil cake layers, mixed berry compote, rose cream frosting.', sizes:['7"','10"'], prices:['₱2,100','₱4,000'], img:'images/menu/cakes/26.jpg' },
  { cat:'cakes', name:'Blitz Torte Cake', desc:'Buttery sponge cake, meringue, almonds, honey custard.', sizes:['7"','10"'], prices:['₱1,100','₱1,900'], img:'images/menu/cakes/27.jpg' },
  { cat:'cakes', name:'Dark Chocolate Napoleon Cake', desc:'Chocolate puff pastry, 60% dark chocolate cremeaux (berry toppings upon request).', sizes:['Classic (9x9")','With Berry Toppings (9x9")'], prices:['₱2,650','₱4,650'], img:'images/menu/cakes/28.png' },
  { cat:'cakes', name:'Dulce De Leche Napoleon Cake', desc:'Classic puff pastry, dulce de leche cremeaux (berry toppings upon request).', sizes:['Classic (9x9")','With Berry Toppings (9x9")'], prices:['₱1,950','₱4,350'], img:'images/menu/cakes/29.png' },

  // ── CHEESECAKES ─────────────────────────────────────────────────
  { cat:'cheesecakes', name:'Bibingka Basque Burnt Cheesecake', desc:'Coconut cheesecake, salted egg, dessicated coconut, Gouda cheese.', sizes:['7"','10"'], prices:['₱1,960','₱3,400'], img:'images/menu/cheesecakes/1.jpg' },
  { cat:'cheesecakes', name:'Classic Basque Burnt Cheesecake', desc:'Mousse-like creamy vanilla cheesecake with golden burnt surface.', sizes:['7"','10"'], prices:['₱1,550','₱2,500'], img:'images/menu/cheesecakes/2.jpg' },
  { cat:'cheesecakes', name:'Ube Fleur Vanille', desc:'Graham cracker crust, ube cheesecake, white chocolate coconut cream.', sizes:['7"','10"'], prices:['₱2,150','₱3,700'], img:'images/menu/cheesecakes/3.jpg' },
  { cat:'cheesecakes', name:'Oreo Cheesecake Brownie Trifle', desc:'Dark chocolate brownie crust, oreo cheesecake, oreo cream filling, dark chocolate frosting.', sizes:['7"','10"'], prices:['₱1,750','₱3,280'], img:'images/menu/cheesecakes/4.jpg' },
  { cat:'cheesecakes', name:'Baklava', desc:'Walnut-pistachio baklava crust, spiced cheesecake, baklava topping with simple syrup.', sizes:['7"','10"'], prices:['₱2,530','₱4,900'], img:'images/menu/cheesecakes/5.jpg' },
  { cat:'cheesecakes', name:'Strawberries and Cream Basque Burnt Cheesecake', desc:'Vanilla - lemon cheesecake, cream, fresh strawberries.', sizes:['7"','10"'], prices:['₱2,360','₱4,550'], img:'images/menu/cheesecakes/6.jpg' },
  { cat:'cheesecakes', name:'Mixed Berries', desc:'Dark brownie crust, mixed berries cheesecake, white chocolate cream, topped with mixed berries.', sizes:['7"','10"'], prices:['₱3,470','₱6,780'], img:'images/menu/cheesecakes/7.jpg' },
  { cat:'cheesecakes', name:'Cacao & Coffee', desc:'Cacao nibs - coffee crust, 60% dark chocolate cheesecake, dark chocolate ganache, cocoa powder, Maldon salt.', sizes:['7"','10"'], prices:['₱2,680','₱5,100'], img:'images/menu/cheesecakes/8.jpg' },
  { cat:'cheesecakes', name:'Vanilla Bean Pecan', desc:'Graham-pecan crust, vanilla cheesecake, vanilla cream, roasted pecans.', sizes:['7"','10"'], prices:['₱2,000','₱3,670'], img:'images/menu/cheesecakes/9.jpg' },
  { cat:'cheesecakes', name:'Blueberry Lemon', desc:'Graham - coconut crust, blueberry cheesecake, lemon curd, blueberries.', sizes:['7"','10"'], prices:['₱2,470','₱4,300'], img:'images/menu/cheesecakes/10.jpg' },
  { cat:'cheesecakes', name:'Biscoff Kitkat', desc:'Biscoff crust, cheesecake with Biscoff biscuit and spread, Kitkat ganache.', sizes:['7"','10"'], prices:['₱3,270','₱6,300'], img:'images/menu/cheesecakes/11.jpg' },
  { cat:'cheesecakes', name:'Calamansi and Mango', desc:'Graham - coconut crust, calamansi cheesecake, mango curd.', sizes:['7"','10"'], prices:['₱1,650','₱2,800'], img:'images/menu/cheesecakes/12.jpg' },
  { cat:'cheesecakes', name:'Dubai Pistachio Chocolate Basque Burnt Cheesecake', desc:'Pistachio Basque burnt cheesecake, pistachio Kataifi, dark chocolate ganache.', sizes:['7"','10"'], prices:['₱2,500','₱4,700'], img:'images/menu/cheesecakes/13.jpg' },

  // ── TIRAMISU ────────────────────────────────────────────────────
  { cat:'tiramisu', name:'Classic Tiramisu', desc:'', price:'₱285', img:'images/menu/tiramisu/1.jpg' },

  // ── SANS RIVAL ──────────────────────────────────────────────────
  { cat:'sansrival', name:'Mixed Nuts Sans Rival', desc:'Crispy meringue layers, classic buttercream, almonds, pistachios, cashews.', sizes:['7"','10"'], prices:['₱1,850','₱3,500'], img:'images/menu/sansrival/1.jpg' },
  { cat:'sansrival', name:'Biscoff Kitkat Sans Rival', desc:'Crispy meringue layers, Biscoff buttercream, Kitkat buttercream, cashews.', sizes:['7"','10"'], prices:['₱2,500','₱4,800'], img:'images/menu/sansrival/2.jpg' },
  { cat:'sansrival', name:'Ube Sans Rival', desc:'Crispy meringue layers, ube buttercream, cashews.', sizes:['7"','10"'], prices:['₱1,700','₱3,250'], img:'images/menu/sansrival/3.jpg' },
  { cat:'sansrival', name:'Chocolate Pistachio Sans Rival', desc:'Crispy meringue layers, pistachio buttercream, dark chocolate buttercream, pistachios.', sizes:['7"','10"'], prices:['₱2,700','₱5,150'], img:'images/menu/sansrival/4.jpg' },

  // ── COOKIES ─────────────────────────────────────────────────────
  { cat:'cookies', name:'Chocolate Chip with Sea Salt', desc:'', price:'₱110', img:'images/menu/cookies/1.jpg' },
  { cat:'cookies', name:'Biscoff Kitkat', desc:'', price:'₱80', img:'images/menu/cookies/2.jpg' },
  { cat:'cookies', name:'S\'mores', desc:'', price:'₱50', img:'images/menu/cookies/3.jpg' },
  { cat:'cookies', name:'Cowboy', desc:'', price:'₱85', img:'images/menu/cookies/4.jpg' },
  { cat:'cookies', name:'Dark Chocolate Chip', desc:'', price:'₱60', img:'images/menu/cookies/5.jpg' },
  { cat:'cookies', name:'Oreo', desc:'', price:'₱75', img:'images/menu/cookies/6.jpg' },
  { cat:'cookies', name:'Red Velvet', desc:'', price:'₱75', img:'images/menu/cookies/7.jpg' },
  { cat:'cookies', name:'Walnut Chocolate Chip', desc:'', price:'₱65', img:'images/menu/cookies/8.jpg' },
  { cat:'cookies', name:'Pistachio Chocolate', desc:'', price:'₱130', img:'images/menu/cookies/9.jpg' },
  { cat:'cookies', name:'Nutella', desc:'', price:'₱75', img:'images/menu/cookies/10.jpg' },
  { cat:'cookies', name:'Salted Caramel', desc:'', price:'₱70', img:'images/menu/cookies/11.jpg' },

  // ── BARS ────────────────────────────────────────────────────────
  { cat:'bars', name:'Brookie', desc:'', sizes:['Half','Whole'], prices:['₱95','₱145'], img:'images/menu/bars/1.jpg' },
  { cat:'bars', name:'Oatmeal Fudge', desc:'', sizes:['Half','Whole'], prices:['₱75','₱150'], img:'images/menu/bars/2.jpg' },
  { cat:'bars', name:'Caramel Pecan Blondie', desc:'', sizes:['Half','Whole'], prices:['₱90','₱175'], img:'images/menu/bars/3.jpg' },
  { cat:'bars', name:'Pistachio Dark Chocolate Blondie', desc:'', sizes:['Half','Whole'], prices:['₱135','₱285'], img:'images/menu/bars/5.jpg' },
  { cat:'bars', name:'Nutty Brownie', desc:'', sizes:['Half','Whole'], prices:['₱80','₱160'], img:'images/menu/bars/6.jpg' },
  { cat:'bars', name:'Classic Brownie', desc:'', sizes:['Half','Whole'], prices:['₱65','₱135'], img:'images/menu/bars/7.jpg' },
  { cat:'bars', name:'Biscoff Brownie', desc:'', sizes:['Half','Whole'], prices:['₱85','₱170'], img:'images/menu/bars/8.jpg' },

  // ── HANDMADE PASTA ──────────────────────────────────────────────
  { cat:'pasta', name:'Beef Ragu Pappardelle', desc:'Braised beef, tomato and red wine sauce, aromatic vegetables, pappardelle.', price:'₱480', img:'images/menu/pasta/1.jpg' },
  { cat:'pasta', name:'Shrimp Tagliolini', desc:'Robust tomato sauce, olives, capers, tagliolini.', price:'₱350', img:'images/menu/pasta/2.jpg' },
  { cat:'pasta', name:'Classic Carbonara', desc:'Guanciale, pecorino romano, eggs, fettuccine.', price:'₱560', img:'images/menu/pasta/3.jpg' },
  { cat:'pasta', name:'Truffle Mushroom', desc:'Porcini & Shitake mushrooms, truffle cream, tagliatelle, straciatella.', price:'₱500', img:'images/menu/pasta/4.jpg' },
  { cat:'pasta', name:'Pesto Cavatelli', desc:'Homemade basil pesto, guanciale, roasted pistachios, cavatelli, straciatella.', price:'₱480', img:'images/menu/pasta/5.jpg' },
  { cat:'pasta', name:'Three-cheese Ravioli', desc:'Ricotta, fontal, parmigiano reggiano ravioli in Pomodoro sauce.', price:'₱530', img:'images/menu/pasta/6.jpg' },
  { cat:'pasta', name:'Lasagna', desc:'Beef marinara sauce, Mornay sauce, herbed cheese layers, mozzarella.', price:'₱650', img:'images/menu/pasta/7.jpg' },

  // ── FRENCH TOAST ────────────────────────────────────────────────
  { cat:'frenchtoast', name:'Banoffee', desc:'Shokupan bread, Madagascar vanilla-coffee cream, banana butter, dark chocolate, Maldon salt, caramel.', price:'₱430', img:'images/menu/frenchtoast/1.jpg' },
  { cat:'frenchtoast', name:'Chocolate Espresso Pecan', desc:'Shokupan bread, Madagascar vanilla-coffee cream, dark chocolate butter, Maldon salt, caramel, pecans.', price:'₱490', img:'images/menu/frenchtoast/2.jpg' },
  { cat:'frenchtoast', name:'Chocolate Pistachio', desc:'Shokupan bread, Madagascar vanilla cream, pistachio butter, Maldon salt, dark chocolate filling, roasted pistachios.', price:'₱500', img:'images/menu/frenchtoast/3.jpg' },
  { cat:'frenchtoast', name:'Mixed Berries', desc:'Shokupan bread, Madagascar vanilla cream, mixed berry butter, berry compote, Maldon salt.', price:'₱490', img:'images/menu/frenchtoast/4.jpg' },

  // ── FOCACCIA SANDWICH ───────────────────────────────────────────
  { cat:'focaccia', name:'Mortadella', desc:'Focaccia bread, Mortadella, roasted pistachios, straciatella, hot honey.', price:'₱710', img:'images/menu/focaccia/1.jpg' },
  { cat:'focaccia', name:'Smoked Salmon', desc:'Focaccia with everything bagel seasoning, smoked salmon, capers, dill, onion, tomato, cream cheese.', price:'₱620', img:'images/menu/focaccia/2.jpg' },
  { cat:'focaccia', name:'Prosciutto Arugula', desc:'Focaccia bread, prosciutto, straciatella, truffle cream, arugula microgreens.', price:'₱685', img:'images/menu/focaccia/3.jpg' },

  // ── SOURDOUGH TOASTIES ──────────────────────────────────────────
  { cat:'toasties', name:'Grilled Cheese', desc:'Sharp orange cheddar, mozzarella, sourdough bread.', price:'₱395', img:'images/menu/toasties/1.jpg' },
  { cat:'toasties', name:'Tuna Melt (classic/spicy)', desc:'Herbed tuna (choice of classic or spicy), mozzarella, sourdough bread.', price:'₱345', img:'images/menu/toasties/2.jpg' },
  { cat:'toasties', name:'Ham & Cheese', desc:'White cheddar, sharp orange cheddar, ham, mayochup.', price:'₱520', img:'images/menu/toasties/3.jpg' },
  { cat:'toasties', name:'Truffle Mushroom', desc:'Herbed Shitake mushrooms, sharp orange cheddar, mozzarella, truffle paste.', price:'₱460', img:'images/menu/toasties/4.jpg' },
  { cat:'toasties', name:'Pesto Bacon', desc:'Homemade pesto, bacon, mozzarella.', price:'₱390', img:'images/menu/toasties/5.jpg' },

  // ── CROISSANT ───────────────────────────────────────────────────
  { cat:'croissant', name:'Classic Croissant', desc:'', price:'₱105', img:'images/menu/croissant/1.jpg' },
  { cat:'croissant', name:'Twice-baked Almond Croissant', desc:'', price:'₱180', img:'images/menu/croissant/2.jpg' },
  { cat:'croissant', name:'Coffee Chocolate Pecan', desc:'', price:'₱195', img:'images/menu/croissant/3.jpg' },
  { cat:'croissant', name:'Five Cheese Herbed Danish', desc:'', price:'₱175', img:'images/menu/croissant/4.jpg' },
  { cat:'croissant', name:'Cheese Tart', desc:'', price:'₱95', img:'images/menu/croissant/5.jpg' },
  { cat:'croissant', name:'Pistachio Chocolate', desc:'', price:'₱195', img:'images/menu/croissant/6.jpg' },
  { cat:'croissant', name:'Pain Au Chocolat', desc:'', price:'₱165', img:'images/menu/croissant/7.jpg' },
  { cat:'croissant', name:'White Cheese Ham and Pineapple', desc:'', price:'₱165', img:'images/menu/croissant/8.jpg' },
  { cat:'croissant', name:'Spinach and Artichoke', desc:'', price:'₱165', img:'images/menu/croissant/9.jpg' },

  // ── CRINKLES ────────────────────────────────────────────────────
  { cat:'crinkles', name:'Chocolate', desc:'', price:'₱75', img:'images/menu/crinkles/1.jpg' },
  { cat:'crinkles', name:'Red Velvet', desc:'', price:'₱75', img:'images/menu/crinkles/2.jpg' },
  { cat:'crinkles', name:'Chocolate Butternut', desc:'', price:'₱75', img:'images/menu/crinkles/3.jpg' },
  { cat:'crinkles', name:'Nutella Kataifi', desc:'', price:'₱120', img:'images/menu/crinkles/4.jpg' },
  { cat:'crinkles', name:'Pistachio Kataifi', desc:'', price:'₱120', img:'images/menu/crinkles/5.jpg' },

  // ── EMPANADA ────────────────────────────────────────────────────
  { cat:'empanada', name:'Hickory-smoked Chicken Empanada', desc:'', price:'₱75', img:'images/menu/empanada/1.jpg' },
  { cat:'empanada', name:'Argentinian Beef Empanada', desc:'', price:'₱105', img:'images/menu/empanada/2.jpg' },

  // ── SOURDOUGH BREAD ─────────────────────────────────────────────
  { cat:'sourdoughbread', name:'Country', desc:'Artisan sourdough loaf, 990 grams pre-baked weight.', price:'₱180', img:'images/menu/sourdoughbread/1.jpg' },
  { cat:'sourdoughbread', name:'Rye', desc:'Artisan sourdough loaf, 990 grams pre-baked weight.', price:'₱180' },
  { cat:'sourdoughbread', name:'Buckwheat', desc:'Artisan sourdough loaf, 990 grams pre-baked weight.', price:'₱150' },
  { cat:'sourdoughbread', name:'Seeded Multigrain', desc:'Artisan sourdough loaf, 1110 grams pre-baked weight.', price:'₱150' },
  { cat:'sourdoughbread', name:'Cranberry Walnut', desc:'Artisan sourdough loaf, 1140 grams pre-baked weight.', price:'₱150' },
  { cat:'sourdoughbread', name:'Orange Cheddar Jalapeno', desc:'Artisan sourdough loaf, 1160 grams pre-baked weight.', price:'₱150' },
  { cat:'sourdoughbread', name:'Double Dark Chocolate Pecan', desc:'Artisan sourdough loaf, 1225 grams pre-baked weight.', price:'Ask in-store' },

  // ── CREAM PUFF ──────────────────────────────────────────────────
  { cat:'creampuff', name:'Madagascar Vanilla', desc:'', price:'₱85', img:'images/menu/creampuff/1.jpg' },
  { cat:'creampuff', name:'Pistachio', desc:'', price:'₱100', img:'images/menu/creampuff/2.jpg' },
  { cat:'creampuff', name:'Banoffee', desc:'', price:'₱95', img:'images/menu/creampuff/3.jpg' },
  { cat:'creampuff', name:'Dark Chocolate', desc:'', price:'₱95', img:'images/menu/creampuff/4.jpg' },

  // ── BISCUIT ─────────────────────────────────────────────────────
  { cat:'biscuit', name:'Spam and Egg Biscuit', desc:'', price:'₱180', img:'images/menu/biscuit/1.jpg' },
  { cat:'biscuit', name:'Tuna Mousse Sesame Biscuit', desc:'', price:'₱180', img:'images/menu/biscuit/2.jpg' },
  { cat:'biscuit', name:'Blueberry Cathead Biscuit', desc:'', price:'₱150', img:'images/menu/biscuit/3.jpg' },
  { cat:'biscuit', name:'Apple Pie Cathead Biscuit', desc:'', price:'₱150', img:'images/menu/biscuit/4.jpg' },
  { cat:'biscuit', name:'Strawberry Cathead Biscuit', desc:'', price:'₱150', img:'images/menu/biscuit/5.jpg' },
  { cat:'biscuit', name:'Cranberry Cathead Biscuit', desc:'', price:'₱150', img:'images/menu/biscuit/6.jpg' },

  // ── GRAB-AND-GO ─────────────────────────────────────────────────
  { cat:'grabandgo', name:'Sourdough Cracker', desc:'', price:'₱280', img:'images/menu/grabandgo/1.jpg' },
  { cat:'grabandgo', name:'Sourdoigh Granola', desc:'', price:'₱375', img:'images/menu/grabandgo/2.jpg' },
  { cat:'grabandgo', name:'Dark Chocolate Biscotti', desc:'', price:'₱395', img:'images/menu/grabandgo/3.jpg' },
  { cat:'grabandgo', name:'Almond Cranberry Biscotti', desc:'', price:'₱365', img:'images/menu/grabandgo/4.jpg' },
  { cat:'grabandgo', name:'Mantecado Frozen Brazo De Mercedes', desc:'', price:'₱310', img:'images/menu/grabandgo/5.jpg' },

  // ── DRINKS ──────────────────────────────────────────────────────
  { cat:'drinks', name:'Long Black', desc:'Espresso-based Drinks.', sizes:['Hot','Iced'], prices:['₱125','₱130'] },
  { cat:'drinks', name:'Americano', desc:'Espresso-based Drinks.', sizes:['Hot','Iced'], prices:['₱125','₱130'] },
  { cat:'drinks', name:'Café Latte', desc:'Espresso-based Drinks.', sizes:['Hot','Iced'], prices:['₱150','₱160'] },
  { cat:'drinks', name:'Cappuccino', desc:'Espresso-based Drinks.', sizes:['Hot','Iced'], prices:['₱150','₱160'] },
  { cat:'drinks', name:'Caramel Macchiato', desc:'Espresso-based Drinks.', sizes:['Hot','Iced'], prices:['₱170','₱180'] },
  { cat:'drinks', name:'Café Mocha', desc:'Espresso-based Drinks.', price:'₱170' },
  { cat:'drinks', name:'White Mocha', desc:'Espresso-based Drinks.', price:'₱170' },
  { cat:'drinks', name:'Salted Maple Dirty Chai Latte', desc:'Espresso-based Drinks.', price:'₱285' },
  { cat:'drinks', name:'Dirty Oat Horchata', desc:'Espresso-based Drinks.', price:'₱260' },
  { cat:'drinks', name:'Almond Coffee Jelly', desc:'Signature Drinks.', price:'₱160' },
  { cat:'drinks', name:'Dark Chocolate Breve', desc:'Signature Drinks.', price:'₱180' },
  { cat:'drinks', name:'Brown Sugar Oatmilk', desc:'Signature Drinks.', price:'₱230' },
  { cat:'drinks', name:'Tiramisu Latte', desc:'Signature Drinks.', price:'₱220' },
  { cat:'drinks', name:'White Mocha Breve', desc:'Signature Drinks.', price:'₱185' },
  { cat:'drinks', name:'Sea Salt Latte', desc:'Signature Drinks.', sizes:['Hot','Iced'], prices:['₱170','₱180'] },
  { cat:'drinks', name:'Salted Brown Butter', desc:'Signature Drinks.', sizes:['Hot','Iced'], prices:['₱250','₱240'] },
  { cat:'drinks', name:'Miso Caramel', desc:'Signature Drinks.', sizes:['Hot','Iced'], prices:['₱200','₱190'] },
  { cat:'drinks', name:'Salted Honey Oat', desc:'Signature Drinks.', sizes:['Hot','Iced'], prices:['₱200','₱190'] },
  { cat:'drinks', name:'Strawberry Matcha Latte', desc:'Tea-based Drinks.', price:'₱200' },
  { cat:'drinks', name:'Matcha Latte', desc:'Tea-based Drinks.', sizes:['Hot','Iced'], prices:['₱210','₱200'] },
  { cat:'drinks', name:'Coconut Matcha', desc:'Tea-based Drinks.', price:'₱290' },
  { cat:'drinks', name:'Matcha Earl Latte', desc:'Tea-based Drinks.', price:'₱285' },
  { cat:'drinks', name:'Maple Bourbon Vanilla Hojicha Latte', desc:'Tea-based Drinks.', sizes:['Hot','Iced'], prices:['₱250','₱250'] },
  { cat:'drinks', name:'Peach & Dragon Fruit', desc:'Refreshers.', price:'₱130' },
  { cat:'drinks', name:'Mango & Passion Fruit', desc:'Refreshers.', price:'₱130' },
  { cat:'drinks', name:'Berry Lychee', desc:'Refreshers.', price:'₱130' },
  { cat:'drinks', name:'Pink Guava Chia', desc:'Refreshers.', price:'₱130' },
  { cat:'drinks', name:'Mango Cranberry', desc:'Refreshers.', price:'₱130' },
  { cat:'drinks', name:'Citrus Pomegranate', desc:'Refreshers.', price:'₱130' },
  { cat:'drinks', name:'Strawberry Latte', desc:'Refreshers.', price:'₱150' },
];

// ===== CATEGORY CONFIG =====
const CATEGORIES = [
  { key:'all', label:'All' },
  { key:'cakes', label:'Cakes' },
  { key:'cheesecakes', label:'Cheesecakes' },
  { key:'tiramisu', label:'Tiramisu' },
  { key:'sansrival', label:'Sans Rival' },
  { key:'cookies', label:'Cookies' },
  { key:'bars', label:'Bars' },
  { key:'pasta', label:'Handmade Pasta' },
  { key:'frenchtoast', label:'French Toast' },
  { key:'focaccia', label:'Focaccia Sandwich' },
  { key:'toasties', label:'Sourdough Toasties' },
  { key:'croissant', label:'Croissant' },
  { key:'crinkles', label:'Crinkles' },
  { key:'empanada', label:'Empanada' },
  { key:'sourdoughbread', label:'Sourdough Bread' },
  { key:'creampuff', label:'Cream Puff' },
  { key:'biscuit', label:'Biscuit' },
  { key:'grabandgo', label:'Grab-and-Go' },
  { key:'drinks', label:'Drinks' },
];

const CAT_LABELS = Object.fromEntries(CATEGORIES.slice(1).map(c => [c.key, c.label]));

// ===== BUILD FILTER PILLS =====
function buildFilterPills() {
  const container = document.getElementById('categoryFilters');
  container.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="filter-pill${i === 0 ? ' active' : ''}" data-cat="${c.key}">${c.label}</button>`
  ).join('');
}

// ===== BUILD CARD =====
function buildCard(item) {
  const label = CAT_LABELS[item.cat] || item.cat;
  const img   = item.img || getImg(item.cat);

  // Price display: sizes with two prices, or a single price
  let priceHTML;
  if (item.sizes && item.prices) {
    priceHTML = item.sizes.map((s, i) =>
      `<span class="price-option"><span class="price-size">${s}</span><span class="price-val">${item.prices[i]}</span></span>`
    ).join('');
    priceHTML = `<div class="card-prices multi">${priceHTML}</div>`;
  } else {
    priceHTML = `<div class="card-prices single"><span class="price-val">${item.price}</span></div>`;
  }

  return `
    <div class="menu-card" data-cat="${item.cat}">
      <div class="card-img">
        <img src="${img}" alt="${item.name}" loading="lazy">
        <div class="card-overlay"></div>
        <div class="card-tag">${label}</div>
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          ${priceHTML}
          <button class="card-add" onclick="toggleAdd(this)" title="Add to order">+</button>
        </div>
      </div>
    </div>`;
}

// ===== RENDER MENU =====
let activeFilter = 'all';

function renderMenu(filterCat = 'all') {
  activeFilter = filterCat;
  const grid     = document.getElementById('menuGrid');
  const filtered = filterCat === 'all' ? MENU : MENU.filter(i => i.cat === filterCat);
  grid.innerHTML = filtered.map(buildCard).join('');
  setTimeout(observeCards, 50);
}

window.toggleAdd = function(btn) {
  btn.classList.toggle('added');
  btn.textContent = btn.classList.contains('added') ? '✓' : '+';
};

// ===== CATEGORY FILTER =====
document.getElementById('categoryFilters').addEventListener('click', e => {
  const pill = e.target.closest('.filter-pill');
  if (!pill) return;
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  renderMenu(pill.dataset.cat);
});

// ===== CARD MAGNETIC TILT =====
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.menu-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const dx   = e.clientX - (rect.left + rect.width  / 2);
    const dy   = e.clientY - (rect.top  + rect.height / 2);
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 250) {
      const f  = (250 - dist) / 250;
      card.style.transform = `perspective(800px) rotateX(${(dy/rect.height)*5*f}deg) rotateY(${-(dx/rect.width)*5*f}deg) translateY(${-f*8}px)`;
    } else {
      card.style.transform = '';
    }
  });
}, { passive: true });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== INIT =====
buildFilterPills();
populateGallery();
applyAdminOverrides();   // merge any admin edits before first render

// Slight delay so loading screen shows briefly, then render
setTimeout(() => {
  document.getElementById('loadingBar').style.width = '100%';
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    renderMenu('all');
  }, 400);
}, 300);

/* ============================================================
   ADMIN OVERRIDE — reads edits saved by admin.html
   from localStorage and merges them into the live site.
   ============================================================ */

// Called once at init — merges any admin-saved data into the live page
function applyAdminOverrides() {

  // ── 1. Menu item overrides (price, description, image) ──
  const saved = localStorage.getItem('scb_menu_overrides');
  if (saved) {
    try {
      const overrides = JSON.parse(saved); // { "Cat|Name": { price, desc, img } }
      MENU.forEach(item => {
        const key = item.cat + '|' + item.name;
        if (overrides[key]) {
          const o = overrides[key];
          if (o.desc)  item.desc  = o.desc;
          if (o.img)   item._adminImg = o.img;   // base64 or URL
          // single-price items
          if (o.price && item.price !== undefined)  item.price = o.price;
          // multi-price items — sizes stored as "7\"|10\""
          if (o.prices) {
            try { item.prices = JSON.parse(o.prices); } catch(e) {}
          }
        }
      });
    } catch(e) { console.warn('Admin overrides parse error:', e); }
  }

  // ── 2. Contact / Visit Us section ──
  const contact = localStorage.getItem('scb_contact');
  if (contact) {
    try {
      const c = JSON.parse(contact);
      const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
      setVal('contactLocation', c.location);
      setVal('contactHours',    c.hours);
      setVal('contactEmail',    c.email);
      setVal('contactInstagram',c.instagram);
      const h2 = document.querySelector('.contact-section h2');
      if (h2 && c.heading) h2.innerHTML = c.heading;
      const p  = document.querySelector('.contact-section > p');
      if (p  && c.subtext) p.textContent = c.subtext;
    } catch(e) {}
  }
}

// Patch getImg to respect admin-uploaded images
const _origGetImg = getImg;
window.getImg = function(item) {
  if (item && item._adminImg) return item._adminImg;
  return _origGetImg(item.cat || item);
};

// Patch buildCard — clickable card that opens product modal
const _origBuildCard = buildCard;
window.buildCard = function(item) {
  const img   = item._adminImg ? item._adminImg : (item.img || _origGetImg(item.cat));
  const label = CAT_LABELS[item.cat] || item.cat;

  // Store item data on the card via a safe index
  const idx = _productRegistry.push(item) - 1;

  let priceHTML;
  if (item.sizes && item.prices) {
    priceHTML = item.sizes.map((s, i) =>
      `<span class="price-option"><span class="price-size">${s}</span><span class="price-val">${item.prices[i]}</span></span>`
    ).join('');
    priceHTML = `<div class="card-prices multi">${priceHTML}</div>`;
  } else {
    priceHTML = `<div class="card-prices single"><span class="price-val">${item.price}</span></div>`;
  }

  return `
    <div class="menu-card" data-cat="${item.cat}" data-idx="${idx}" onclick="openProductModal(${idx})">
      <div class="card-img">
        <img src="${img}" alt="${item.name}" loading="lazy">
        <div class="card-overlay"></div>
        <div class="card-tag">${label}</div>
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          ${priceHTML}
          <button class="card-add" onclick="event.stopPropagation();toggleAdd(this)" title="View details">+</button>
        </div>
      </div>
    </div>`;
};

// Registry cleared on each renderMenu call
let _productRegistry = [];
const _origRenderMenu = renderMenu;
window.renderMenu = function(filterCat = 'all') {
  _productRegistry = [];
  _origRenderMenu(filterCat);
};

// ===== PRODUCT MODAL =====
window.openProductModal = function(idx) {
  const item  = _productRegistry[idx];
  if (!item) return;
  const img   = item._adminImg ? item._adminImg : (item.img || _origGetImg(item.cat));
  const label = CAT_LABELS[item.cat] || item.cat;

  // Build price rows
  let priceRows = '';
  if (item.sizes && item.prices) {
    priceRows = item.sizes.map((s, i) => `
      <div class="pm-price-row">
        <span class="pm-size">${s}</span>
        <span class="pm-price">${item.prices[i]}</span>
      </div>`).join('');
  } else {
    priceRows = `<div class="pm-price-row"><span class="pm-price single">${item.price}</span></div>`;
  }

  document.getElementById('pmImg').src         = img;
  document.getElementById('pmImg').alt         = item.name;
  document.getElementById('pmTag').textContent  = label;
  document.getElementById('pmName').textContent = item.name;
  document.getElementById('pmDesc').textContent = item.desc;
  document.getElementById('pmPrices').innerHTML = priceRows;

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeProductModal = function() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
};

// Close on backdrop click & Escape key
document.getElementById('productModal').addEventListener('click', e => {
  if (e.target === document.getElementById('productModal')) closeProductModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProductModal();
});
