// State management with Local Storage persistence
const initialState = {
  products: [
    { id: 1, name: 'عینک آفتابی مدل A', price: 450000, category: 'sunglasses', liked: false },
    { id: 2, name: 'عینک طبی مدل B', price: 350000, category: 'optical', liked: false },
    { id: 3, name: 'عینک ورزشی مدل C', price: 520000, category: 'sports', liked: false },
    { id: 4, name: 'عینک خلبانی مدل D', price: 480000, category: 'aviator', liked: false },
    { id: 5, name: 'عینک گرد مدل E', price: 420000, category: 'round', liked: false },
    { id: 6, name: 'عینک مد روز مدل F', price: 390000, category: 'trendy', liked: false },
  ],
  cart: [],
  favorites: [],
  selectedFilters: [],
};

const state = loadStateFromLocalStorage();

// Local Storage functions
function loadStateFromLocalStorage() {
  try {
    const savedState = localStorage.getItem('cheshman-state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        ...initialState,
        products: initialState.products.map(product => {
          const savedProduct = parsed.products.find(p => p.id === product.id);
          return savedProduct ? { ...product, ...savedProduct } : product;
        }),
        cart: parsed.cart || [],
        favorites: parsed.favorites || [],
        selectedFilters: parsed.selectedFilters || [],
      };
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }
  return { ...initialState };
}

function saveStateToLocalStorage() {
  try {
    const stateToSave = {
      products: state.products.map(p => ({ id: p.id, liked: p.liked })),
      cart: state.cart,
      favorites: state.favorites,
      selectedFilters: state.selectedFilters,
    };
    localStorage.setItem('cheshman-state', JSON.stringify(stateToSave));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}

export function getState() {
  return state;
}

export function addToCart(product) {
  const existing = state.cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }
  saveStateToLocalStorage();
}

export function removeFromCart(productId) {
  state.cart = state.cart.filter(p => p.id !== productId);
  saveStateToLocalStorage();
}

export function updateQuantity(productId, quantity) {
  const item = state.cart.find(p => p.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveStateToLocalStorage();
  }
}

export function toggleLike(productId) {
  const product = state.products.find(p => p.id === productId);
  if (product) {
    product.liked = !product.liked;
    
    // Update favorites array
    if (product.liked) {
      if (!state.favorites.find(id => id === productId)) {
        state.favorites.push(productId);
      }
    } else {
      state.favorites = state.favorites.filter(id => id !== productId);
    }
    
    saveStateToLocalStorage();
  }
}

export function addToFavorites(productId) {
  const product = state.products.find(p => p.id === productId);
  if (product && !state.favorites.includes(productId)) {
    state.favorites.push(productId);
    product.liked = true;
    saveStateToLocalStorage();
  }
}

export function removeFromFavorites(productId) {
  state.favorites = state.favorites.filter(id => id !== productId);
  const product = state.products.find(p => p.id === productId);
  if (product) {
    product.liked = false;
    saveStateToLocalStorage();
  }
}

export function getFavorites() {
  return state.products.filter(p => state.favorites.includes(p.id));
}

export function filterProducts(category) {
  if (state.selectedFilters.includes(category)) {
    state.selectedFilters = state.selectedFilters.filter(c => c !== category);
  } else {
    state.selectedFilters.push(category);
  }
  
  saveStateToLocalStorage();
  
  if (state.selectedFilters.length === 0) {
    return state.products;
  }
  
  return state.products.filter(p => state.selectedFilters.includes(p.category));
}

export function getCartTotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function getCartCount() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function clearCart() {
  state.cart = [];
  saveStateToLocalStorage();
}

// Persist state before leaving page
window.addEventListener('beforeunload', () => {
  saveStateToLocalStorage();
});

