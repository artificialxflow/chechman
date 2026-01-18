import '../css/style.css';
import { initApp } from './router.js';
import { initBottomNav } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  initApp(app);
  initBottomNav();
});
