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

// ===== CATEGORY IMAGE MAP =====
const CAT_IMAGES = {
  cakes:       ['images/cake-1.svg','images/cake-2.svg','images/cake-3.svg'],
  cheesecakes: ['images/cheesecake-1.svg','images/cheesecake-2.svg'],
  drinks:      ['images/drink-1.svg','images/drink-2.svg'],
  cookies:     ['images/tart-1.svg','images/tart-2.svg'],
  bars:        ['images/sourdough-1.svg','images/sansrival-1.svg'],
  pasta:       ['images/sourdough-2.svg','images/gallery-3.svg'],
  frenchtoast: ['images/cake-2.svg','images/gallery-5.svg'],
  focaccia:    ['images/sourdough-1.svg','images/gallery-6.svg'],
  toasties:    ['images/gallery-7.svg','images/sourdough-2.svg'],
  croissant:   ['images/gallery-8.svg','images/tart-2.svg'],
};
function getImg(cat) {
  const arr = CAT_IMAGES[cat] || CAT_IMAGES.cakes;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ===== FULL MENU DATA (from SLICE_CRAFT_BAKERY_MENU.xlsx) =====
// Pricing format:
//   single price  → { price: '₱480' }
//   two sizes     → { sizes: ['7"','10"'], prices: ['₱1,200','₱2,100'] }
//   hot/iced      → { sizes: ['Hot','Iced'], prices: ['₱125','₱130'] }  (null = N/A)

const MENU = [

  // ── CAKES ──────────────────────────────────────────────────────────────
  { cat:'cakes', name:'Chocolate Strawberry',
    desc:'Moist chocolate cake layers, dark chocolate mousse, dark chocolate ganache, strawberries.',
    sizes:['7"','10"'], prices:['₱1,200','₱2,100'] },
  { cat:'cakes', name:'Carrot Pecan',
    desc:'Moist carrot pecan cake layers, caramel cream cheese frosting, caramel, roasted pecans.',
    sizes:['7"','10"'], prices:['₱1,470','₱2,780'] },
  { cat:'cakes', name:'Red Velvet',
    desc:'Moist red velvet cake layers, cream cheese frosting, white chocolate ganache, strawberries.',
    sizes:['7"','10"'], prices:['₱1,950','₱3,700'] },
  { cat:'cakes', name:'Ube Flan Entremet',
    desc:'Moist ube cake layers, homemade ube halaya, macapuno, cream cheese leche flan, ube frosting.',
    sizes:['7"','10"'], prices:['₱2,800','₱4,500'] },
  { cat:'cakes', name:'Cabernet Berry Delight',
    desc:'Chocolate cookie crust, spiced chocolate cake layer, cream with mixed berry compote, dark chocolate ganache, mixed berries.',
    sizes:['7"','10"'], prices:['₱1,760','₱3,350'] },
  { cat:'cakes', name:'Matcha Gateau',
    desc:'Matcha gateau layer, matcha white chocolate, matcha cream frosting, cream, buttered biscuits.',
    sizes:['7"','10"'], prices:['₱1,700','₱2,600'] },
  { cat:'cakes', name:'Banana Hojicha & Black Sesame',
    desc:'Moist black sesame cake layers, fresh bananas, caramel, roasted cashews, hojicha cream frosting.',
    sizes:['7"','10"'], prices:['₱1,450','₱2,750'] },
  { cat:'cakes', name:'Butterscotch Cashew',
    desc:'Caramel cake layers with cashews, butterscotch cream cheese frosting, caramel, roasted cashews.',
    sizes:['7"','10"'], prices:['₱1,350','₱2,500'] },
  { cat:'cakes', name:'Dark Chocolate Berry Brownie',
    desc:'Dark chocolate brownie layers, strawberries with cream, dark chocolate frosting.',
    sizes:['7"','10"'], prices:['₱2,750','₱5,300'] },
  { cat:'cakes', name:'Strawberry Cream Cake',
    desc:'Vanilla sponge cake layers, vanilla cream frosting, strawberry compote, fresh strawberries.',
    sizes:['7"','10"'], prices:['₱1,250','₱2,300'] },
  { cat:'cakes', name:'Fruits & Fleurs',
    desc:'Vanilla tres leches cake layers, lemon curd, mango chunks, vanilla bean chantilly cream.',
    sizes:['7"','10"'], prices:['₱1,400','₱2,600'] },
  { cat:'cakes', name:'Sweet Clay',
    desc:'Moist banana cake layers, espresso caramel sauce, espresso cream frosting, roasted macadamia.',
    sizes:['7"','10"'], prices:['₱2,600','₱4,980'] },
  { cat:'cakes', name:'Dear Ruby',
    desc:'Moist earl grey cake layers, lemon curd, lychee slices, ruby chocolate frosting, edible rose petals.',
    sizes:['7"','10"'], prices:['₱2,550','₱4,860'] },
  { cat:'cakes', name:'Ferrero Rocher',
    desc:'Brownie layers, hazelnut meringue, nutella frosting, dark chocolate ganache, roasted hazelnuts, Ferrero Rocher truffle.',
    sizes:['7"','10"'], prices:['₱5,270','₱6,900'] },
  { cat:'cakes', name:'Chocolate Pistachio',
    desc:'Moist chocolate cake layers, pistachio buttercream, chocolate ganache, cream cheese flowers.',
    sizes:['7"','10"'], prices:['₱1,900','₱3,600'] },
  { cat:'cakes', name:'Turtle Pecan',
    desc:'Moist chocolate cake layers, caramel with roasted pecans, salted caramel buttercream, dark chocolate ganache, pecan praline.',
    sizes:['7"','10"'], prices:['₱2,470','₱4,800'] },
  { cat:'cakes', name:'Chocolate Kahlua',
    desc:'Moist chocolate cake layers, mocha cream frosting, Kahlua buttercream, chocolate sail, cacao nibs.',
    sizes:['7"','10"'], prices:['₱1,900','₱3,700'] },
  { cat:'cakes', name:'Charlotte Tiramisu',
    desc:'Espresso-Amaretto soaked ladyfingers, cream, cocoa powder.',
    sizes:['7"','10"'], prices:['₱1,750','₱3,300'] },
  { cat:'cakes', name:'Opera Cake',
    desc:'Paillete feuilletine, hazelnut praline, joconde sponge, coffee buttercream, dark chocolate cream & glaze.',
    sizes:['7"','10"'], prices:['₱1,900','₱3,100'] },
  { cat:'cakes', name:'Vanilla Pistachio',
    desc:'Moist vanilla cake layers with pistachios, pistachio buttercream, roasted pistachios.',
    sizes:['7"','10"'], prices:['₱1,920','₱3,700'] },
  { cat:'cakes', name:'Berry Bliss',
    desc:'Moist vanilla lemon cake layers, mixed berry compote, white chocolate cream frosting, mixed berries.',
    sizes:['7"','10"'], prices:['₱3,550','₱6,900'] },
  { cat:'cakes', name:'Mango Cream',
    desc:'Moist vanilla cake layers, vanilla cream cheese frosting, fresh mango slices.',
    sizes:['7"','10"'], prices:['₱1,950','₱3,600'] },
  { cat:'cakes', name:'Pistachio Chocolate Kataifi',
    desc:'Dark chocolate brownie layers, pistachio kataifi, dark chocolate frosting.',
    sizes:['7"','10"'], prices:['₱2,750','₱5,300'] },
  { cat:'cakes', name:'Strawberry Tres Leches',
    desc:'Vanilla tres leches cake layers, lemon curd, fresh strawberries, vanilla bean chantilly cream.',
    sizes:['7"','10"'], prices:['₱2,500','₱4,200'] },
  { cat:'cakes', name:'Hokey Pokey',
    desc:'Moist banana-biscoff cake layers, caramel espresso cream, dark chocolate frosting, hokey pokey bits.',
    sizes:['7"','10"'], prices:['₱2,800','₱5,400'] },
  { cat:'cakes', name:'Angel Food Cake',
    desc:'Almond sponge cake, cream, fresh strawberries.',
    sizes:['7"','10"'], prices:['₱1,900','₱3,600'] },

  // ── CHEESECAKES ────────────────────────────────────────────────────────
  { cat:'cheesecakes', name:'Bibingka Basque Burnt Cheesecake',
    desc:'Coconut cheesecake, salted egg, desiccated coconut, Gouda cheese.',
    sizes:['7"','10"'], prices:['₱1,960','₱3,400'] },
  { cat:'cheesecakes', name:'Ube Fleur Vanille',
    desc:'Graham cracker crust, ube cheesecake, white chocolate coconut cream.',
    sizes:['7"','10"'], prices:['₱2,150','₱3,700'] },
  { cat:'cheesecakes', name:'Oreo Cheesecake Brownie Trifle',
    desc:'Dark chocolate brownie crust, oreo cheesecake, oreo cream filling, dark chocolate frosting.',
    sizes:['7"','10"'], prices:['₱1,750','₱3,280'] },
  { cat:'cheesecakes', name:'Baklava',
    desc:'Walnut-pistachio baklava crust, spiced cheesecake, baklava topping with simple syrup.',
    sizes:['7"','10"'], prices:['₱2,530','₱4,900'] },
  { cat:'cheesecakes', name:'Strawberries & Cream Basque',
    desc:'Vanilla-lemon cheesecake, cream, fresh strawberries.',
    sizes:['7"','10"'], prices:['₱1,970','₱3,750'] },
  { cat:'cheesecakes', name:'Mixed Berries',
    desc:'Dark brownie crust, mixed berries cheesecake, white chocolate cream, topped with mixed berries.',
    sizes:['7"','10"'], prices:['₱3,470','₱6,780'] },
  { cat:'cheesecakes', name:'Cacao & Coffee',
    desc:'Cacao nibs-coffee crust, dark chocolate cheesecake, cocoa powder, Maldon salt.',
    sizes:['7"','10"'], prices:['₱1,800','₱3,400'] },
  { cat:'cheesecakes', name:'Vanilla Bean Pecan',
    desc:'Graham-pecan crust, vanilla cheesecake, vanilla cream, roasted pecans.',
    sizes:['7"','10"'], prices:['₱2,000','₱3,500'] },
  { cat:'cheesecakes', name:'Pistachio Basque Burnt Cheesecake',
    desc:'Pistachio cheesecake, pistachio kataifi, dark chocolate ganache.',
    sizes:['7"','10"'], prices:['₱3,320','₱6,450'] },
  { cat:'cheesecakes', name:'Blueberry Lemon Cake',
    desc:'Graham-coconut crust, blueberry cheesecake, lemon curd, blueberries.',
    sizes:['7"','10"'], prices:['₱2,470','₱4,300'] },

  // ── DRINKS ─────────────────────────────────────────────────────────────
  { cat:'drinks', name:'Long Black',        desc:'Espresso-based drink.',                              sizes:['Hot','Iced'], prices:['₱125','₱130'] },
  { cat:'drinks', name:'Americano',         desc:'Espresso-based drink.',                              sizes:['Hot','Iced'], prices:['₱125','₱130'] },
  { cat:'drinks', name:'Café Latte',        desc:'Espresso-based drink.',                              sizes:['Hot','Iced'], prices:['₱150','₱160'] },
  { cat:'drinks', name:'Cappuccino',        desc:'Espresso-based drink.',                              sizes:['Hot','Iced'], prices:['₱150','₱160'] },
  { cat:'drinks', name:'Caramel Macchiato', desc:'Espresso-based drink.',                              sizes:['Hot','Iced'], prices:['₱170','₱180'] },
  { cat:'drinks', name:'Café Mocha',        desc:'Espresso-based drink.',                              sizes:['Hot'],        prices:['₱170'] },
  { cat:'drinks', name:'White Mocha',       desc:'Espresso-based drink.',                              sizes:['Hot'],        prices:['₱170'] },
  { cat:'drinks', name:'Almond Coffee Jelly',       desc:'Signature drink.',                           sizes:['Iced'],       prices:['₱160'] },
  { cat:'drinks', name:'Dark Chocolate Breve',      desc:'Signature drink.',                           sizes:['Iced'],       prices:['₱180'] },
  { cat:'drinks', name:'Brown Sugar Oatmilk',       desc:'Signature drink.',                           sizes:['Iced'],       prices:['₱230'] },
  { cat:'drinks', name:'Tiramisu Latte',            desc:'Signature drink.',                           sizes:['Iced'],       prices:['₱220'] },
  { cat:'drinks', name:'White Mocha Breve',         desc:'Signature drink.',                           sizes:['Iced'],       prices:['₱185'] },
  { cat:'drinks', name:'Sea Salt Latte',            desc:'Signature drink.',                           sizes:['Hot','Iced'], prices:['₱170','₱180'] },
  { cat:'drinks', name:'Salted Brown Butter',       desc:'Signature drink.',                           sizes:['Hot','Iced'], prices:['₱250','₱240'] },
  { cat:'drinks', name:'Miso Caramel',              desc:'Signature drink.',                           sizes:['Hot','Iced'], prices:['₱200','₱190'] },
  { cat:'drinks', name:'Salted Honey Oat',          desc:'Signature drink.',                           sizes:['Hot','Iced'], prices:['₱200','₱190'] },
  { cat:'drinks', name:'Strawberry Matcha Latte',   desc:'Tea-based drink.',                           sizes:['Iced'],       prices:['₱200'] },
  { cat:'drinks', name:'Matcha Latte',              desc:'Tea-based drink.',                           sizes:['Hot','Iced'], prices:['₱210','₱200'] },
  { cat:'drinks', name:'Maple Bourbon Vanilla Hojicha Latte', desc:'Tea-based drink.',                 sizes:['Hot','Iced'], prices:['₱250','₱250'] },
  { cat:'drinks', name:'Peach & Dragon Fruit',      desc:'Refresher.',                                 sizes:['Iced'],       prices:['₱130'] },
  { cat:'drinks', name:'Mango & Passion Fruit',     desc:'Refresher.',                                 sizes:['Iced'],       prices:['₱130'] },
  { cat:'drinks', name:'Berry Lychee',              desc:'Refresher.',                                 sizes:['Iced'],       prices:['₱130'] },
  { cat:'drinks', name:'Pink Guava Chia',           desc:'Refresher.',                                 sizes:['Iced'],       prices:['₱130'] },
  { cat:'drinks', name:'Mango Cranberry',           desc:'Refresher.',                                 sizes:['Iced'],       prices:['₱130'] },
  { cat:'drinks', name:'Citrus Pomegranate',        desc:'Refresher.',                                 sizes:['Iced'],       prices:['₱130'] },
  { cat:'drinks', name:'Strawberry Latte',          desc:'Refresher.',                                 sizes:['Iced'],       prices:['₱150'] },

  // ── COOKIES ────────────────────────────────────────────────────────────
  { cat:'cookies', name:'Chocolate Chip with Sea Salt', desc:'Freshly baked cookie.', price:'₱110' },
  { cat:'cookies', name:'Matcha Ruby',                  desc:'Freshly baked cookie.', price:'₱85' },
  { cat:'cookies', name:'Biscoff KitKat',               desc:'Freshly baked cookie.', price:'₱80' },
  { cat:'cookies', name:"S'mores",                      desc:'Freshly baked cookie.', price:'₱50' },
  { cat:'cookies', name:'Cowboy',                       desc:'Freshly baked cookie.', price:'₱85' },
  { cat:'cookies', name:'Dark Chocolate Chip',          desc:'Freshly baked cookie.', price:'₱60' },
  { cat:'cookies', name:'Oreo',                         desc:'Freshly baked cookie.', price:'₱75' },
  { cat:'cookies', name:'Red Velvet',                   desc:'Freshly baked cookie.', price:'₱75' },
  { cat:'cookies', name:'Walnut Chocolate Chip',        desc:'Freshly baked cookie.', price:'₱65' },
  { cat:'cookies', name:'Pistachio Chocolate',          desc:'Freshly baked cookie.', price:'₱130' },
  { cat:'cookies', name:'Nutella',                      desc:'Freshly baked cookie.', price:'₱75' },
  { cat:'cookies', name:'Salted Caramel',               desc:'Freshly baked cookie.', price:'₱70' },

  // ── BARS ───────────────────────────────────────────────────────────────
  { cat:'bars', name:'Cookie Butter Blondie',          desc:'Handcrafted bar.', price:'₱65' },
  { cat:'bars', name:'Oatmeal Fudge',                  desc:'Handcrafted bar.', price:'₱75' },
  { cat:'bars', name:'Caramel Pecan Blondie',          desc:'Handcrafted bar.', price:'₱90' },
  { cat:'bars', name:'Ferrero Cheesecake Brownie',     desc:'Handcrafted bar.', price:'₱120' },
  { cat:'bars', name:'Pistachio Dark Chocolate Blondie', desc:'Handcrafted bar.', price:'₱110' },
  { cat:'bars', name:'Nutty Brownie',                  desc:'Handcrafted bar.', price:'₱80' },
  { cat:'bars', name:'Classic Brownie',                desc:'Handcrafted bar.', price:'₱65' },
  { cat:'bars', name:'Biscoff Brownie',                desc:'Handcrafted bar.', price:'₱85' },

  // ── HANDMADE PASTA ─────────────────────────────────────────────────────
  { cat:'pasta', name:'Beef Ragù Pappardelle',
    desc:'Braised beef, tomato and red wine sauce, aromatic vegetables, pappardelle.', price:'₱480' },
  { cat:'pasta', name:'Shrimp Tagliolini',
    desc:'Robust tomato sauce, olives, capers, tagliolini.', price:'₱350' },
  { cat:'pasta', name:'Classic Carbonara',
    desc:'Guanciale, pecorino romano, eggs, fettuccine.', price:'₱560' },
  { cat:'pasta', name:'Truffle Mushroom',
    desc:'Porcini & Shitake mushrooms, truffle cream, tagliatelle, straciatella.', price:'₱500' },
  { cat:'pasta', name:'Pesto Cavatelli',
    desc:'Homemade basil pesto, guanciale, roasted pistachios, cavatelli, straciatella.', price:'₱480' },
  { cat:'pasta', name:'Three-Cheese Ravioli',
    desc:'Ricotta, fontal, parmigiano reggiano ravioli in Pomodoro sauce.', price:'₱530' },
  { cat:'pasta', name:'Lasagna',
    desc:'Beef marinara sauce, Mornay sauce, herbed cheese layers, mozzarella.', price:'₱650' },

  // ── FRENCH TOAST ───────────────────────────────────────────────────────
  { cat:'frenchtoast', name:'Banoffee',
    desc:'Shokupan bread, Madagascar vanilla-coffee cream, banana butter, dark chocolate, Maldon salt, caramel.', price:'₱430' },
  { cat:'frenchtoast', name:'Chocolate Espresso Pecan',
    desc:'Shokupan bread, Madagascar vanilla-coffee cream, dark chocolate butter, Maldon salt, caramel, pecans.', price:'₱490' },
  { cat:'frenchtoast', name:'Chocolate Pistachio',
    desc:'Shokupan bread, Madagascar vanilla cream, pistachio butter, Maldon salt, dark chocolate filling, roasted pistachios.', price:'₱500' },
  { cat:'frenchtoast', name:'Mixed Berries',
    desc:'Shokupan bread, Madagascar vanilla cream, mixed berry butter, berry compote, Maldon salt.', price:'₱490' },

  // ── FOCACCIA SANDWICH ──────────────────────────────────────────────────
  { cat:'focaccia', name:'Mortadella',
    desc:'Focaccia bread, Mortadella, roasted pistachios, straciatella, hot honey.', price:'₱710' },
  { cat:'focaccia', name:'Smoked Salmon',
    desc:'Focaccia with everything bagel seasoning, smoked salmon, capers, dill, onion, tomato, cream cheese.', price:'₱620' },
  { cat:'focaccia', name:'Prosciutto Arugula',
    desc:'Focaccia bread, prosciutto, straciatella, truffle cream, arugula microgreens.', price:'₱685' },

  // ── SOURDOUGH TOASTIES ─────────────────────────────────────────────────
  { cat:'toasties', name:'Grilled Cheese',
    desc:'Sharp orange cheddar, mozzarella, sourdough bread.', price:'₱395' },
  { cat:'toasties', name:'Tuna Melt (Classic/Spicy)',
    desc:'Herbed tuna (choice of classic or spicy), mozzarella, sourdough bread.', price:'₱345' },
  { cat:'toasties', name:'Ham & Cheese',
    desc:'White cheddar, sharp orange cheddar, ham, mayochup.', price:'₱520' },
  { cat:'toasties', name:'Truffle Mushroom',
    desc:'Herbed Shitake mushrooms, sharp orange cheddar, mozzarella, truffle paste.', price:'₱460' },
  { cat:'toasties', name:'Pesto Bacon',
    desc:'Homemade pesto, bacon, mozzarella.', price:'₱390' },

  // ── CROISSANT ──────────────────────────────────────────────────────────
  { cat:'croissant', name:'Butter',                      desc:'Classic butter croissant.', price:'₱110' },
  { cat:'croissant', name:'Twice-Baked Almond',          desc:'Rich almond-filled croissant, twice baked.', price:'₱210' },
  { cat:'croissant', name:'Coffee Chocolate Pecan',      desc:'Croissant with coffee, chocolate, and roasted pecans.', price:'₱250' },
  { cat:'croissant', name:'Le Bourbon Brûlée',           desc:'Brûléed croissant with bourbon notes.', price:'₱110' },
  { cat:'croissant', name:'Pain au Chocolat',            desc:'Flaky pastry with dark chocolate filling.', price:'₱165' },
  { cat:'croissant', name:'Cardamom Buns',               desc:'Soft cardamom-spiced buns.', price:'₱175' },
  { cat:'croissant', name:'Pistachio Chocolate Kataifi', desc:'Croissant with pistachio kataifi and dark chocolate.', price:'₱275' },
];

// ===== CATEGORY CONFIG =====
const CATEGORIES = [
  { key:'all',         label:'All' },
  { key:'cakes',       label:'Cakes' },
  { key:'cheesecakes', label:'Cheesecakes' },
  { key:'drinks',      label:'Drinks' },
  { key:'cookies',     label:'Cookies' },
  { key:'bars',        label:'Bars' },
  { key:'pasta',       label:'Handmade Pasta' },
  { key:'frenchtoast', label:'French Toast' },
  { key:'focaccia',    label:'Focaccia Sandwich' },
  { key:'toasties',    label:'Sourdough Toasties' },
  { key:'croissant',   label:'Croissant' },
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
  const img   = getImg(item.cat);

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
  const img   = item._adminImg ? item._adminImg : _origGetImg(item.cat);
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
  const img   = item._adminImg ? item._adminImg : _origGetImg(item.cat);
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
