// ============================================
// MAIN JAVASCRIPT - PERFUME WEBSITE
// ============================================

const STORAGE_KEY = 'timelessScentProductsV3';
const WHATSAPP_URL = 'https://wa.me/6289682007177';
const SHOPEE_URL = 'https://shopee.co.id/timelessscent__';

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
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-character">${product.scent_character || 'Fragrance profile coming soon'}</p>
            <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
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
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='img/placeholder.png'">
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
                <h3>Why You'll Love It</h3>
                <p>${product.description}</p>
            </div>
            ` : ''}

            ${product.story ? `
            <div class="product-section reveal">
                <h3>The Story</h3>
                <p>${product.story}</p>
            </div>
            ` : ''}

            <div class="order-section reveal">
                <div class="order-options">
                    <div class="order-option">
                        <h4>Order on Shopee</h4>
                        <p>Shop our full collection</p>
                        <a href="${SHOPEE_URL}" target="_blank" class="btn btn-primary">Shop Now</a>
                    </div>
                    <div class="order-option">
                        <h4>WhatsApp Us</h4>
                        <p>Get a special price</p>
                        <a href="${whatsappLink}" target="_blank" class="btn btn-secondary">Message Us</a>
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
    // Add reveal class to static elements
    document.querySelectorAll('.feature, .contact-method, .section-title, .brand-text, .hero-content, .cta-section').forEach(el => {
        el.classList.add('reveal');
    });
    observeElements();
});
