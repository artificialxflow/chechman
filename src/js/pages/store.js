import { createTitle, createSubtitle, createCard, createButton, createBottomNavigation, createHeader, createMobileHeader, createMobileMenu } from '../components.js';
import { getState, toggleLike, addToCart, filterProducts, getCartCount } from '../store.js';
import { renderPage } from '../router.js';

export function createStorePage() {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-32 md:pb-12';
  container.dir = 'rtl';
  
  // Header (Desktop)
  const desktopHeader = createHeader();
  container.appendChild(desktopHeader);
  
  // Mobile Header + Menu
  const mobileHeader = createMobileHeader();
  container.appendChild(mobileHeader);
  
  const mobileMenu = createMobileMenu();
  container.appendChild(mobileMenu);
  
  // Main Content
  const main = document.createElement('main');
  main.className = 'pt-24 md:pt-32 px-4 md:px-8';
  main.dir = 'rtl';
  
  // Header
  const header = document.createElement('div');
  header.className = 'mb-8 flex justify-between items-center max-w-7xl mx-auto';
  
  const title = createTitle('فروشگاه عینک');
  title.className = 'title-neo text-4xl md:text-5xl';
  header.appendChild(title);
  
  const cartBadge = document.createElement('span');
  cartBadge.className = 'bg-pink-scream text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center border-2 border-pink-600';
  cartBadge.setAttribute('aria-label', `سبد خریدتان دارای ${getCartCount()} محصول است`);
  cartBadge.textContent = getCartCount();
  header.appendChild(cartBadge);
  
  main.appendChild(header);
  
  // Filter Section
  const filterSection = document.createElement('div');
  filterSection.className = 'mb-8 p-6 md:p-8 bg-white rounded-lg shadow-md max-w-7xl mx-auto';
  filterSection.dir = 'rtl';
  
  const filterTitle = createSubtitle('فیلتر بر اساس دسته');
  filterTitle.className = 'subtitle-neo text-2xl md:text-3xl mb-6';
  filterSection.appendChild(filterTitle);
  
  const categories = ['sunglasses', 'optical', 'sports', 'aviator', 'round', 'trendy'];
  const categoryLabels = {
    'sunglasses': 'عینک آفتابی',
    'optical': 'عینک طبی',
    'sports': 'عینک ورزشی',
    'aviator': 'عینک خلبانی',
    'round': 'عینک گرد',
    'trendy': 'عینک مد روز'
  };
  
  const filterContainer = document.createElement('div');
  filterContainer.className = 'flex flex-wrap gap-3';
  filterContainer.dir = 'rtl';
  
  categories.forEach(cat => {
    const filterBtn = document.createElement('button');
    filterBtn.className = 'px-4 py-2 md:px-6 md:py-3 border-2 border-gray-300 bg-white text-gray-700 font-bold cursor-pointer rounded hover:border-pink-scream hover:text-pink-scream transition-all duration-200';
    filterBtn.setAttribute('aria-label', `فیلتر کنید: ${categoryLabels[cat]}`);
    filterBtn.textContent = categoryLabels[cat];
    filterBtn.addEventListener('click', () => {
      filterBtn.classList.toggle('bg-pink-scream');
      filterBtn.classList.toggle('text-white');
      filterBtn.classList.toggle('border-pink-scream');
      filterProducts(cat);
      renderProducts(container);
    });
    filterContainer.appendChild(filterBtn);
  });
  
  filterSection.appendChild(filterContainer);
  main.appendChild(filterSection);
  
  // Products Grid
  renderProducts(container, main);
  
  container.appendChild(main);
  
  // Bottom Navigation (Mobile Only)
  const bottomNav = createBottomNavigation('store');
  container.appendChild(bottomNav);
  
  return container;
}

function renderProducts(container, mainContainer) {
  let productsGrid = container.querySelector('.products-grid');
  if (!productsGrid) {
    productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-7xl mx-auto px-4 md:px-0';
    productsGrid.dir = 'rtl';
    mainContainer.appendChild(productsGrid);
  }
  
  const state = getState();
  const products = state.selectedFilters.length === 0 ? state.products : state.products.filter(p => state.selectedFilters.includes(p.category));
  
  productsGrid.innerHTML = '';
  
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'card-neo flex flex-col justify-between cursor-pointer hover:shadow-flat-black-thick transition-all duration-300 bg-white rounded-lg border-0 shadow-md';
    card.style.animationDelay = `${index * 50}ms`;
    card.dir = 'rtl';
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${product.name} - ${product.price.toLocaleString('fa-IR')} تومان`);
    
    const header = document.createElement('div');
    header.className = 'flex justify-between items-start mb-4';
    header.dir = 'rtl';
    
    const name = document.createElement('h3');
    name.className = 'font-bold text-sm md:text-base flex-1';
    name.textContent = product.name;
    header.appendChild(name);
    
    const likeBtn = document.createElement('button');
    likeBtn.className = 'text-2xl cursor-pointer bg-none border-none transition-transform duration-200 hover:scale-125';
    likeBtn.setAttribute('aria-label', product.liked ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی');
    likeBtn.textContent = product.liked ? '❤️' : '🤍';
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(product.id);
      likeBtn.textContent = product.liked ? '🤍' : '❤️';
    });
    header.appendChild(likeBtn);
    
    card.appendChild(header);
    
    const price = document.createElement('p');
    price.className = 'text-xl md:text-2xl font-black text-pink-scream mb-4';
    price.textContent = `${product.price.toLocaleString('fa-IR')} تومان`;
    card.appendChild(price);
    
    const addBtn = createButton('افزودن به سبد', () => {
      addToCart(product);
      alert('محصول به سبد خریدتان اضافه شد!');
    }, 'btn-primary text-white w-full text-sm md:text-base');
    
    card.appendChild(addBtn);
    
    productsGrid.appendChild(card);
  });
}
