// Application Configuration

export const CONFIG = {
  // Colors
  colors: {
    primary: '#FF10F0',
    secondary: '#FFD700',
    accent: '#32CD32',
    dark: '#000000',
    light: '#FFFFFF',
  },

  // API Configuration (for future use)
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 10000,
  },

  // Pagination
  pagination: {
    pageSize: 12,
  },

  // Messages
  messages: {
    addedToCart: 'محصول به سبد خریدتان اضافه شد!',
    removedFromCart: 'محصول از سبد حذف شد!',
    liked: 'به علاقه‌مندی‌هایتان اضافه شد!',
    unliked: 'از علاقه‌مندی‌هایتان حذف شد!',
    orderConfirmed: 'سفارش شما تایید شد!',
    error: 'خطایی رخ داد. دوباره تلاش کنید.',
  },

  // Storage Keys
  storage: {
    cart: 'cheshman_cart',
    user: 'cheshman_user',
    preferences: 'cheshman_preferences',
  },

  // Product Categories
  categories: [
    { id: 'sunglasses', label: 'عینک آفتابی', icon: '😎' },
    { id: 'optical', label: 'عینک طبی', icon: '👓' },
    { id: 'sports', label: 'عینک ورزشی', icon: '🏃' },
    { id: 'aviator', label: 'عینک خلبانی', icon: '✈️' },
    { id: 'round', label: 'عینک گرد', icon: '⭕' },
    { id: 'trendy', label: 'عینک مد روز', icon: '✨' },
  ],

  // Lens Types
  lensTypes: [
    'عادی',
    'ضد نور آبی',
    'ضد خراش',
    'رنگی',
    'کاهش وزن',
    'دوچشمی',
  ],

  // Features
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enablePWA: true,
    enableOfflineMode: false,
  },
};

export default CONFIG;
