// ============================================
// MAIN JAVASCRIPT - PERFUME WEBSITE
// ============================================

const STORAGE_KEY = 'timelessScentProductsV4';
const WHATSAPP_URL = 'https://wa.me/6289682007177';
const SHOPEE_URL = 'https://shopee.co.id/timelessscent__';

// Translation Dictionary
const translations = {
    en: {
        home: "Home",
        products: "Products",
        contact: "Contact",
        featured: "Featured Collection",
        view_details: "View Details",
        order_shopee: "Order on Shopee",
        shop_now: "Shop Now",
        special_price: "Get a special price",
        message_us: "Message Us",
        why_love: "Why You'll Love It",
        story: "The Story",
        notes_top: "Top Notes",
        notes_heart: "Heart Notes",
        notes_base: "Base Notes"
    },
    id: {
        home: "Beranda",
        products: "Produk",
        contact: "Kontak",
        featured: "Koleksi Unggulan",
        view_details: "Lihat Detail",
        order_shopee: "Pesan di Shopee",
        shop_now: "Beli Sekarang",
        special_price: "Dapatkan Harga Spesial",
        message_us: "Hubungi Kami",
        why_love: "Mengapa Anda Akan Menyukainya",
        story: "Cerita",
        notes_top: "Aroma Pembuka",
        notes_heart: "Aroma Inti",
        notes_base: "Aroma Dasar"
    },
    ar: {
        home: "الرئيسية",
        products: "المنتجات",
        contact: "اتصل بنا",
        featured: "مجموعة مختارة",
        view_details: "عرض التفاصيل",
        order_shopee: "اطلب من شوبي",
        shop_now: "تسوق الآن",
        special_price: "احصل على سعر خاص",
        message_us: "تواصل معنا",
        why_love: "لماذا ستحبه",
        story: "القصة",
        notes_top: "قمة العطر",
        notes_heart: "قلب العطر",
        notes_base: "قاعدة العطر"
    }
};

let currentLang = localStorage.getItem('ts_lang') || 'en';

function t(key) {
    return translations[currentLang][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ts_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
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
            <p class="product-character">${product.scent_character || 'Fragrance profile coming soon'}</p>
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
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="console.error('Detail image missing:', this.src); this.src='img/placeholder.png'; this.onerror=null;">
        </div>

        <div class="product-details">
            <h1 class="product-detail-title reveal">${product.name}</h1>
            <p class="product-detail-character reveal">${product.scent_character || ''}</p>

            <div class="fragrance-notes reveal">
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>Top Notes</h4>
                    </div>
                    <div class="notes-list">
                        ${topNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                    </div>
                </div>
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>Heart Notes</h4>
                    </div>
                    <div class="notes-list">
                        ${heartNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                    </div>
                </div>
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>Base Notes</h4>
                    </div>
                    <div class="notes-list">
                        ${baseNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
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

    // Add reveal class to static elements
    document.querySelectorAll('.feature, .contact-method, .section-title, .brand-text, .hero-content, .cta-section').forEach(el => {
        el.classList.add('reveal');
    });

    // Translate Static Navbar/Footer
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 3) {
        navLinks[0].textContent = t('home');
        navLinks[1].textContent = t('products');
        navLinks[2].textContent = t('contact');
    }

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        if (title.textContent.includes("Featured")) title.textContent = t('featured');
    });

    observeElements();
});
