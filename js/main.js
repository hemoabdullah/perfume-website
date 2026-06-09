// ============================================
// CORE ENGINE - REPAIRED & STABILIZED
// ============================================

const STORAGE_KEY = 'timelessScentProductsV4'; // Kept V4 to preserve your existing data
const WHATSAPP_URL = 'https://wa.me/6288805204080';
const SHOPEE_URL = 'https://shopee.co.id/timelessscent__';

// State Management
let state = {
    lang: localStorage.getItem('ts_lang') || 'en',
    theme: localStorage.getItem('ts_theme') || 'dark'
};

// --- Theme System ---
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('ts_theme', state.theme);
    const body = document.body;
    if (body) body.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
}

// --- Translation System ---
const translations = {
    en: {
        nav_home: "Home", nav_products: "Collection", nav_contact: "Contact", nav_admin: "Admin",
        hero_title: "TIMELESS SCENT", hero_sub: "Where Luxury Meets Fragrance", hero_cta: "Explore Collection",
        feat_title: "Featured Masterpieces", view_details: "View Details", order_now: "Order Now",
        notes_top: "Top Notes", notes_heart: "Heart Notes", notes_base: "Base Notes"
    },
    ar: {
        nav_home: "الرئيسية", nav_products: "المجموعة", nav_contact: "اتصل بنا", nav_admin: "لوحة التحكم",
        hero_title: "تايمليس سينت", hero_sub: "حيث تلتقي الفخامة بالعطر", hero_cta: "استكشف المجموعة",
        feat_title: "روائع مختارة", view_details: "عرض التفاصيل", order_now: "اطلب الآن",
        notes_top: "قمة العطر", notes_heart: "قلب العطر", notes_base: "قاعدة العطر"
    }
};

function t(key) { return translations[state.lang][key] || key; }

function applyLang() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[state.lang][key]) el.textContent = translations[state.lang][key];
    });

    const langToggle = document.getElementById('langToggle');
    if (langToggle) langToggle.textContent = state.lang.toUpperCase();
    localStorage.setItem('ts_lang', state.lang);
}

function toggleLanguage() {
    state.lang = state.lang === 'en' ? 'ar' : 'en';
    applyLang();
    closeSidebar();
}

// --- Navigation Drawer ---
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// --- Product Handling ---
function getProducts() {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='img/placeholder.png'">
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <a href="product.html?id=${product.id}" class="btn btn-primary" data-i18n="view_details">${t('view_details')}</a>
    </div>
  `;
    return card;
}

function loadFeaturedProducts() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    const products = getProducts().slice(0, 3);
    grid.innerHTML = '';
    products.forEach((p, i) => grid.appendChild(createProductCard(p, i)));
    observeElements();
}

function loadAllProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    const products = getProducts();
    grid.innerHTML = '';
    products.forEach((p, i) => grid.appendChild(createProductCard(p, i)));
    observeElements();
}

function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = getProducts().find(p => p.id === id);
    const container = document.getElementById('productContainer');
    if (!product || !container) return;

    container.innerHTML = `
    <div class="product-detail-grid">
      <div class="detail-image reveal"><img src="${product.image}" alt="${product.name}"></div>
      <div class="detail-content reveal">
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <div class="detail-notes">
          <div class="note-item"><h4>${t('notes_top')}</h4><p>${product.top_notes.join(', ')}</p></div>
          <div class="note-item"><h4>${t('notes_heart')}</h4><p>${product.heart_notes.join(', ')}</p></div>
          <div class="note-item"><h4>${t('notes_base')}</h4><p>${product.base_notes.join(', ')}</p></div>
        </div>
        <div style="margin-top:40px; display:flex; gap:15px;">
          <a href="${SHOPEE_URL}" class="btn btn-primary">${t('order_now')}</a>
          <a href="${WHATSAPP_URL}" class="btn btn-outline">WhatsApp</a>
        </div>
      </div>
    </div>
  `;
    observeElements();
}

// --- Scroll Reveal ---
function observeElements() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    applyLang();

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);

    // Setup dynamic loading based on current page
    if (document.getElementById('featuredGrid')) loadFeaturedProducts();
    if (document.getElementById('productsGrid')) loadAllProducts();
    if (document.getElementById('productContainer')) loadProductDetail();
});
