// ============================================
// ADMIN PANEL JAVASCRIPT
// ============================================

const STORAGE_KEY = 'timelessScentProductsV4';

// Get products from localStorage
function getProducts() {
    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}

// Save products to localStorage
function saveProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); // This line was already correct in the context
    } catch (e) {
        showMessage('Storage full! Please delete some products or use smaller images.', 'error');
    }
}

// Handle product form submission
async function handleAddProduct(event) {
    event.preventDefault();

    const fileInput = document.getElementById('productImage');
    const file = fileInput.files[0];

    if (!file) {
        showMessage('Please select an image', 'error');
        return;
    }

    try {
        const imageBase64 = await compressImage(file, 800);

        const product = {
            id: generateId(),
            name: document.getElementById('productName').value,
            image: imageBase64,
            scent_character: document.getElementById('scentCharacter').value,
            top_notes: document.getElementById('topNotes').value.split(',').map(n => n.trim()),
            heart_notes: document.getElementById('heartNotes').value.split(',').map(n => n.trim()),
            base_notes: document.getElementById('baseNotes').value.split(',').map(n => n.trim()),
            description: document.getElementById('description').value,
            story: document.getElementById('story').value,
        };

        const products = getProducts();
        products.push(product);
        saveProducts(products);

        // Reset form
        document.getElementById('productForm').reset();
        showMessage('Product added successfully!', 'success');

        // Reload products list
        loadProductsList();
    } catch (error) {
        showMessage('Error adding product: ' + error.message, 'error');
    }
}

// Load products list in admin
function loadProductsList() {
    const products = getProducts();
    const productsList = document.getElementById('productsList');

    if (products.length === 0) {
        productsList.innerHTML = '<p class="empty-state">No products yet. Add your first perfume!</p>';
        return;
    }

    productsList.innerHTML = '';

    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <span class="product-item-name">${product.name}</span>
            <div class="product-item-actions">
                <button onclick="editProduct('${product.id}')" class="edit">Edit</button>
                <button onclick="deleteProduct('${product.id}')" class="delete">Delete</button>
            </div>
        `;
        productsList.appendChild(item);
    });
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = getProducts();
        const filtered = products.filter(p => p.id !== productId);
        saveProducts(filtered);
        loadProductsList();
        showMessage('Product deleted successfully!', 'success');
    }
}

// Edit product (populate form with existing data)
function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    document.getElementById('productName').value = product.name;
    document.getElementById('scentCharacter').value = product.scent_character;
    document.getElementById('topNotes').value = product.top_notes.join(', ');
    document.getElementById('heartNotes').value = product.heart_notes.join(', ');
    document.getElementById('baseNotes').value = product.base_notes.join(', ');
    document.getElementById('description').value = product.description;
    document.getElementById('story').value = product.story;

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update form to be an update instead of add
    const form = document.getElementById('productForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Update Product';

    // Store the ID for update
    form.dataset.editId = productId;

    // Override submit handler
    form.onsubmit = async (e) => {
        e.preventDefault();
        await handleUpdateProduct(productId);
    };
}

// Handle product update
async function handleUpdateProduct(productId) {
    const fileInput = document.getElementById('productImage');
    const file = fileInput.files[0];
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    // Update with new image if provided
    if (file) {
        try {
            const imageBase64 = await compressImage(file, 800);
            product.image = imageBase64;
        } catch (error) {
            showMessage('Error processing image: ' + error.message, 'error');
            return;
        }
    }

    // Update other fields
    product.name = document.getElementById('productName').value;
    product.scent_character = document.getElementById('scentCharacter').value;
    product.top_notes = document.getElementById('topNotes').value.split(',').map(n => n.trim());
    product.heart_notes = document.getElementById('heartNotes').value.split(',').map(n => n.trim());
    product.base_notes = document.getElementById('baseNotes').value.split(',').map(n => n.trim());
    product.description = document.getElementById('description').value;
    product.story = document.getElementById('story').value;

    saveProducts(products);

    // Reset form to add mode
    document.getElementById('productForm').reset();
    document.getElementById('productForm').onsubmit = handleAddProduct;
    const submitBtn = document.getElementById('productForm').querySelector('button[type="submit"]');
    submitBtn.textContent = 'Add Product';

    showMessage('Product updated successfully!', 'success');
    loadProductsList();
}

// Export products as JSON
function exportProducts() {
    const products = getProducts();
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'perfume_products_backup.json';
    link.click();
    showMessage('Products exported successfully!', 'success');
}

// Import products from JSON
function importProducts(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedProducts = JSON.parse(e.target.result);
            if (!Array.isArray(importedProducts)) {
                throw new Error('Invalid format: expected an array');
            }
            saveProducts(importedProducts);
            loadProductsList();
            showMessage(`${importedProducts.length} products imported successfully!`, 'success');
        } catch (error) {
            showMessage('Error importing products: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

// Clear all products
function clearAllProducts() {
    if (confirm('Are you sure you want to delete ALL products? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        loadProductsList();
        showMessage('All products cleared!', 'success');
    }
}

// Show message to user
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'error' ? '#c1272d' : '#D4AF37';
    messageDiv.style.marginTop = '15px';
    messageDiv.style.padding = '10px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '700';

    setTimeout(() => {
        messageDiv.textContent = '';
    }, 5000);
}

// Generate unique ID
function generateId() {
    return 'perfume_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Compress and convert image to base64
function compressImage(file, maxWidth) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scaleFactor = maxWidth / img.width;
                if (scaleFactor < 1) {
                    canvas.width = maxWidth;
                    canvas.height = img.height * scaleFactor;
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Using 0.7 quality for a good balance of clarity and file size
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
        };
        reader.onerror = reject;
    });
}
