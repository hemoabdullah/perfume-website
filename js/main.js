// ============================================
// MAIN JAVASCRIPT - PERFUME WEBSITE
// ============================================

const STORAGE_KEY = 'timelessScentProductsV5';
const WHATSAPP_URL = 'https://wa.me/6289682007177';
const SHOPEE_URL = 'https://shopee.co.id/timelessscent__';

const translations = {
    en: {
        nav_home: "Home",
        nav_products: "Collection",
        nav_contact: "Contact",
        hero_title: "Timeless Scent",
        hero_sub: "Where Luxury Meets Fragrance",
        hero_cta: "Explore Collection",
        feat_title: "Featured Masterpieces",
        view_product: "View Scent",
        order_now: "Order Now",
        notes_top: "Top Notes",
        notes_heart: "Heart Notes",
        notes_base: "Base Notes",
        why_us: "The Craftsmanship",
        why_desc: "Each bottle is a sensory journey crafted with world-class ingredients.",
        footer_text: "Luxury fragrances for the discerning soul.",
        search_placeholder: "Search for your scent..."
    },
    ar: {
        nav_home: "الرئيسية",
        nav_products: "المجموعة",
        nav_contact: "اتصل بنا",
        hero_title: "تايمليس سينت",
        hero_sub: "حيث تلتقي الفخامة بالعطر",
        hero_cta: "استكشف المجموعة",
        feat_title: "روائع مختارة",
        view_product: "اكتشف العطر",
        order_now: "اطلب الآن",
        notes_top: "قمة العطر",
        notes_heart: "قلب العطر",
        notes_base: "قاعدة العطر",
        why_us: "الحرفية العالية",
        why_desc: "كل زجاجة هي رحلة حسية مصممة بأرقى المكونات العالمية.",
        footer_text: "عطور فاخرة للنفوس الراقية.",
        search_placeholder: "ابحث عن عطرك..."
    }
};

let currentLang = localStorage.getItem('ts_lang') || 'en';

function t(key) {
    return translations[currentLang][key] || key;
}

// Helper to translate tags and keywords (e.g. "Warm • Tobacco")
function translateTag(str) {
    if (!str) return '';
    return str.split(' • ').map(word => {
        const key = word.toLowerCase().trim();
        return t(key);
    }).join(' • ');
}

function toggleLanguage() {
    const langs = ['en', 'id', 'ar'];
    let nextIndex = (langs.indexOf(currentLang) + 1) % langs.length;
    setLanguage(langs[nextIndex]);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ts_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang.toUpperCase();
    location.reload();
}

// Get products from localStorage
function getProducts() {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}

// Load featured products on home page
function loadFeaturedProducts() {
    const products = getProducts();
    const featuredGrid = document.getElementById('featuredGrid');
    const emptyState = featuredGrid.querySelector('.empty-state');

    if (products.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Show specific featured perfumes: AEON, Qessah, Scandal
    const featuredIds = ['perfume_aeon', 'perfume_qessah', 'perfume_scandal'];
    const featured = products.filter(p => featuredIds.includes(p.id));
    featuredGrid.innerHTML = '';

    featured.forEach((product, index) => {
        const card = createProductCard(product, index);
        featuredGrid.appendChild(card);
    });

    // Trigger scroll animations
    observeElements();
}

// Load all products on products page
function loadAllProducts() {
    const products = getProducts();
    const productsGrid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');

    if (products.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    productsGrid.innerHTML = '';

    products.forEach((product, index) => {
        const card = createProductCard(product, index);
        productsGrid.appendChild(card);
    });

    // Trigger scroll animations
    observeElements();
}

// Create product card element
function createProductCard(product, index = 0) {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
        <div class="product-image">
            <img src="${encodeURI(product.image)}" alt="${product.name}" loading="lazy" onerror="console.error('Image not found:', this.src); this.src='img/placeholder.png'; this.onerror=null;">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-character">${translateTag(product.scent_character)}</p>
            <a href="product.html?id=${product.id}" class="btn btn-primary">${t('view_details')}</a>
        </div>
    `;
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            window.location.href = `product.html?id=${product.id}`;
        }
    });
    return card;
}

// Navigate to product details page
function viewProductDetails(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Load product details page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('productContainer').innerHTML = '<p>Product not found.</p>';
        return;
    }

    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.getElementById('productContainer').innerHTML = '<p>Product not found.</p>';
        return;
    }

    const topNotes = product.top_notes && product.top_notes.length ? product.top_notes : ['Coming soon'];
    const heartNotes = product.heart_notes && product.heart_notes.length ? product.heart_notes : ['Coming soon'];
    const baseNotes = product.base_notes && product.base_notes.length ? product.base_notes : ['Coming soon'];
    const whatsappLink = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi Timeless Scent! I'm interested in ${product.name}`)}`;

    document.title = `${product.name} — Timeless Scent`;

    const detailHTML = `
        <div class="product-hero reveal">
            <img src="${encodeURI(product.image)}" alt="${product.name}" loading="lazy" onerror="console.error('Detail image missing:', this.src); this.src='img/placeholder.png'; this.onerror=null;">
        </div>

        <div class="product-details">
            <h1 class="product-detail-title reveal">${product.name}</h1>
            <p class="product-detail-character reveal">${translateTag(product.scent_character)}</p>

            <div class="fragrance-notes reveal">
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>${t('notes_top')}</h4>
                    </div>
                    <div class="notes-list">
                        ${topNotes.map(note => `<span class="note-tag">${t(note.toLowerCase().trim())}</span>`).join('')}
                    </div>
                </div>
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>${t('notes_heart')}</h4>
                    </div>
                    <div class="notes-list">
                        ${heartNotes.map(note => `<span class="note-tag">${t(note.toLowerCase().trim())}</span>`).join('')}
                    </div>
                </div>
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>${t('notes_base')}</h4>
                    </div>
                    <div class="notes-list">
                        ${baseNotes.map(note => `<span class="note-tag">${t(note.toLowerCase().trim())}</span>`).join('')}
                    </div>
                </div>
            </div>

            ${product.description ? `
            <div class="product-section reveal">
                <h3>${t('why_love')}</h3>
                <p>${product.description}</p>
            </div>
            ` : ''}

            ${product.story ? `
            <div class="product-section reveal">
                <h3>${t('story')}</h3>
                <p>${product.story}</p>
            </div>
            ` : ''}

            <div class="order-section reveal">
                <div class="order-options">
                    <div class="order-option">
                        <h4>${t('order_shopee')}</h4>
                        <a href="${SHOPEE_URL}" target="_blank" class="btn btn-primary">${t('shop_now')}</a>
                    </div>
                    <div class="order-option">
                        <h4>${t('special_price')}</h4>
                        <a href="${whatsappLink}" target="_blank" class="btn btn-secondary">
                            <span style="margin-right: 8px;">💬</span> ${t('message_us')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('productContainer').innerHTML = detailHTML;

    // Trigger animations
    observeElements();
}

// Load related products
function loadRelatedProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const products = getProducts();

    // Filter out current product and get up to 3 related products
    const related = products.filter(p => p.id !== productId).slice(0, 3);

    const relatedGrid = document.getElementById('relatedGrid');
    if (related.length === 0) {
        relatedGrid.innerHTML = '<p class="empty-state" style="grid-column: 1/-1;">No other products available.</p>';
        return;
    }

    relatedGrid.innerHTML = '';
    related.forEach((product, index) => {
        const card = createProductCard(product, index);
        relatedGrid.appendChild(card);
    });

    observeElements();
}

// Generate unique ID
function generateId() {
    return 'perfume_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Convert image to base64
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function observeElements() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// Run on page load for static elements
document.addEventListener('DOMContentLoaded', () => {
    // Apply direction for RTL
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = currentLang.toUpperCase();

    // Translate static homepage elements
    const translateMap = {
        '.hero-subtitle': 'hero_subtitle',
        '.hero-description': 'hero_desc',
        '.hero-buttons .btn-primary': 'explore',
        '.hero-buttons .btn-secondary': 'get_touch',
        '.brand-intro .section-title': 'our_craft',
        '.brand-text': 'brand_text',
        '.feature:nth-child(1) h3': 'quality',
        '.feature:nth-child(1) p': 'quality_desc',
        '.feature:nth-child(2) h3': 'artisan',
        '.feature:nth-child(2) p': 'artisan_desc',
        '.feature:nth-child(3) h3': 'luxury',
        '.feature:nth-child(3) p': 'luxury_desc',
        '.cta-section h2': 'cta_title',
        '.cta-section p': 'cta_desc',
        '.btn-large': 'view_all',
        '.footer-section p': 'footer_tagline',
        '.back-link': 'back_home',
        '.empty-state p': 'empty_products',
        '.footer-section:nth-child(2) h3': 'quick_links',
        '.footer-section:nth-child(3) h3': 'connect',
        '.page-header h1': 'get_in_touch', // Default for contact
        '.page-header p': 'we_love_hear',
        '.contact-info h2': 'connect',
        '.contact-info p': 'connect_desc',
        '.contact-method:nth-child(1) p': 'email_desc',
        '.contact-method:nth-child(2) p': 'whatsapp_desc',
        '.contact-method:nth-child(3) p': 'insta_desc',
        '.contact-method:nth-child(4) p': 'shopee_desc',
        '.contact-method:nth-child(5) p': 'special_desc',
        '.social-icon:nth-child(1)': 'social_insta',
        '.social-icon:nth-child(2)': 'social_shop',
        '.social-icon:nth-child(3)': 'social_wa',
        '.contact-method:nth-child(1) h3': 'email_label',
        '.contact-method:nth-child(2) h3': 'whatsapp_label',
        '.contact-method:nth-child(3) h3': 'insta_label',
        '.contact-method:nth-child(4) h3': 'order_now_q',
        '.contact-method:nth-child(5) h3': 'special_price_q'
    };

    // Specific overrides for Products page header
    if (window.location.pathname.includes('products.html')) {
        const h1 = document.querySelector('.page-header h1');
        const p = document.querySelector('.page-header p');
        if (h1) h1.textContent = t('our_collection');
        if (p) p.textContent = t('discover_curated');
    }

    for (const [selector, key] of Object.entries(translateMap)) {
        const el = document.querySelector(selector);
        if (el) el.textContent = t(key);
    }

    // Translate Static Navbar/Footer
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 3) {
        navLinks[0].textContent = t('home');
        navLinks[1].textContent = t('products');
        navLinks[2].textContent = t('contact');
    }

    const featTitle = document.querySelector('.featured-products .section-title');
    if (featTitle) featTitle.textContent = t('featured');

    document.querySelectorAll('.feature, .contact-method, .section-title, .brand-text, .hero-content, .cta-section').forEach(el => {
        el.classList.add('reveal');
    });

    observeElements();
});
