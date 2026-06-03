// ============================================
// MAIN JAVASCRIPT - PERFUME WEBSITE
// ============================================

const STORAGE_KEY = 'perfectscentProducts';

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

    // Display first 3 products as featured
    const featured = products.slice(0, 3);
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
            <p class="product-character">${product.scent_character}</p>
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

    const detailHTML = `
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
                        <div class="notes-list">
                            ${product.top_notes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                        </div>
                    </div>
                    <div class="notes-category">
                        <h4>Heart Notes</h4>
                        <div class="notes-list">
                            ${product.heart_notes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                        </div>
                    </div>
                    <div class="notes-category">
                        <h4>Base Notes</h4>
                        <div class="notes-list">
                            ${product.base_notes.map(note => `<span class="note-tag">${note}</span>`).join('')}
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
                    <h3>Order Now</h3>
                    <p>Ready to experience this luxurious scent? Reach out to us through any of our contact channels.</p>
                    <div class="order-buttons">
                        <a href="https://wa.me/?text=Hi%20Timeless%20Scent%21%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}" target="_blank" class="btn btn-primary">Message on WhatsApp</a>
                        <a href="mailto:hello@timelessscent.com?subject=Inquiry%20about%20${encodeURIComponent(product.name)}" class="btn btn-secondary">Email Us</a>
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
