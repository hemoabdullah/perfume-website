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
    const featuredIds = ['perfume_aeon', 'perfume_qeessah', 'perfume_scanda'];
    const featured = products.filter(p => featuredIds.includes(p.id));
    featuredGrid.innerHTML = '';

    featured.forEach(product => {
        const card = createProductCard(product);
        featuredGrid.appendChild(card);
    });
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

    products.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-character">${product.scent_character || 'Fragrance profile coming soon'}</p>
            <button onclick="viewProductDetails('${product.id}')" class="btn btn-primary">View Details</button>
        </div>
    `;
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

    const detailHTML = `
        <div class="product-container">
            <div class="product-hero">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h1 class="product-detail-title">${product.name}</h1>
                <p class="product-detail-character">${product.scent_character || 'Fragrance profile coming soon'}</p>

                <div class="fragrance-notes">
                    <div class="notes-category">
                        <h4>Top Notes</h4>
                        <div class="notes-list">
                            ${topNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                        </div>
                    </div>
                    <div class="notes-category">
                        <h4>Heart Notes</h4>
                        <div class="notes-list">
                            ${heartNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                        </div>
                    </div>
                    <div class="notes-category">
                        <h4>Base Notes</h4>
                        <div class="notes-list">
                            ${baseNotes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                        </div>
                    </div>
                </div>

                ${product.description ? `
                <div class="product-section">
                    <h3>About This Fragrance</h3>
                    <p>${product.description}</p>
                </div>
                ` : ''}

                ${product.story ? `
                <div class="product-section">
                    <h3>The Story</h3>
                    <p>${product.story}</p>
                </div>
                ` : ''}

                <div class="product-section">
                    <h3>Why You'll Love It</h3>
                    <p>Each fragrance in our collection is crafted with the finest ingredients, blended to perfection by master perfumers. Experience luxury with every spray.</p>
                </div>

                <div class="product-section">
                    <div class="order-options">
                        <div class="order-option">
                            <h4>Order now?</h4>
                            <a href="${SHOPEE_URL}" target="_blank" class="btn btn-primary">Shopee</a>
                        </div>
                        <div class="order-option">
                            <h4>Special Price?</h4>
                            <a href="${whatsappLink}" target="_blank" class="btn btn-secondary">Whatsapp</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('productContainer').innerHTML = detailHTML;
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
    related.forEach(product => {
        const card = createProductCard(product);
        relatedGrid.appendChild(card);
    });
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

.logo {
    /* existing styles */
}
.logo:hover {
    /* existing styles */
}
/* Hero logo removed */

/* Premium Divider */
.premium-divider {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: var(--primary-color);
    position: relative;
    text-align: center;
    margin: 30px 0;
    letter-spacing: 2px;
}
.premium-divider::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
    opacity: 0.6;
    transform: translateY(-50%);
    z-index: -1;
}

/* Product Card – wider frame and glass‑morphism */
.product-card {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    transition: var(--transition);
    backdrop-filter: blur(8px);
}
.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}
.product-image img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 4px;
}

/* Buttons – wider */
.btn {
    min-width: 150px;
    padding: 12px 20px;
    font-size: 0.95rem;
}

/* Product Detail – centered large image */
.product-hero {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}
.product-hero img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
}
