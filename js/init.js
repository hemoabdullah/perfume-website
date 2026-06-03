// Auto-load products from products-data.json into localStorage on first visit
async function initializeProducts() {
    const STORAGE_KEY = 'perfectscentProducts';
    const existingProducts = localStorage.getItem(STORAGE_KEY);

    // Only load if no products exist yet
    if (!existingProducts) {
        try {
            const response = await fetch('./products-data.json');
            if (response.ok) {
                const products = await response.json();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
                console.log('✓ Products loaded automatically!');
            }
        } catch (error) {
            console.log('Products data not found, will load from admin panel');
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeProducts);
