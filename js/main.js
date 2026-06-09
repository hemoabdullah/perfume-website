// ============================================
// CORE FUNCTIONALITY - RESTORED
// ============================================

const STORAGE_KEY = 'timelessScentProductsV4';
const WHATSAPP_URL = 'https://wa.me/6289682007177';
const SHOPEE_URL = 'https://shopee.co.id/timelessscent__';

function getProducts() {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
        </div>
    `;
    return card;
}

function loadFeaturedProducts() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    const products = getProducts();
    const featured = products.slice(0, 3);
    grid.innerHTML = '';
    featured.forEach(p => grid.appendChild(createProductCard(p)));
}

function loadAllProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    const products = getProducts();
    grid.innerHTML = '';
    products.forEach(p => grid.appendChild(createProductCard(p)));
}

function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const products = getProducts();
    const product = products.find(p => p.id === id);
    const container = document.getElementById('productContainer');

    if (!product || !container) return;

    const whatsappLink = `${WHATSAPP_URL}?text=Hi Timeless Scent! I'm interested in ${product.name}`;

    container.innerHTML = `
        <div class="product-container">
            <div class="product-hero">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h1 class="product-detail-title">${product.name}</h1>
                <p class="product-detail-character">${product.scent_character}</p>
                
                <div class="fragrance-notes">
                    <div class="notes-category">
                        <h4>Top Notes</h4>
                        <p>${product.top_notes.join(', ')}</p>
                    </div>
                    <div class="notes-category">
                        <h4>Heart Notes</h4>
                        <p>${product.heart_notes.join(', ')}</p>
                    </div>
                    <div class="notes-category">
                        <h4>Base Notes</h4>
                        <p>${product.base_notes.join(', ')}</p>
                    </div>
                </div>

                <div class="product-section">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                
                <div class="order-options">
                    <a href="${SHOPEE_URL}" target="_blank" class="btn btn-primary">Order on Shopee</a>
                    <a href="${whatsappLink}" target="_blank" class="btn btn-secondary">Order via WhatsApp</a>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('featuredGrid')) loadFeaturedProducts();
    if (document.getElementById('productsGrid')) loadAllProducts();
    if (document.getElementById('productContainer')) loadProductDetail();
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}
