// Auto-load products from products-data.json into localStorage.
// Always sync from JSON to ensure data stays up to date.

// Define missing constants
const WHATSAPP_URL = 'https://wa.me/6289682007177';
const SHOPEE_URL = 'https://shopee.co.id/timelessscent__';

async function initializeProducts() {
    const STORAGE_KEY = 'timelessScentProductsV4';

    // Check if products already exist in localStorage
    const existingProducts = localStorage.getItem(STORAGE_KEY);
    if (existingProducts && JSON.parse(existingProducts).length > 0) {
        return; // Don't overwrite existing user/admin data
    }

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
