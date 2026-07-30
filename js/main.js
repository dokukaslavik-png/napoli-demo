document.documentElement.classList.add('js');

/* =========================================================
   MENU — EDIT HERE.
   price is just a number. tag is optional ('spicy'/'veg'/'chef').
========================================================= */
const MENU = [
  { id:'pizza', label:'Pizza', items:[
    { name:'Margherita',       desc:'San Marzano tomato, fior di latte, basil', price:12 },
    { name:'Diavola',          desc:'Spicy salami, chili, mozzarella',          price:14, tag:'spicy' },
    { name:'Quattro Formaggi', desc:'Mozzarella, gorgonzola, parmesan, provola', price:15 },
    { name:'Prosciutto e Funghi', desc:'Ham, mushrooms, mozzarella',            price:14 },
    { name:'Marinara',         desc:'Tomato, garlic, oregano, olive oil',       price:10, tag:'veg' },
  ]},
  { id:'antipasti', label:'Antipasti', items:[
    { name:'Bruschetta classica', desc:'Tomato, basil, garlic',                 price:7 },
    { name:'Burrata & prosciutto', desc:'Creamy burrata, San Daniele ham',      price:12, tag:'chef' },
    { name:'Arancini',            desc:'Fried risotto balls, ragù',             price:8 },
  ]},
  { id:'pasta', label:'Pasta', items:[
    { name:'Spaghetti carbonara', desc:'Guanciale, pecorino, egg yolk',         price:13 },
    { name:'Tagliatelle al ragù', desc:'Slow-cooked beef ragù',                 price:14 },
    { name:"Penne all'arrabbiata", desc:'Tomato, garlic, chili',                price:11, tag:'spicy' },
  ]},
  { id:'dolci', label:'Dolci', items:[
    { name:'Tiramisù',    desc:'Mascarpone, espresso, cocoa',                    price:7 },
    { name:'Cannoli',     desc:'Ricotta, candied orange',                       price:6 },
    { name:'Panna cotta', desc:'Vanilla, berry coulis',                         price:6 },
  ]},
  { id:'drinks', label:'Drinks', items:[
    { name:'Italian lemonade',    desc:'Lemon, mint, fizz',                     price:4 },
    { name:'Aperol Spritz',       desc:'Aperol, prosecco, soda',                price:8 },
    { name:'House red (glass)',   desc:'Montepulciano d\'Abruzzo',              price:6 },
    { name:'Espresso',            desc:'Double, Italian roast',                 price:3 },
  ]},
];
const CURRENCY = '$';

/* ---- site logic ---- */
const tabsEl = document.getElementById('menuTabs');
const listEl = document.getElementById('menuList');
function renderMenu(catId){
  const cat = MENU.find(c => c.id === catId) || MENU[0];
  listEl.innerHTML = cat.items.map(it => `
    <div class="menu-item">
      <div class="mi-top">
        <span class="mi-name">${it.name}${it.tag ? `<span class="mi-tag ${it.tag}">${it.tag}</span>` : ''}</span>
        <span class="mi-dots"></span>
        <span class="mi-price">${CURRENCY}${it.price}</span>
      </div>
      <p class="mi-desc">${it.desc}</p>
    </div>`).join('');
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat.id));
}
tabsEl.innerHTML = MENU.map((c,i) => `<button class="tab ${i===0?'active':''}" role="tab" data-cat="${c.id}">${c.label}</button>`).join('');
tabsEl.addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) renderMenu(b.dataset.cat); });
renderMenu(MENU[0].id);

const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

const io = new IntersectionObserver(en => {
  en.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const form = document.getElementById('bookForm');
const okMsg = document.getElementById('formOk');
form.addEventListener('submit', async (e) => {
  if (form.action.includes('YOUR_FORM_ID')) { e.preventDefault(); alert("The form isn't connected yet. Add your Formspree URL to the form's action attribute."); return; }
  e.preventDefault();
  try {
    const res = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{ Accept:'application/json' } });
    if (res.ok){ form.reset(); okMsg.style.display='block'; okMsg.scrollIntoView({behavior:'smooth',block:'center'}); }
    else alert('Could not send. Please try again or call us.');
  } catch { alert('No connection. Please try again later.'); }
});

document.getElementById('year').textContent = new Date().getFullYear();
