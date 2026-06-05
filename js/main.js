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
        our_collection: "Our Collection",
        discover_curated: "Discover our curated selection of luxury fragrances",
        order_shopee: "Order on Shopee",
        shop_now: "Shop Now",
        special_price: "Get a special price",
        message_us: "Message Us",
        why_love: "Why You'll Love It",
        story: "The Story",
        notes_top: "Top Notes",
        notes_heart: "Heart Notes",
        notes_base: "Base Notes",
        hero_subtitle: "Where Luxury Meets Fragrance",
        hero_desc: "Discover the art of fine perfumery. Each scent tells a story of elegance, sophistication, and timeless beauty.",
        explore: "Explore Products",
        get_touch: "Get in Touch",
        our_craft: "Our Craft",
        brand_text: "At Timeless Scent, we believe that fragrance is more than a scent - it's an experience, a memory, a moment frozen in time.",
        quality: "Premium Quality",
        quality_desc: "Sourced from the finest fragrance suppliers worldwide",
        artisan: "Artisan Crafted",
        artisan_desc: "Carefully blended to perfection by master perfumers",
        luxury: "Luxury Experience",
        luxury_desc: "Designed for those who appreciate the finer things",
        cta_title: "Ready to Experience Luxury?",
        cta_desc: "Browse our complete collection of premium fragrances",
        view_all: "View All Products",
        footer_tagline: "Luxury fragrances for the discerning taste",
        quick_links: "Quick Links",
        connect: "Connect With Us",
        get_in_touch: "Get in Touch",
        we_love_hear: "We'd love to hear from you",
        email_label: "Email",
        whatsapp_label: "WhatsApp",
        insta_label: "Instagram",
        order_now_q: "Order now?",
        special_price_q: "Special price?"
    },
    id: {
        home: "Beranda",
        products: "Produk",
        contact: "Kontak",
        featured: "Koleksi Unggulan",
        view_details: "Lihat Detail",
        our_collection: "Koleksi Kami",
        discover_curated: "Temukan pilihan wewangian mewah kami",
        order_shopee: "Pesan di Shopee",
        shop_now: "Beli Sekarang",
        special_price: "Dapatkan Harga Spesial",
        message_us: "Hubungi Kami",
        why_love: "Mengapa Anda Akan Menyukainya",
        story: "Cerita",
        notes_top: "Aroma Pembuka",
        notes_heart: "Aroma Inti",
        notes_base: "Aroma Dasar",
        hero_subtitle: "Di mana Kemewahan Bertemu Wewangian",
        hero_desc: "Temukan seni pembuatan parfum kelas atas. Setiap aroma menceritakan kisah keanggunan dan keindahan abadi.",
        explore: "Jelajahi Produk",
        get_touch: "Hubungi Kami",
        our_craft: "Keahlian Kami",
        brand_text: "Di Timeless Scent, kami percaya bahwa wewangian lebih dari sekadar aroma - ini adalah pengalaman dan kenangan.",
        quality: "Kualitas Premium",
        quality_desc: "Berasal dari pemasok wewangian terbaik di seluruh dunia",
        artisan: "Buatan Pengrajin",
        artisan_desc: "Dicampur dengan sempurna oleh ahli parfum terkemuka",
        luxury: "Pengalaman Mewah",
        luxury_desc: "Dirancang untuk mereka yang menghargai hal-hal terbaik",
        cta_title: "Siap Merasakan Kemewahan?",
        cta_desc: "Jelajahi koleksi lengkap wewangian premium kami",
        view_all: "Lihat Semua Produk",
        footer_tagline: "Wewangian mewah untuk selera yang cerdas",
        quick_links: "Tautan Cepat",
        connect: "Hubungi Kami",
        get_in_touch: "Hubungi Kami",
        we_love_hear: "Kami senang mendengar dari Anda",
        email_label: "Email",
        whatsapp_label: "WhatsApp",
        insta_label: "Instagram",
        order_now_q: "Pesan sekarang?",
        special_price_q: "Harga spesial?"
    },
    ar: {
        home: "الرئيسية",
        products: "المنتجات",
        contact: "اتصل بنا",
        featured: "مجموعة مختارة",
        view_details: "عرض التفاصيل",
        our_collection: "مجموعتنا",
        discover_curated: "اكتشف مجموعتنا المختارة من العطور الفاخرة",
        order_shopee: "اطلب من شوبي",
        shop_now: "تسوق الآن",
        special_price: "احصل على سعر خاص",
        message_us: "تواصل معنا",
        why_love: "لماذا ستحبه",
        story: "القصة",
        notes_top: "قمة العطر",
        notes_heart: "قلب العطر",
        notes_base: "قاعدة العطر",
        hero_subtitle: "حيث تلتقي الفخامة بالعطر",
        hero_desc: "اكتشف فن العطور الراقية. كل رائحة تحكي قصة من الأناقة والرقي والجمال الخالد.",
        explore: "استكشف المنتجات",
        get_touch: "تواصل معنا",
        our_craft: "حرفتنا",
        brand_text: "في تايمليس سينت، نؤمن أن العطر أكثر من مجرد رائحة - إنه تجربة، وذكرى، ولحظة متوقفة في الزمن.",
        quality: "جودة ممتازة",
        quality_desc: "مستورد من أفضل موردي العطور في العالم",
        artisan: "صناعة حرفية",
        artisan_desc: "مزجت بعناية لتصل إلى الكمال على يد خبراء العطور",
        luxury: "تجربة فاخرة",
        luxury_desc: "مصمم لأولئك الذين يقدرون أرقى الأشياء",
        cta_title: "هل أنت مستعد لتجربة الفخامة؟",
        cta_desc: "تصفح مجموعتنا الكاملة من العطور الفاخرة",
        view_all: "عرض جميع المنتجات",
        footer_tagline: "عطور فاخرة للذوق الرفيع",
        quick_links: "روابط سريعة",
        connect: "تواصل معنا",
        get_in_touch: "اتصل بنا",
        we_love_hear: "يسعدنا السماع منك",
        email_label: "البريد الإلكتروني",
        whatsapp_label: "واتساب",
        insta_label: "إنستغرام",
        order_now_q: "اطلب الآن؟",
        special_price_q: "سعر خاص؟"
    }
};

let currentLang = localStorage.getItem('ts_lang') || 'en';

function t(key) {
    return translations[currentLang][key] || key;
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
            <img src="${encodeURI(product.image)}" alt="${product.name}" loading="lazy" onerror="console.error('Detail image missing:', this.src); this.src='img/placeholder.png'; this.onerror=null;">
        </div>

        <div class="product-details">
            <h1 class="product-detail-title reveal">${product.name}</h1>
            <p class="product-detail-character reveal">${product.scent_character || ''}</p>

            <div class="fragrance-notes reveal">
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>${t('notes_top')}</h4>
                    </div>
                    <div class="notes-list">
                        ${topNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                    </div>
                </div>
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>${t('notes_heart')}</h4>
                    </div>
                    <div class="notes-list">
                        ${heartNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                    </div>
                </div>
                <div class="notes-category">
                    <div class="notes-label">
                        <h4>${t('notes_base')}</h4>
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
        '.footer-section:nth-child(2) h3': 'quick_links',
        '.footer-section:nth-child(3) h3': 'connect',
        '.page-header h1': 'get_in_touch', // Default for contact
        '.page-header p': 'we_love_hear',
        '.contact-info h2': 'connect',
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
