// ============================================================
// KABUTT ONLINE — App Principal (SPA)
// Navegación por hash, render de páginas, interacciones
// ============================================================

// ============================================================
// UTILIDADES
// ============================================================
function formatPrice(price) {
  return `S/ ${price.toFixed(2)}`;
}

function handleImgError(img) {
  img.onerror = null;
  img.src = SHOE_FALLBACK_SVG;
  img.style.objectFit = 'contain';
  img.style.padding = '20px';
}

function getStock(stock) {
  if (stock === 0) return { text: 'Sin stock',       cls: 'out' };
  if (stock <= 4) return { text: `¡Solo ${stock} pares!`, cls: 'low' };
  return { text: 'Disponible', cls: 'in' };
}

function sizesHTML(sizes, available, small = false) {
  if (!sizes || sizes.length === 0) return '';
  const show = small ? sizes.slice(0, 5) : sizes;
  return show.map(s => {
    const na = !available.includes(s);
    return `<span class="sz-chip${na ? ' na' : ''}">${s}</span>`;
  }).join('') + (small && sizes.length > 5 ? '<span class="sz-chip" style="color:var(--c-text-4)">+</span>' : '');
}

function svgSearch() {
  return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;
}

// ============================================================
// RENDERIZADO: PRODUCT CARD
// ============================================================
function renderCard(p) {
  const stock = getStock(p.stock);
  return `
<article class="product-card" data-id="${p.id}">
  <div class="pc-img-wrap">
    <img src="${p.image}" alt="${p.name}" class="pc-img" loading="lazy" onerror="handleImgError(this)">
    <div class="pc-badges">
      ${p.discount > 0 ? `<span class="badge badge-disc">-${p.discount}%</span>` : ''}
      ${p.isNew ? `<span class="badge badge-new">NUEVO</span>` : ''}
      ${p.stock <= 4 && p.stock > 0 ? `<span class="badge badge-low">¡Últimos!</span>` : ''}
    </div>
    <button class="pc-wish" aria-label="Guardar" onclick="event.stopPropagation()">♡</button>
  </div>
  <div class="pc-body">
    <p class="pc-brand">${p.brand}</p>
    <h3 class="pc-name">${p.name}</h3>
    <div class="pc-color">
      <span class="color-dot" style="background:${p.colorHex}"></span>${p.color}
    </div>
    <div class="pc-sizes">${sizesHTML(p.sizes ? p.sizes.slice(0, 5) : [], p.availableSizes, true)}</div>
    <div class="pc-prices">
      <span class="pc-price">${formatPrice(p.price)}</span>
      ${p.oldPrice ? `<span class="pc-old">${formatPrice(p.oldPrice)}</span>` : ''}
      ${p.discount > 0 && p.oldPrice ? `<span class="pc-save">−S/ ${(p.oldPrice - p.price).toFixed(2)}</span>` : ''}
    </div>
    <p class="pc-stock ${stock.cls}">${stock.text}</p>
    <div class="pc-actions">
      <button class="btn-add" onclick="event.stopPropagation(); App.quickAdd(event,${p.id})">
        LO QUIERO
      </button>
    </div>
  </div>
</article>`;
}

// ============================================================
// RENDERIZADO: HOME
// ============================================================
function renderHome() {
  const featured = mockShoes.filter(p => p.isFeatured).slice(0, 8);
  const offers = mockShoes.filter(p => p.isOffer && p.discount > 0).slice(0, 4);

  return `
<!-- ═══ HERO COMERCIAL ═══ -->
<section class="hero-banner" aria-label="Campaña de calzado KABUTT">
  <div class="hero-text-side">
    <span class="hero-promo-tag">Nueva Colección 2026</span>
    <h1 class="hero-title">Zapatos de cuero,<br>mocasines y botines</h1>
    <p class="hero-subtitle">Calzado de cuero genuino para hombre y mujer. Diseño clásico y contemporáneo fabricado en Perú.</p>
    <div class="hero-promo-block">
      <span class="hero-promo-pct">50% OFF</span>
      <div class="hero-promo-txt">
        <strong>Descuento en modelos seleccionados</strong>
        Hasta agotar stock · Temporada de liquidación
      </div>
    </div>
    <div class="hero-actions">
      <a href="#catalogo" class="btn btn-primary btn-lg">Comprar ahora</a>
      <a href="#catalogo?tipo=ofertas" class="btn btn-outline btn-lg">Ver ofertas</a>
    </div>
  </div>
  <div class="hero-img-side">
    <img src="${HERO_IMAGE}" alt="Colección de zapatos de cuero KABUTT 2026" class="hero-img" onerror="handleImgError(this)">
    <div class="hero-badge">
      <div class="hb-text">
        <span class="hb-title">Envío gratis desde S/ 150</span>
        <span class="hb-sub">A todo el Perú en 2 a 5 días</span>
      </div>
    </div>
  </div>
</section>

<!-- ═══ BENEFICIOS — Franja horizontal sin cajitas ═══ -->
<div class="benefits-strip">
  <div class="benefits-strip-inner">
    <div class="benefit-col">
      <p class="benefit-title">Envíos a todo el Perú</p>
      <p class="benefit-desc">Recibe tu pedido en 2 a 5 días hábiles.</p>
    </div>
    <div class="benefit-col">
      <p class="benefit-title">Cambios fáciles</p>
      <p class="benefit-desc">Cambio de talla o color según disponibilidad.</p>
    </div>
    <div class="benefit-col">
      <p class="benefit-title">Pago seguro</p>
      <p class="benefit-desc">Aceptamos tarjetas, Yape y Plin.</p>
    </div>
    <div class="benefit-col">
      <p class="benefit-title">Stock actualizado</p>
      <p class="benefit-desc">Productos disponibles en tiempo real.</p>
    </div>
  </div>
</div>

<!-- ═══ CATEGORÍAS ═══ -->
<section class="categories-section">
  <div class="container">
    <div class="section-header">
      <div>
        <p class="section-eyebrow">Colecciones</p>
        <h2 class="section-title">Compra por categoría</h2>
      </div>
      <a href="#catalogo" class="section-link">Ver todo →</a>
    </div>
    <div class="categories-grid">
      ${shoeCategories.map(c => `
        <a href="#catalogo?categoria=${c.id}" class="category-card">
          <img src="${c.image}" alt="${c.name}" class="cat-img" loading="lazy" onerror="handleImgError(this)">
          <div class="cat-overlay">
            <span class="cat-name">${c.name}</span>
            <span class="cat-count">${c.count} modelos</span>
          </div>
        </a>`).join('')}
    </div>
  </div>
</section>

<!-- ═══ PRODUCTOS DESTACADOS ═══ -->
<section class="products-section">
  <div class="container">
    <div class="section-header">
      <div>
        <p class="section-eyebrow">Más buscados</p>
        <h2 class="section-title">Productos destacados</h2>
      </div>
      <a href="#catalogo" class="section-link">Ver catálogo →</a>
    </div>
    <div class="product-grid animate-in">
      ${featured.map(renderCard).join('')}
    </div>
  </div>
</section>

<!-- ═══ FRANJA EDITORIAL ═══ -->
<section class="editorial-strip" aria-label="Colección ejecutiva">
  <img src="${EDITORIAL_IMAGE}" alt="Zapato de cuero KABUTT para oficina y reuniones" class="editorial-img" loading="lazy" onerror="handleImgError(this)">
  <div class="editorial-content">
    <p class="editorial-eyebrow">Colección Ejecutiva</p>
    <h2 class="editorial-title">Para la oficina,<br>reuniones y el día a día</h2>
    <p class="editorial-desc">Cuero genuino de primera calidad. Diseño atemporal que combina con cualquier outfit formal o casual.</p>
    <a href="#catalogo?categoria=vestir" class="editorial-btn">Explorar colección</a>
  </div>
</section>


<!-- ═══ OFERTAS ═══ -->
<section class="section-bg-gray">
  <div class="container">
    <div class="section-header">
      <div>
        <p class="section-eyebrow">Descuentos</p>
        <h2 class="section-title">Ofertas de temporada</h2>
        <p class="section-subtitle">Hasta 50% en modelos seleccionados, hasta agotar stock</p>
      </div>
      <a href="#catalogo?tipo=ofertas" class="section-link">Ver todas</a>
    </div>
    <div class="product-grid animate-in">
      ${offers.map(renderCard).join('')}
    </div>
  </div>
</section>`;
}

// ============================================================
// CATÁLOGO — Estado reactivo
// ============================================================
const CatalogState = {
  search: '',
  category: '',
  gender: '',
  sort: 'destacados',
  offers: false,
  priceMin: 0,
  priceMax: 600,
  sizes: [],
  modalOpen: false,
};

function filteredProducts() {
  let list = [...mockShoes];
  const q = CatalogState.search.trim().toLowerCase();
  if (q) list = list.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.color.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  if (CatalogState.category)
    list = list.filter(p => p.category === CatalogState.category);
  if (CatalogState.gender && CatalogState.gender !== 'todos')
    list = list.filter(p => p.gender === CatalogState.gender || p.gender === 'unisex');
  if (CatalogState.offers)
    list = list.filter(p => p.discount > 0);
  list = list.filter(p => p.price >= CatalogState.priceMin && p.price <= CatalogState.priceMax);
  if (CatalogState.sizes.length > 0)
    list = list.filter(p => CatalogState.sizes.some(s => p.availableSizes.includes(s)));

  switch (CatalogState.sort) {
    case 'precio-asc':   list.sort((a, b) => a.price - b.price); break;
    case 'precio-desc':  list.sort((a, b) => b.price - a.price); break;
    case 'descuento':    list.sort((a, b) => b.discount - a.discount); break;
    case 'nuevos':       list.sort((a, b) => (+b.isNew) - (+a.isNew)); break;
    default:             list.sort((a, b) => (+b.isFeatured) - (+a.isFeatured));
  }
  return list;
}

function filterSidebarHTML() {
  const allSizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
  const cats = [
    { id: '', label: 'Todas' },
    { id: 'vestir',    label: 'Zapatos de Vestir' },
    { id: 'mocasin',   label: 'Mocasines' },
    { id: 'botin',     label: 'Botines' },
    { id: 'zapatilla', label: 'Zapatillas' },
    { id: 'sandalia',  label: 'Sandalias' },
  ];
  return `
<p class="filter-title">Filtros</p>
<div class="filter-group">
  <p class="filter-group-title">Categoría</p>
  ${cats.map(c => `
    <label class="filter-option">
      <input type="radio" name="fcat" value="${c.id}" ${CatalogState.category===c.id?'checked':''} onchange="App.setFilter('category','${c.id}')">
      ${c.label}
    </label>`).join('')}
</div>
<div class="filter-group">
  <p class="filter-group-title">Género</p>
  ${[['','Todos'],['hombre','Hombre'],['mujer','Mujer'],['unisex','Unisex']].map(([v,l])=>`
    <label class="filter-option">
      <input type="radio" name="fgen" value="${v}" ${CatalogState.gender===v?'checked':''} onchange="App.setFilter('gender','${v}')">
      ${l}
    </label>`).join('')}
</div>
<div class="filter-group">
  <p class="filter-group-title">Tallas</p>
  <div class="filter-sizes">
    ${allSizes.map(s=>`
      <div class="fsz${CatalogState.sizes.includes(s)?' active':''}" onclick="App.toggleSize(${s})">${s}</div>
    `).join('')}
  </div>
</div>
<div class="filter-group">
  <p class="filter-group-title">Precio</p>
  <div class="price-inputs">
    <input class="p-input" type="number" value="${CatalogState.priceMin}" min="0" placeholder="Mín" onchange="App.setFilter('priceMin',this.value)">
    <span style="color:var(--c-text-4)">—</span>
    <input class="p-input" type="number" value="${CatalogState.priceMax}" min="0" placeholder="Máx" onchange="App.setFilter('priceMax',this.value)">
  </div>
  <p style="font-size:11px;color:var(--c-text-4);margin-top:6px">S/ ${CatalogState.priceMin} — S/ ${CatalogState.priceMax}</p>
</div>
<div class="filter-group">
  <p class="filter-group-title">Descuentos</p>
  <label class="filter-option">
    <input type="checkbox" ${CatalogState.offers?'checked':''} onchange="App.setFilter('offers',this.checked)">
    Solo con descuento
  </label>
</div>
<button class="btn btn-outline btn-sm btn-full" style="margin-top:4px" onclick="App.clearFilters()">Limpiar filtros</button>`;
}

function renderCatalog(params = {}) {
  if (params.categoria) CatalogState.category = params.categoria;
  if (params.genero)    CatalogState.gender = params.genero;
  if (params.tipo === 'ofertas') CatalogState.offers = true;
  if (params.tipo === 'outlet')  CatalogState.category = 'outlet';

  const products = filteredProducts();

  const chips = [];
  if (CatalogState.category) chips.push({ label: CatalogState.category, action: `App.setFilter('category','')` });
  if (CatalogState.gender)   chips.push({ label: CatalogState.gender,   action: `App.setFilter('gender','')` });
  if (CatalogState.offers)   chips.push({ label: 'Con descuento',        action: `App.setFilter('offers',false)` });
  CatalogState.sizes.forEach(s => chips.push({ label: `T.${s}`, action: `App.toggleSize(${s})` }));

  return `
<div class="catalog-page">
  <div class="container">
    <div class="page-breadcrumb">
      <a href="#home">Inicio</a> <span>/</span>
      <span style="color:var(--c-text)">Catálogo${CatalogState.category ? ' / '+CatalogState.category : ''}</span>
    </div>

    <div class="catalog-hdr">
      <label class="catalog-search">
        ${svgSearch()}
        <input type="text" placeholder="Buscar marca, modelo o color..."
          value="${CatalogState.search}" id="cat-search"
          oninput="App.setFilter('search',this.value)">
      </label>
      <button class="mobile-filter-btn" onclick="App.openModal()">
        ⚙ Filtros${chips.length > 0 ? ' ('+chips.length+')' : ''}
      </button>
      <div class="catalog-sort">
        <label>Ordenar:</label>
        <select onchange="App.setFilter('sort',this.value)">
          <option value="destacados" ${CatalogState.sort==='destacados'?'selected':''}>Destacados</option>
          <option value="nuevos"     ${CatalogState.sort==='nuevos'?'selected':''}>Más nuevos</option>
          <option value="precio-asc" ${CatalogState.sort==='precio-asc'?'selected':''}>Menor precio</option>
          <option value="precio-desc"${CatalogState.sort==='precio-desc'?'selected':''}>Mayor precio</option>
          <option value="descuento"  ${CatalogState.sort==='descuento'?'selected':''}>Mayor descuento</option>
        </select>
      </div>
    </div>

    ${chips.length > 0 ? `<div class="filter-chips">${chips.map(c=>`
      <span class="f-chip" onclick="${c.action}">${c.label} <span>✕</span></span>`).join('')}
    </div>` : ''}

    <div class="catalog-layout">
      <!-- Sidebar desktop -->
      <aside class="filter-sidebar"><div class="filter-sticky">${filterSidebarHTML()}</div></aside>

      <!-- Resultados -->
      <div class="catalog-results">
        <div class="catalog-results-hdr">
          <p class="catalog-count"><strong>${products.length}</strong> productos encontrados</p>
          <div class="gender-pills">
            ${[['', 'Todos'],['hombre','Hombre'],['mujer','Mujer']].map(([v,l])=>`
              <button class="g-pill${CatalogState.gender===(v||'')?' active':''}" onclick="App.setFilter('gender','${v}')">${l}</button>`).join('')}
          </div>
        </div>

        ${products.length === 0 ? `
          <div class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>Sin resultados</h3>
            <p>Intenta con otros filtros o términos de búsqueda</p>
            <button class="btn btn-black btn-sm" style="margin-top:var(--sp-lg)" onclick="App.clearFilters()">Limpiar filtros</button>
          </div>` : `
          <div class="product-grid animate-in">${products.map(renderCard).join('')}</div>`}
      </div>
    </div>
  </div>
</div>

<!-- Mobile Filter Modal -->
<div class="filter-modal${CatalogState.modalOpen?' is-open':''}" id="fmodal" onclick="App.closeModal()">
  <div class="filter-panel" onclick="event.stopPropagation()">
    <div class="filter-panel-hdr">
      <h3>Filtros</h3>
      <button onclick="App.closeModal()" style="font-size:20px;color:var(--c-text-3)">✕</button>
    </div>
    <div class="filter-panel-body">${filterSidebarHTML()}</div>
    <div class="filter-panel-foot">
      <button class="btn btn-outline btn-sm" onclick="App.clearFilters()">Limpiar</button>
      <button class="btn btn-black" style="flex:1" onclick="App.closeModal()">Ver ${products.length} productos</button>
    </div>
  </div>
</div>`;
}

// ============================================================
// DETALLE DE PRODUCTO
// ============================================================
let _selectedSize = null;
let _qty = 1;

function renderDetail(id) {
  _selectedSize = null; _qty = 1;
  const p = mockShoes.find(x => x.id === parseInt(id));
  if (!p) return `
    <div class="container" style="padding:var(--sp-3xl) 0;text-align:center">
      <p style="font-size:48px;margin-bottom:var(--sp-lg)">🔍</p>
      <h2 style="font-size:22px;font-weight:700;margin-bottom:var(--sp-xl)">Producto no encontrado</h2>
      <a href="#catalogo" class="btn btn-black">Ver catálogo</a>
    </div>`;

  const imgs = p.images && p.images.length ? p.images : [p.image];
  const st = getStock(p.stock);
  const related = mockShoes.filter(x => x.id !== p.id && x.category === p.category).slice(0, 4);

  return `
<div class="detail-page">
  <div class="container">
    <div class="detail-breadcrumb">
      <a href="#home">Inicio</a> <span>/</span>
      <a href="#catalogo">Catálogo</a> <span>/</span>
      <a href="#catalogo?categoria=${p.category}">${p.category}</a> <span>/</span>
      <span style="color:var(--c-text)">${p.name}</span>
    </div>

    <div class="detail-layout">
      <!-- Galería -->
      <div class="detail-gallery">
        <div class="gallery-main">
          <img id="gal-main" src="${imgs[0]}" alt="${p.name}" class="gallery-main-img" onerror="handleImgError(this)">
        </div>
        <div class="gallery-thumbs">
          ${imgs.map((im,i)=>`
            <div class="gallery-thumb${i===0?' active':''}" onclick="App.selectImg('${im}',this)">
              <img src="${im}" alt="${p.name} ${i+1}" onerror="handleImgError(this)">
            </div>`).join('')}
        </div>
      </div>

      <!-- Info -->
      <div class="detail-info">
        ${p.isNew ? '<span class="badge badge-new" style="margin-bottom:12px;display:inline-flex">NUEVO</span>' : ''}
        <p class="detail-brand">${p.brand}</p>
        <h1 class="detail-name">${p.name}</h1>
        <p class="detail-sku">Ref: ${p.sku}</p>

        <div class="detail-prices">
          <span class="detail-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="detail-old">${formatPrice(p.oldPrice)}</span>` : ''}
          ${p.discount > 0 ? `<span class="detail-save">${p.discount}% OFF</span>` : ''}
        </div>
        ${p.discount > 0 && p.oldPrice ? `<p style="font-size:13px;color:var(--c-red);margin-bottom:var(--sp-lg)">Ahorras S/ ${(p.oldPrice-p.price).toFixed(2)} — ¡Oferta por tiempo limitado!</p>` : ''}

        <div class="detail-sep"></div>

        <p class="detail-lbl">Color: ${p.color}</p>
        <div style="margin-bottom:var(--sp-lg)">
          <span class="color-dot" style="background:${p.colorHex};width:20px;height:20px;border-radius:50%;display:inline-block;border:2px solid var(--c-gray-border)"></span>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <p class="detail-lbl" style="margin-bottom:0">Talla</p>
          <a href="#" style="font-size:12px;color:var(--c-brown);font-weight:600">Guía de tallas →</a>
        </div>
        <div class="size-opts" id="detail-sizes">
          ${p.sizes.map(s=>`
            <button class="sz-opt${!p.availableSizes.includes(s)?' na':''}"
              data-size="${s}" ${!p.availableSizes.includes(s)?'disabled':''}
              onclick="App.pickSize(this,${s})">${s}</button>`).join('')}
        </div>
        <p id="size-err" style="font-size:12px;color:var(--c-red);margin-top:6px;display:none">⚠ Selecciona una talla para continuar</p>

        <div class="detail-sep"></div>

        <div style="display:flex;align-items:center;gap:var(--sp-xl);margin-bottom:var(--sp-lg)">
          <div>
            <p class="detail-lbl">Cantidad</p>
            <div class="qty-wrap">
              <button class="qty-btn" onclick="App.changeQty(-1)">−</button>
              <span class="qty-val" id="detail-qty">1</span>
              <button class="qty-btn" onclick="App.changeQty(1)">+</button>
            </div>
          </div>
          <div>
            <p class="detail-lbl">Estado</p>
            <p class="pc-stock ${st.cls}">${st.text}</p>
          </div>
        </div>

        <div class="detail-cta">
          <button class="btn btn-black btn-lg" onclick="App.addToCartDetail(${p.id})" style="flex:1.5">
            🛒 Agregar al carrito
          </button>
          <button class="btn btn-brown btn-lg" onclick="App.buyNow(${p.id})" style="flex:1">
            Comprar ya
          </button>
        </div>

        <div class="detail-sep"></div>
        <p class="detail-lbl">Descripción</p>
        <p class="detail-desc">${p.description}</p>

        <div class="detail-specs" style="margin-top:var(--sp-xl)">
          ${[
            ['Material',    p.material],
            ['Suela',       p.sole],
            ['Plantilla',   p.insole],
            ['Horma',       p.lastType],
            ['Género',      p.gender],
            ['Categoría',   p.category],
            ['Garantía',    '30 días por defectos de fabricación'],
            ['SKU',         p.sku],
          ].map(([l,v])=>`
            <div class="spec-row">
              <span class="spec-lbl">${l}</span>
              <span class="spec-val" style="text-transform:capitalize">${v}</span>
            </div>`).join('')}
        </div>

        <div style="display:flex;gap:var(--sp-lg);margin-top:var(--sp-xl);flex-wrap:wrap">
          <span style="font-size:12px;color:var(--c-text-3)">🚚 Envío a todo el Perú</span>
          <span style="font-size:12px;color:var(--c-text-3)">🔄 Cambios en 30 días</span>
          <span style="font-size:12px;color:var(--c-text-3)">🔒 Pago seguro</span>
        </div>
      </div>
    </div>

    ${related.length > 0 ? `
    <div style="margin-top:var(--sp-3xl)">
      <h2 class="section-title" style="margin-bottom:var(--sp-xl)">También te puede interesar</h2>
      <div class="product-grid">${related.map(renderCard).join('')}</div>
    </div>` : ''}
  </div>
</div>`;
}

// ============================================================
// CARRITO
// ============================================================
function renderCart() {
  const items = KabuttCart.items;
  const subtotal = KabuttCart.getTotal();
  const shipping = subtotal >= 150 ? 0 : 15;

  if (items.length === 0) return `
    <div class="cart-page">
      <div class="container">
        <h1 class="section-title" style="margin-bottom:var(--sp-xl)">Mi carrito</h1>
        <div class="empty-cart">
          <div class="empty-icon">🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega tus zapatos favoritos para continuar</p>
          <a href="#catalogo" class="btn btn-black">Explorar catálogo</a>
        </div>
      </div>
    </div>`;

  return `
<div class="cart-page">
  <div class="container">
    <div class="page-breadcrumb">
      <a href="#home">Inicio</a> <span>/</span>
      <span style="color:var(--c-text)">Mi carrito</span>
    </div>
    <h1 class="section-title" style="margin-bottom:var(--sp-xl)">
      Mi carrito <span style="font-weight:400;font-size:16px;color:var(--c-text-3)">(${KabuttCart.getCount()} artículos)</span>
    </h1>

    <div class="cart-layout">
      <!-- Items -->
      <div class="cart-items">
        ${items.map(item => `
          <div class="cart-item">
            <div class="cart-img-wrap">
              <img src="${item.image}" alt="${item.name}" class="cart-img" onerror="handleImgError(this)">
            </div>
            <div class="cart-info">
              <p class="cart-name">${item.name}</p>
              <p class="cart-meta">${item.brand} · Talla ${item.size} · ${item.color}</p>
              <div class="cart-controls">
                <div class="qty-wrap">
                  <button class="qty-btn" onclick="App.cartQty(${item.productId},'${item.size}',${item.quantity-1})">−</button>
                  <span class="qty-val">${item.quantity}</span>
                  <button class="qty-btn" onclick="App.cartQty(${item.productId},'${item.size}',${item.quantity+1})">+</button>
                </div>
                <span class="cart-price">${formatPrice(item.price * item.quantity)}</span>
                <button class="cart-remove" onclick="App.removeCart(${item.productId},'${item.size}')">Eliminar</button>
              </div>
            </div>
          </div>`).join('')}
        <div style="margin-top:var(--sp-xl)">
          <a href="#catalogo" class="btn btn-outline btn-sm">← Seguir comprando</a>
        </div>
      </div>

      <!-- Resumen -->
      <div class="cart-summary">
        <h3 class="sum-title">Resumen del pedido</h3>
        <div class="sum-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="sum-row">
          <span>Envío</span>
          <span class="${shipping===0?'free-ship':''}">${shipping===0?'GRATIS 🎉':formatPrice(shipping)}</span>
        </div>
        ${shipping > 0 ? `<p style="font-size:12px;color:var(--c-text-3);padding:4px 0">Agrega S/ ${(150-subtotal).toFixed(2)} más para envío gratis</p>` : ''}
        <div class="sum-row total"><span>Total</span><span>${formatPrice(subtotal + shipping)}</span></div>
        <div class="sum-cta">
          <button class="btn btn-black btn-lg btn-full" onclick="alert('✅ Redirigiendo al checkout...')">
            🔒 Finalizar pedido
          </button>
          <a href="#catalogo" class="btn btn-outline btn-full" style="text-align:center">Seguir comprando</a>
        </div>
        <div style="margin-top:var(--sp-lg);display:flex;flex-direction:column;gap:5px">
          <p style="font-size:12px;color:var(--c-text-3)">🔒 Pago 100% seguro</p>
          <p style="font-size:12px;color:var(--c-text-3)">🔄 Cambios en 30 días</p>
          <p style="font-size:12px;color:var(--c-text-3)">🚚 Envío gratis desde S/ 150</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

// ============================================================
// CONTROLADOR PRINCIPAL (App)
// ============================================================
const App = {
  // ── Navegación ──
  navigate(hash) {
    const content = document.getElementById('page-content');
    if (!content) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    content.style.opacity = '0';
    setTimeout(() => {
      const [route, qs] = (hash || '').replace(/^#/, '').split('?');
      const params = {};
      if (qs) qs.split('&').forEach(p => { const [k,v] = p.split('='); params[decodeURIComponent(k)] = decodeURIComponent(v||''); });

      if (route === 'catalogo' && !qs) {
        Object.assign(CatalogState, { search:'', category:'', gender:'', sort:'destacados', offers:false, priceMin:0, priceMax:600, sizes:[], modalOpen:false });
      }

      let html = '';
      switch (route) {
        case 'home': case '': html = renderHome(); break;
        case 'catalogo': html = renderCatalog(params); break;
        case 'producto':  html = renderDetail(params.id); break;
        case 'carrito':   html = renderCart(); break;
        default:          html = renderHome();
      }

      content.innerHTML = html;
      content.style.opacity = '1';
      content.style.transition = 'opacity 0.2s ease';
    }, 90);
  },

  // ── Carrito rápido ──
  quickAdd(e, id) {
    e.preventDefault();
    const p = mockShoes.find(x => x.id === id);
    if (!p || !p.availableSizes.length) { KabuttCart.showToast('Sin stock disponible'); return; }
    KabuttCart.add(id, p.availableSizes[0]);
  },

  // ── Detalle ──
  pickSize(btn, size) {
    document.querySelectorAll('#detail-sizes .sz-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    _selectedSize = size;
    const err = document.getElementById('size-err');
    if (err) err.style.display = 'none';
  },
  changeQty(delta) {
    _qty = Math.max(1, Math.min(10, _qty + delta));
    const el = document.getElementById('detail-qty');
    if (el) el.textContent = _qty;
  },
  selectImg(src, thumb) {
    const main = document.getElementById('gal-main');
    if (main) main.src = src;
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  },
  addToCartDetail(id) {
    if (!_selectedSize) {
      const err = document.getElementById('size-err');
      if (err) err.style.display = 'block';
      return;
    }
    KabuttCart.add(id, _selectedSize, _qty);
  },
  buyNow(id) {
    if (!_selectedSize) {
      const err = document.getElementById('size-err');
      if (err) err.style.display = 'block';
      return;
    }
    KabuttCart.add(id, _selectedSize, _qty);
    window.location.hash = '#carrito';
  },

  // ── Catálogo filtros ──
  setFilter(key, val) {
    if (key === 'offers')    CatalogState.offers = Boolean(val);
    else if (key === 'priceMin') CatalogState.priceMin = parseInt(val) || 0;
    else if (key === 'priceMax') CatalogState.priceMax = parseInt(val) || 600;
    else CatalogState[key] = val;
    this._reRenderCatalog();
  },
  toggleSize(s) {
    const i = CatalogState.sizes.indexOf(s);
    if (i >= 0) CatalogState.sizes.splice(i, 1);
    else CatalogState.sizes.push(s);
    this._reRenderCatalog();
  },
  clearFilters() {
    Object.assign(CatalogState, { search:'', category:'', gender:'', sort:'destacados', offers:false, priceMin:0, priceMax:600, sizes:[], modalOpen:false });
    this._reRenderCatalog();
  },
  openModal()  { CatalogState.modalOpen = true;  this._reRenderCatalog(); },
  closeModal() { CatalogState.modalOpen = false; this._reRenderCatalog(); },
  _reRenderCatalog() {
    const c = document.getElementById('page-content');
    if (c) c.innerHTML = renderCatalog();
  },

  // ── Carrito acciones ──
  cartQty(id, size, qty) {
    KabuttCart.updateQty(id, size, qty);
    const c = document.getElementById('page-content');
    if (c) c.innerHTML = renderCart();
  },
  removeCart(id, size) {
    KabuttCart.remove(id, size);
    const c = document.getElementById('page-content');
    if (c) c.innerHTML = renderCart();
  },

  // ── Init ──
  init() {
    KabuttCart.init();
    this.navigate(window.location.hash || '#home');
    window.addEventListener('hashchange', () => this.navigate(window.location.hash));

    // Hamburger
    document.getElementById('hamburger-btn')?.addEventListener('click', () =>
      document.getElementById('mobile-menu').classList.add('is-open'));
    document.getElementById('mob-close')?.addEventListener('click', () =>
      document.getElementById('mobile-menu').classList.remove('is-open'));
    document.getElementById('mobile-menu')?.addEventListener('click', function(e) {
      if (e.target === this) this.classList.remove('is-open');
    });

    // Mobile nav close on click
    document.querySelectorAll('.mobile-nav-link').forEach(l =>
      l.addEventListener('click', () =>
        document.getElementById('mobile-menu')?.classList.remove('is-open'))
    );

    // Search
    document.getElementById('search-toggle')?.addEventListener('click', () => {
      const bar = document.getElementById('search-bar');
      bar.classList.toggle('is-open');
      if (bar.classList.contains('is-open')) document.getElementById('main-search')?.focus();
    });
    document.getElementById('search-close')?.addEventListener('click', () =>
      document.getElementById('search-bar')?.classList.remove('is-open'));
    document.getElementById('main-search')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) { CatalogState.search = q; window.location.hash = '#catalogo'; }
      }
    });

    // Cart button
    document.getElementById('cart-btn')?.addEventListener('click', () => {
      window.location.hash = '#carrito';
    });

    // Product card click → detail
    document.getElementById('page-content')?.addEventListener('click', e => {
      const addBtn = e.target.closest('.btn-add');
      if (addBtn) return;
      const card = e.target.closest('.product-card');
      if (card?.dataset.id) window.location.hash = `#producto?id=${card.dataset.id}`;
    });

    // Scroll to top button
    const st = document.createElement('button');
    st.className = 'scroll-top'; st.innerHTML = '↑'; st.setAttribute('aria-label', 'Volver arriba');
    st.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(st);
    window.addEventListener('scroll', () => st.classList.toggle('visible', window.scrollY > 400));
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
