// ============================================
// CORE FUNCTIONALITY - RESTORED
// ============================================

const STORAGE_KEY = 'timelessScentProductsV4';

function getProducts() {
    try {
        const products = localStorage.getItem(STORAGE_KEY);
        const parsed = products ? JSON.parse(products) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn('Error parsing products from storage:', error);
        return [];
    }
}

function createProductCard(product) {
    try {
        if (!product || !product.id || !product.name || !product.image) {
            return null;
        }

        const card = document.createElement('div');
        card.className = 'product-card';
        const scent = product.scent_character || 'Premium Fragrance';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-character">${scent}</p>
                <a href="product.html?id=${product.id}" class="btn btn-primary" data-i18n="products.viewDetails">View Details</a>
            </div>
        `;
        // Trigger i18n update for this new element
        card.querySelector('[data-i18n]').textContent = i18n.t('products.viewDetails');
        return card;
    } catch (error) {
        console.warn('Error creating product card:', error);
        return null;
    }
}

function loadFeaturedProducts() {
    try {
        const grid = document.getElementById('featuredGrid');
        if (!grid) return;

        const products = getProducts();
        const featured = Array.isArray(products) ? products.slice(0, 3) : [];
        grid.innerHTML = '';

        featured.forEach(p => {
            try {
                const card = createProductCard(p);
                if (card) grid.appendChild(card);
            } catch (e) {
                console.warn('Error rendering featured product:', e);
            }
        });
    } catch (error) {
        console.warn('Error loading featured products:', error);
    }
}

function loadAllProducts() {
    try {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const products = getProducts();
        grid.innerHTML = '';

        if (!Array.isArray(products) || products.length === 0) return;

        products.forEach(p => {
            try {
                const card = createProductCard(p);
                if (card) grid.appendChild(card);
            } catch (e) {
                console.warn('Error rendering product:', e);
            }
        });
    } catch (error) {
        console.warn('Error loading all products:', error);
    }
}

function loadProductDetail() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const products = getProducts();
        const product = products.find(p => p && p.id === id);
        const container = document.getElementById('productContainer');

        if (!product || !container) return;

        const topNotes = Array.isArray(product.top_notes) ? product.top_notes.join(', ') : 'N/A';
        const heartNotes = Array.isArray(product.heart_notes) ? product.heart_notes.join(', ') : 'N/A';
        const baseNotes = Array.isArray(product.base_notes) ? product.base_notes.join(', ') : 'N/A';
        const description = product.description || 'Premium fragrance.';
        const character = product.scent_character || 'Luxury Fragrance';
        const whatsappLink = `${WHATSAPP_URL}?text=Hi Timeless Scent! I'm interested in ${encodeURIComponent(product.name)}`;

        container.innerHTML = `
            <div class="product-container">
                <div class="product-hero">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h1 class="product-detail-title">${product.name}</h1>
                    <p class="product-detail-character">${character}</p>

                    <div class="fragrance-notes">
                        <div class="notes-category">
                            <h4>Top Notes</h4>
                            <p>${topNotes}</p>
                        </div>
                        <div class="notes-category">
                            <h4>Heart Notes</h4>
                            <p>${heartNotes}</p>
                        </div>
                        <div class="notes-category">
                            <h4>Base Notes</h4>
                            <p>${baseNotes}</p>
                        </div>
                    </div>

                    <div class="product-section">
                        <h3>Description</h3>
                        <p>${description}</p>
                    </div>

                    <div class="order-options">
                        <a href="${SHOPEE_URL}" target="_blank" class="btn btn-primary">Order on Shopee</a>
                        <a href="${whatsappLink}" target="_blank" class="btn btn-secondary">Order via WhatsApp</a>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.warn('Error loading product detail:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('featuredGrid')) loadFeaturedProducts();
    if (document.getElementById('productsGrid')) loadAllProducts();
    if (document.getElementById('productContainer')) loadProductDetail();

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function loadRelatedProducts() {
    try {
        const grid = document.getElementById('relatedGrid');
        if (!grid) return;

        const params = new URLSearchParams(window.location.search);
        const currentId = params.get('id');
        const products = getProducts();

        if (!products || products.length === 0) return;

        const related = products.filter(p => p.id !== currentId).slice(0, 3);
        grid.innerHTML = '';

        if (related.length === 0) return;

        related.forEach(p => {
            try {
                if (p && p.id && p.name && p.image) {
                    grid.appendChild(createProductCard(p));
                }
            } catch (e) {
                console.warn('Error rendering related product:', e);
            }
        });
    } catch (error) {
        console.warn('Error loading related products:', error);
    }
}
