import { createTitle, createButton, createBottomNavigation, createHeader, createMobileHeader, createMobileMenu } from '../components.js';
import { getState, toggleLike, addToCart, getFavorites } from '../store.js';

export function createFavoritesPage() {
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
  
  const title = createTitle('علاقه‌مندی‌های من');
  title.className = 'title-neo text-4xl md:text-5xl mb-8';
  main.appendChild(title);
  
  const favorites = getFavorites();
  
  if (favorites.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'text-center py-12 max-w-7xl mx-auto';
    emptyState.innerHTML = `
      <p class="text-2xl md:text-3xl font-bold mb-4">هیچ عینکی علاقه‌مندی نشده است</p>
      <p class="text-gray-600 mb-8 text-lg">عینک‌های مورد علاقه‌ی خود را به این فهرست اضافه کنید</p>
    `;
    main.appendChild(emptyState);
  } else {
    // Favorites Grid
    const favoritesGrid = document.createElement('div');
    favoritesGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 max-w-7xl mx-auto px-4 md:px-0';
    favoritesGrid.dir = 'rtl';
    
    favorites.forEach((product, index) => {
      const card = document.createElement('div');
      card.className = 'flex flex-col justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-pink-scream';
      card.style.animationDelay = `${index * 50}ms`;
      card.dir = 'rtl';
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${product.name} - ${product.price.toLocaleString('fa-IR')} تومان`);
      
      const header = document.createElement('div');
      header.className = 'flex justify-between items-start mb-3';
      header.dir = 'rtl';
      
      const name = document.createElement('h3');
      name.className = 'font-bold text-sm md:text-base flex-1';
      name.textContent = product.name;
      header.appendChild(name);
      
      const likeBtn = document.createElement('button');
      likeBtn.className = 'text-2xl cursor-pointer bg-none border-none transition-transform duration-200 hover:scale-125';
      likeBtn.setAttribute('aria-label', 'حذف از علاقه‌مندی');
      likeBtn.textContent = '❤️';
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(product.id);
        location.reload();
      });
      header.appendChild(likeBtn);
      
      card.appendChild(header);
      
      const price = document.createElement('p');
      price.className = 'text-2xl font-black text-pink-scream mb-4';
      price.textContent = `${product.price.toLocaleString('fa-IR')} تومان`;
      card.appendChild(price);
      
      const addBtn = createButton('افزودن به سبد', () => {
        addToCart(product);
        alert('محصول به سبد خریدتان اضافه شد!');
      }, 'btn-primary text-white w-full text-sm md:text-base');
      
      card.appendChild(addBtn);
      
      favoritesGrid.appendChild(card);
    });
    
    main.appendChild(favoritesGrid);
  }
  
  container.appendChild(main);
  
  // Bottom Navigation (Mobile Only)
  const bottomNav = createBottomNavigation('favorites');
  container.appendChild(bottomNav);
  
  return container;
}
