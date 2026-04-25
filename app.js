// Common Application Logic

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  setupNavigation();
  setupSidebar();
  
  // Specific page logic based on body class or ID
  const bodyId = document.body.id;
  
  if (bodyId === 'page-home') {
    renderFeaturedProducts();
  } else if (bodyId === 'page-products') {
    renderAllProducts();
    setupSearch();
  } else if (bodyId === 'page-cart') {
    renderCart();
  } else if (bodyId === 'page-compare') {
    setupCompare();
  } else if (bodyId === 'page-sell') {
    setupFileUpload();
  }
});

// Toast Notification System
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = type === 'success' ? `<i class="fa-solid fa-circle-check"></i> ${message}` : message;
  document.body.appendChild(toast);
  
  toast.offsetWidth; // Force reflow
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Sidebar Logic
function setupSidebar() {
  const hamburger = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (!hamburger || !sidebar) return;
  
  function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  }
  
  hamburger.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', toggleSidebar);
}

// Global Modal Logic
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

// Cart Logic
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    localStorage.setItem('saf_cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`${product.name} added to cart!`);
  }
}

function removeFromCart(index) {
  const removedName = cart[index].name;
  cart.splice(index, 1);
  localStorage.setItem('saf_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`${removedName} removed`, 'default');
  if (document.body.id === 'page-cart') {
    renderCart();
  }
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.innerText = cart.length;
    b.style.display = cart.length > 0 ? 'inline-flex' : 'none';
  });
}

function processCheckout() {
  if (cart.length === 0) return;
  showToast("Processing payment...", "default");
  setTimeout(() => {
    cart = [];
    localStorage.setItem('saf_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    showToast("Order placed successfully! Thank you.", "success");
  }, 1500);
}

// Navigation active state
function setupNavigation() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item, .sidebar-link');
  navItems.forEach(item => {
    if (currentPath.includes(item.getAttribute('href'))) {
      item.classList.add('active');
    }
  });
}

// --- Home & Products Logic ---
function renderFeaturedProducts() {
  const container = document.getElementById('featured-grid');
  if (!container) return;
  const featured = products.filter(p => p.featured);
  container.innerHTML = featured.map(p => `
    <a href="product-detail.html?id=${p.id}" class="product-card">
      <div class="product-img-wrapper"><img src="${p.image}" alt="${p.name}"></div>
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">$${p.price}</div>
      <button class="btn btn-outline" style="width: 100%; margin-top: auto;" onclick="event.preventDefault(); addToCart(${p.id})">Add to Cart</button>
    </a>
  `).join('');
}

function renderAllProducts(filterText = '') {
  const container = document.getElementById('products-grid');
  if (!container) return;
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(filterText.toLowerCase()) || 
    p.brand.toLowerCase().includes(filterText.toLowerCase())
  );
  container.innerHTML = filtered.map(p => `
    <a href="product-detail.html?id=${p.id}" class="product-card">
      <div class="product-img-wrapper"><img src="${p.image}" alt="${p.name}"></div>
      <div class="product-brand" style="background:var(--bg-color); display:inline-block; padding:2px 8px; border-radius:4px;">${p.condition}</div>
      <div class="product-name" style="margin-top: 8px;">${p.name}</div>
      <div class="product-price">$${p.price}</div>
      <button class="btn btn-primary" style="width: 100%; margin-top: auto;" onclick="event.preventDefault(); addToCart(${p.id})">
        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
      </button>
    </a>
  `).join('');
}

function setupSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', (e) => renderAllProducts(e.target.value));
}

// --- Cart Logic ---
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  if (!container || !totalEl) return;
  
  if (cart.length === 0) {
    container.innerHTML = '<div class="section-light text-center" style="border-radius:12px;"><p class="text-secondary" style="padding: 40px 0;">Your cart is currently empty. <br><br> <a href="products.html" class="btn btn-primary">Start Shopping</a></p></div>';
    totalEl.innerText = '$0.00';
    subtotalEl.innerText = '$0.00';
    return;
  }
  
  let total = 0;
  container.innerHTML = cart.map((p, index) => {
    total += p.price;
    return `
      <div class="list-item-card">
        <div class="list-item-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="list-item-info">
          <div class="list-item-title">${p.name}</div>
          <div class="list-item-price">$${p.price.toFixed(2)}</div>
        </div>
        <div>
          <button class="icon-btn text-danger" onclick="removeFromCart(${index})" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    `;
  }).join('');
  
  subtotalEl.innerText = `$${total.toFixed(2)}`;
  totalEl.innerText = `$${total.toFixed(2)}`;
  
  // Attach checkout logic to button
  const checkoutBtn = document.getElementById('checkout-btn');
  if(checkoutBtn) checkoutBtn.onclick = processCheckout;
}

// --- Sell Phone File Upload Logic ---
function setupFileUpload() {
  const fileInput = document.getElementById('device-photos');
  const previewContainer = document.getElementById('upload-preview');
  if (!fileInput || !previewContainer) return;

  fileInput.addEventListener('change', function() {
    previewContainer.innerHTML = ''; // Clear existing
    const files = Array.from(this.files).slice(0, 5); // Max 5 photos
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'upload-thumbnail';
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
}

// --- Dynamic Compare Logic ---
let compareList = [];

function setupCompare() {
  // Pre-fill with a couple devices if empty just for demo purposes
  if(compareList.length === 0 && products.length > 1) {
    compareList = [products[0], products[1]];
  }
  renderCompareTable();
  renderCompareModalList();
}

function openCompareModal() {
  openModal('compareModal');
}

function addToCompare(productId) {
  if (compareList.length >= 4) {
    showToast("You can only compare up to 4 devices.", "default");
    closeModal('compareModal');
    return;
  }
  const product = products.find(p => p.id === productId);
  if (product && !compareList.find(p => p.id === productId)) {
    compareList.push(product);
    renderCompareTable();
    showToast(`${product.name} added to comparison.`);
  }
  closeModal('compareModal');
}

function removeFromCompare(index) {
  compareList.splice(index, 1);
  renderCompareTable();
}

function renderCompareModalList() {
  const container = document.getElementById('modal-device-list');
  if (!container) return;
  container.innerHTML = products.map(p => `
    <div class="list-item-card" onclick="addToCompare(${p.id})" style="padding: 8px;">
      <div class="list-item-img" style="width:40px; height:40px;"><img src="${p.image}"></div>
      <div class="list-item-info"><div class="list-item-title" style="font-size:0.9rem;">${p.name}</div></div>
      <button class="icon-btn text-primary"><i class="fa-solid fa-plus"></i></button>
    </div>
  `).join('');
}

function renderCompareTable() {
  const container = document.getElementById('compare-table-container');
  if (!container) return;
  
  if (compareList.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 40px;"><p class="text-secondary mb-3">No devices selected for comparison.</p><button class="btn btn-primary" onclick="openCompareModal()">Add a Device</button></div>`;
    return;
  }

  // Build the dynamic columns based on array length
  let headers = `<th>Specifications</th>`;
  let rowPrices = `<td>Price</td>`;
  let rowScreens = `<td>Display Screen</td>`;
  let rowChips = `<td>Processor</td>`;
  let rowCams = `<td>Camera System</td>`;
  let rowBats = `<td>Battery & Power</td>`;
  
  compareList.forEach((p, idx) => {
    headers += `
      <th style="min-width: 200px;">
        <button class="icon-btn text-danger" style="position:absolute; top:8px; right:8px;" onclick="removeFromCompare(${idx})"><i class="fa-solid fa-times"></i></button>
        <img src="${p.image}" style="height: 100px; display: block; margin: 0 auto 12px;">
        <div style="font-size: 1.1rem; color: var(--text-primary);">${p.name}</div>
      </th>
    `;
    rowPrices += `<td class="text-primary text-bold" style="font-size: 1.1rem;">$${p.price}</td>`;
    rowScreens += `<td>${p.specs.screen}</td>`;
    rowChips += `<td>${p.specs.chip}</td>`;
    rowCams += `<td>${p.specs.camera}</td>`;
    rowBats += `<td>${p.specs.battery}</td>`;
  });

  // Inject table
  container.innerHTML = `
    <table class="data-table">
      <thead><tr>${headers}</tr></thead>
      <tbody>
        <tr>${rowPrices}</tr>
        <tr>${rowScreens}</tr>
        <tr>${rowChips}</tr>
        <tr>${rowCams}</tr>
        <tr>${rowBats}</tr>
      </tbody>
    </table>
  `;
}
