const WA = '254791229945';
const products = [
  {id:'cabro-coloured', name:'Coloured Cabro Paving', cat:'Cabro & Paving', tag:'POPULAR', image:'assets/cabro-2.jpg', desc:'Coloured interlocking paving for driveways, compounds and walkways.'},
  {id:'cabro-plain', name:'Plain Cabro Paving', cat:'Cabro & Paving', tag:'CORE RANGE', image:'assets/cabro-1.jpg', desc:'Clean, durable paving for driveways, compounds, parking areas and walkways.'},
  {id:'cabro-patterned', name:'Patterned Cabro Designs', cat:'Cabro & Paving', tag:'DESIGN', image:'assets/project-03.jpeg', desc:'Create custom-looking patterns by combining colours and paving layouts.'},
  {id:'cabro-polish', name:'Cabro Polish & Finishing', cat:'Cabro & Paving', tag:'SERVICE', image:'assets/cabro-polish.png', desc:'Cleaning and polishing solutions for a cleaner, more finished paved surface.'},
  {id:'door-modern', name:'Modern Decorative Door', cat:'Doors', tag:'FEATURED', image:'assets/door-03.jpeg', desc:'A rich wood-finish decorative door for a strong modern entrance.'},
  {id:'door-linear', name:'Linear Wood-Finish Door', cat:'Doors', tag:'MODERN', image:'assets/door-04.jpeg', desc:'Contemporary timber-look styling with clean horizontal detailing.'},
  {id:'door-classic', name:'Classic Moulded Door', cat:'Doors', tag:'POPULAR', image:'assets/door-02.jpeg', desc:'Natural timber character with traditional moulded panel detailing.'},
  {id:'door-dark', name:'Dark Decorative Door', cat:'Doors', tag:'STATEMENT', image:'assets/door-01.jpeg', desc:'Dark finish with an elegant raised-panel profile.'},
  {id:'door-burgundy', name:'Deep Wood-Finish Door', cat:'Doors', tag:'TIMBER', image:'assets/door-05.jpeg', desc:'Deep-toned decorative door with a classic panelled design.'},
  {id:'tiles-display', name:'Floor & Wall Tile Range', cat:'Tiles & Finishes', tag:'RANGE', image:'assets/tile-01.jpeg', desc:'A broad selection of practical and decorative tile finishes.'},
  {id:'tiles-feature', name:'Statement Tile Finishes', cat:'Tiles & Finishes', tag:'DESIGN', image:'assets/tile-02.jpeg', desc:'Patterned, textured and decorative options for feature walls and interiors.'},
  {id:'tiles-modern', name:'Modern Porcelain & Tile Options', cat:'Tiles & Finishes', tag:'PREMIUM', image:'assets/tile-03.jpeg', desc:'Clean contemporary finishes for floors, walls and feature spaces.'},
  {id:'tiles-marble', name:'Marble-Look Tile Options', cat:'Tiles & Finishes', tag:'POPULAR', image:'assets/tile-04.jpeg', desc:'Marble-inspired surfaces for bathrooms, kitchens and living spaces.'},
  {id:'sanitary', name:'Sanitary Ware', cat:'Sanitary Ware', tag:'CORE RANGE', image:'assets/sanitary-01.jpeg', desc:'Toilets and sanitary pieces in practical and statement styles.'},
  {id:'bathroom', name:'Bathroom Fittings', cat:'Sanitary Ware', tag:'BATHROOM', image:'assets/bathroom-03.jpeg', desc:'Bathroom accessories and fittings for a coordinated finish.'},
  {id:'bathroom-accessories', name:'Bathroom Accessories', cat:'Sanitary Ware', tag:'RANGE', image:'assets/bathroom-05.jpeg', desc:'Towel rails, holders, hooks, soap accessories and other bathroom hardware.'},
  {id:'toilets', name:'Toilets & WC Options', cat:'Sanitary Ware', tag:'CORE RANGE', image:'assets/sanitary-01.jpeg', desc:'A range of toilet designs for residential and commercial bathrooms.'},
  {id:'washbasins', name:'Wash Hand Basins & Vanities', cat:'Sanitary Ware', tag:'INTERIORS', image:'assets/bathroom-04.jpeg', desc:'Wash hand basins, vanity combinations and supporting bathroom fittings.'},
  {id:'stone-slabs', name:'Natural Stone & Mazeras', cat:'Stone & Cladding', tag:'NATURAL', image:'assets/mazeras-01.jpeg', desc:'Natural stone pieces for cladding, steps, floors and exterior finishes.'},
  {id:'stone-cladding', name:'Mazeras Cladding', cat:'Stone & Cladding', tag:'FEATURED', image:'assets/project-01.jpeg', desc:'Stone cladding applications for feature walls, columns and exterior elevations.'},
  {id:'stone-finish', name:'Stone Cladding Applications', cat:'Stone & Cladding', tag:'FINISH', image:'assets/project-01.jpeg', desc:'Explore how natural stone can transform columns, walls and house exteriors.'},
  {id:'cement', name:'Cement', cat:'Building Essentials', tag:'CORE RANGE', image:'assets/cement-01.jpeg', desc:'Cement supply for active construction projects. Ask for current stock and price.'}
];

const categories = ['All', ...new Set(products.map(p => p.cat))];
let activeCategory = 'All';
let quote = [];

const grid = document.getElementById('catalogGrid');
const filters = document.getElementById('catalogFilters');
const search = document.getElementById('catalogSearch');
const count = document.getElementById('catalogCount');
const modal = document.getElementById('productModal');
const quoteBar = document.getElementById('quoteBar');
const quoteItems = document.getElementById('quoteItems');
const quoteModal = document.getElementById('quoteModal');

function renderFilters(){
  filters.innerHTML = categories.map(c => `<button class="filter ${c===activeCategory?'active':''}" data-cat="${c}">${c}</button>`).join('');
  filters.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {activeCategory=btn.dataset.cat; renderFilters(); renderProducts();}));
}
function renderProducts(){
  const q = search.value.trim().toLowerCase();
  const visible = products.filter(p => (activeCategory==='All'||p.cat===activeCategory) && (!q || `${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(q)));
  count.textContent = `Showing ${visible.length} product${visible.length===1?'':'s'}`;
  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>${p.tag}</span></div>
      <div class="product-body"><div class="product-cat">${p.cat}</div><h3>${p.name}</h3><p>${p.desc}</p>
        <div class="product-actions"><button class="details" data-id="${p.id}">View details</button><button class="add" data-id="${p.id}">${quote.some(x=>x.id===p.id)?'Added ✓':'Add to quote'}</button></div>
      </div>
    </article>`).join('') || `<div class="empty"><h3>No matching products</h3><p>Try another search or ask us directly for current stock.</p></div>`;
  grid.querySelectorAll('.details').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.id)));
  grid.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>toggleQuote(b.dataset.id)));
}
function openModal(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  modal.innerHTML=`<div class="modal-backdrop" data-close="1"></div><div class="modal-card"><button class="modal-close" data-close="1" aria-label="Close">×</button><img src="${p.image}" alt="${p.name}"><div><div class="product-cat">${p.cat}</div><h2>${p.name}</h2><p>${p.desc}</p><p class="modal-note">Ask us for current price, available sizes/finishes, quantity and delivery options.</p><button class="btn btn-gold modal-add" data-id="${p.id}">Add to quote</button></div></div>`;
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  modal.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',closeModal));
  modal.querySelector('.modal-add').addEventListener('click',()=>{toggleQuote(id);closeModal();});
}
function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');}
function toggleQuote(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  const i=quote.findIndex(x=>x.id===id); if(i>=0) quote.splice(i,1); else quote.push(p);
  updateQuote(); renderProducts();
}
function updateQuote(){
  quoteItems.textContent=quote.length?`${quote.length} item${quote.length===1?'':'s'} selected`:'No products selected';
  quoteBar.classList.toggle('visible',quote.length>0);
}
function openQuoteReview(){
  if(!quote.length){window.open(`https://wa.me/${WA}?text=Hello%20Peak%20Legacy%2C%20I%27d%20like%20a%20quote.`, '_blank');return;}
  quoteModal.innerHTML=`<div class="modal-backdrop" data-quote-close="1"></div><div class="quote-review-card"><button class="modal-close" data-quote-close="1" aria-label="Close">×</button><p class="eyebrow dark">YOUR REQUIREMENT</p><h2>Let's build your enquiry.</h2><p class="quote-review-intro">Add quantities and delivery details so Peak Legacy can respond with a useful quotation instead of a generic price.</p><div class="quote-lines">${quote.map((p,i)=>`<div class="quote-line"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${p.cat}</small></div><label>Qty<input type="number" min="1" value="1" data-qty-id="${p.id}"></label></div>`).join('')}</div><div class="quote-form-grid"><label>Delivery / site location<input id="quoteLocation" type="text" placeholder="e.g. Nyahururu, Rumuruti, Nanyuki…"></label><label>Extra notes <textarea id="quoteNotes" rows="3" placeholder="Preferred colour, size, deadline, installation, etc."></textarea></label></div><div class="quote-review-actions"><button class="clear-btn light-clear" data-quote-close="1">Keep browsing</button><button class="btn btn-gold" id="sendQuoteNow">Send quotation request on WhatsApp →</button></div></div>`;
  quoteModal.classList.add('show'); quoteModal.setAttribute('aria-hidden','false');
  quoteModal.querySelectorAll('[data-quote-close]').forEach(x=>x.addEventListener('click',closeQuoteReview));
  quoteModal.querySelector('#sendQuoteNow').addEventListener('click',sendQuoteNow);
}
function closeQuoteReview(){quoteModal.classList.remove('show');quoteModal.setAttribute('aria-hidden','true');}
function sendQuoteNow(){
  const lines=quote.map((p,i)=>{const input=quoteModal.querySelector(`[data-qty-id="${p.id}"]`);const qty=Math.max(1,parseInt(input?.value||'1',10)||1);return `${i+1}. ${p.name} — Qty ${qty}`;}).join('\n');
  const location=quoteModal.querySelector('#quoteLocation')?.value.trim()||'Not specified';
  const notes=quoteModal.querySelector('#quoteNotes')?.value.trim()||'None';
  const text=`Hello Peak Legacy, I'd like a quotation for:\n${lines}\n\nDelivery / site location: ${location}\nExtra notes: ${notes}\n\nPlease confirm current price, availability and delivery options.`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`,'_blank');
}

search.addEventListener('input',renderProducts);
document.getElementById('clearQuote').addEventListener('click',()=>{quote=[];updateQuote();renderProducts();});
document.getElementById('quoteBtn').addEventListener('click',openQuoteReview);
document.querySelectorAll('[data-category-link]').forEach(a=>a.addEventListener('click',()=>{activeCategory=a.dataset.categoryLink;renderFilters();renderProducts();}));
const menuBtn=document.getElementById('menuBtn'); const nav=document.getElementById('nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeQuoteReview();nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}});
renderFilters(); renderProducts(); updateQuote();
