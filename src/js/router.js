import { createLandingPage } from './pages/landing.js';
import { createStorePage } from './pages/store.js';
import { createAdminPage } from './pages/admin.js';
import { createCartPage } from './pages/cart.js';
import { createFavoritesPage } from './pages/favorites.js';

let currentPage = 'landing';

export function initApp(container) {
  renderPage(container, currentPage);
}

export function renderPage(container, page) {
  currentPage = page;
  container.innerHTML = '';
  
  switch (page) {
    case 'landing':
      container.appendChild(createLandingPage());
      break;
    case 'store':
      container.appendChild(createStorePage());
      break;
    case 'admin':
      container.appendChild(createAdminPage());
      break;
    case 'cart':
      container.appendChild(createCartPage());
      break;
    case 'favorites':
      container.appendChild(createFavoritesPage());
      break;
    default:
      container.appendChild(createLandingPage());
  }
}

export function getCurrentPage() {
  return currentPage;
}

