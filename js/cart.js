// ============================================================
// KABUTT ONLINE — Cart Manager
// Estado del carrito con persistencia en localStorage
// ============================================================

const KabuttCart = {
  items: [],
  _toastTimeout: null,

  init() {
    try {
      const saved = localStorage.getItem('kabutt_cart');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch {
      this.items = [];
    }
    this.updateUI();
  },

  save() {
    try {
      localStorage.setItem('kabutt_cart', JSON.stringify(this.items));
    } catch {}
    this.updateUI();
  },

  add(productId, size, quantity = 1) {
    const product = mockShoes.find((p) => p.id === productId);
    if (!product) return false;

    const existingIndex = this.items.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        productId,
        size,
        quantity,
        price: product.price,
        name: product.name,
        brand: product.brand,
        color: product.color,
        image: product.image,
        sku: product.sku,
      });
    }

    this.save();
    this.showToast(`✓ ${product.name} — Talla ${size} agregado`);
    return true;
  },

  remove(productId, size) {
    this.items = this.items.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    this.save();
  },

  updateQty(productId, size, quantity) {
    if (quantity <= 0) {
      this.remove(productId, size);
      return;
    }
    const item = this.items.find(
      (item) => item.productId === productId && item.size === size
    );
    if (item) {
      item.quantity = Math.max(1, Math.min(10, quantity));
      this.save();
    }
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  updateUI() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
      const count = this.getCount();
      countEl.textContent = count;
      countEl.classList.toggle('hidden', count === 0);
    }
  },

  showToast(message) {
    let toast = document.getElementById('kb-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kb-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = message;
    toast.classList.add('is-visible');

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  },
};
