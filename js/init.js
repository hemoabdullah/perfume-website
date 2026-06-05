// Auto-load products from products-data.json into localStorage.
// Always sync from JSON to ensure data stays up to date.
async function initializeProducts() {
    const STORAGE_KEY = 'timelessScentProductsV4';

    try {
        const response = await fetch('./products-data.json?v=' + Date.now());
        if (response.ok) {
            const products = await response.json();
            if (products && products.length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
                refreshProductViews();
            }
        }
    } catch (error) {
        console.log('Products data not found, using localStorage fallback.');
    }
}

function refreshProductViews() {
    if (document.getElementById('featuredGrid') && typeof loadFeaturedProducts === 'function') {
        loadFeaturedProducts();
    }

    if (document.getElementById('productsGrid') && typeof loadAllProducts === 'function') {
        loadAllProducts();
    }

    if (document.getElementById('productContainer') && typeof loadProductDetail === 'function') {
        loadProductDetail();
    }

    if (document.getElementById('relatedGrid') && typeof loadRelatedProducts === 'function') {
        loadRelatedProducts();
    }
}

document.addEventListener('DOMContentLoaded', initializeProducts);
