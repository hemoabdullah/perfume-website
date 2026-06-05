// Auto-load products from products-data.json into localStorage on first visit.
async function initializeProducts() {
    const STORAGE_KEY = 'timelessScentProductsV3';
    const existingProducts = localStorage.getItem(STORAGE_KEY);

    if (!existingProducts) {
        try {
            const response = await fetch('./products-data.json');
            if (response.ok) {
                const products = await response.json();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
                console.log('Products loaded automatically.');
                refreshProductViews();
            }
        } catch (error) {
            console.log('Products data not found, will load from admin panel.');
        }
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
