import { renderPage } from './router.js';

// Note: renderPage is used in createHeader and createMobileMenu via the import above

export function initBottomNav() {
  const navButtons = document.querySelectorAll('[data-nav]');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = btn.dataset.nav;
      navButtons.forEach(b => b.classList.remove('bg-yellow-canary'));
      btn.classList.add('bg-yellow-canary');
      renderPage(document.getElementById('app'), page);
    });
  });
}

export function createBottomNavigation(activePage = 'landing') {
  const nav = document.createElement('div');
  nav.className = 'fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 flex justify-around items-center h-20 z-40 shadow-md md:hidden';
  nav.style.direction = 'rtl';
  
  const navItems = [
    { icon: '🏠', label: 'خانه', page: 'landing' },
    { icon: '🛍️', label: 'فروشگاه', page: 'store' },
    { icon: '❤️', label: 'علاقه‌مندی', page: 'favorites' },
    { icon: '🛒', label: 'سبد', page: 'cart' },
    { icon: '⚙️', label: 'مدیریت', page: 'admin' },
  ];
  
  navItems.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'flex flex-col items-center gap-1 p-2 flex-1 font-bold cursor-pointer hover:bg-gray-50 transition-all duration-200 rounded';
    btn.setAttribute('aria-label', item.label);
    btn.setAttribute('role', 'button');
    btn.innerHTML = `<span class="text-2xl" aria-hidden="true">${item.icon}</span><span class="text-xs">${item.label}</span>`;
    btn.dataset.nav = item.page;
    
    if (item.page === activePage) {
      btn.style.backgroundColor = '#FF10F0';
      btn.style.color = 'white';
      btn.classList.add('active-nav');
    }
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-nav]').forEach(b => {
        b.style.backgroundColor = '';
        b.style.color = '';
        b.classList.remove('active-nav');
      });
      btn.style.backgroundColor = '#FF10F0';
      btn.style.color = 'white';
      btn.classList.add('active-nav');
      renderPage(document.getElementById('app'), item.page);
    });
    
    nav.appendChild(btn);
  });
  
  return nav;
}

export function createButton(text, onClick, className = '') {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = `btn-neo ${className}`;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

export function createCard(content, className = '') {
  const card = document.createElement('div');
  card.className = `card-neo transition-all duration-200 hover:shadow-flat-black-thick ${className}`;
  if (typeof content === 'string') {
    card.innerHTML = content;
  } else {
    card.appendChild(content);
  }
  return card;
}

export function createAdminSidebar(activePage = 'dashboard') {
  const sidebar = document.createElement('div');
  sidebar.className = 'admin-sidebar fixed right-0 top-0 w-64 h-screen bg-gray-900 border-l-8 border-black text-white p-6 overflow-y-auto transition-transform duration-300 z-40';
  sidebar.id = 'admin-sidebar';
  sidebar.dir = 'rtl';
  
  const sidebarTitle = document.createElement('h2');
  sidebarTitle.className = 'text-2xl font-black mb-8 text-yellow-canary';
  sidebarTitle.textContent = 'پنل مدیریت';
  sidebar.appendChild(sidebarTitle);
  
  const menuItems = [
    { label: 'داشبورد', id: 'dashboard' },
    { label: 'مدیریت محصولات', id: 'products' },
    { label: 'مدیریت انبار', id: 'inventory' },
    { label: 'حسابداری', id: 'accounting' },
    { label: 'سفارشات', id: 'orders' },
  ];
  
  menuItems.forEach(item => {
    const menuBtn = document.createElement('button');
    const isActive = item.id === activePage;
    menuBtn.className = `w-full text-right py-3 px-4 border-4 font-bold cursor-pointer transition-all duration-200 mb-2 ${isActive ? 'bg-yellow-canary text-black border-yellow-canary' : 'border-yellow-canary bg-transparent text-white hover:bg-yellow-canary hover:text-black'}`;
    menuBtn.setAttribute('data-admin-menu', item.id);
    menuBtn.setAttribute('aria-label', item.label);
    menuBtn.textContent = item.label;
    sidebar.appendChild(menuBtn);
  });
  
  return sidebar;
}

export function createTitle(text, className = '') {
  const title = document.createElement('h1');
  title.className = `title-neo ${className}`;
  title.textContent = text;
  return title;
}

export function createSubtitle(text, className = '') {
  const subtitle = document.createElement('h2');
  subtitle.className = `subtitle-neo ${className}`;
  subtitle.textContent = text;
  return subtitle;
}

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 z-40 hidden md:flex items-center justify-between px-8 py-4 shadow-sm';
  header.dir = 'rtl';
  
  // Logo/Brand
  const logo = document.createElement('div');
  logo.className = 'flex items-center gap-3 cursor-pointer';
  logo.addEventListener('click', () => {
    renderPage(document.getElementById('app'), 'landing');
  });
  
  const logoIcon = document.createElement('span');
  logoIcon.className = 'text-2xl font-black text-pink-scream';
  logoIcon.textContent = '👁';
  logo.appendChild(logoIcon);
  
  const logoText = document.createElement('span');
  logoText.className = 'text-xl font-black text-gray-900';
  logoText.textContent = 'Cheshman';
  logo.appendChild(logoText);
  
  header.appendChild(logo);
  
  // Navigation Links
  const nav = document.createElement('nav');
  nav.className = 'flex gap-8 items-center';
  nav.dir = 'rtl';
  
  const navItems = [
    { label: 'خانه', page: 'landing' },
    { label: 'فروشگاه', page: 'store' },
    { label: 'علاقه‌مندی', page: 'favorites' },
    { label: 'سبد', page: 'cart' },
  ];
  
  navItems.forEach(item => {
    const link = document.createElement('button');
    link.className = 'font-bold text-gray-700 hover:text-pink-scream transition-colors duration-200 border-none bg-none cursor-pointer';
    link.textContent = item.label;
    link.addEventListener('click', () => {
      renderPage(document.getElementById('app'), item.page);
    });
    nav.appendChild(link);
  });
  
  header.appendChild(nav);
  
  // Admin Button
  const adminBtn = document.createElement('button');
  adminBtn.className = 'px-6 py-2 bg-pink-scream text-white font-bold rounded hover:bg-pink-500 transition-all duration-200';
  adminBtn.textContent = 'پنل مدیریت';
  adminBtn.addEventListener('click', () => {
    renderPage(document.getElementById('app'), 'admin');
  });
  header.appendChild(adminBtn);
  
  return header;
}

export function createMobileHeader() {
  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 z-40 md:hidden flex items-center justify-between px-4 py-4 shadow-sm';
  header.dir = 'rtl';
  
  // Logo/Brand
  const logo = document.createElement('div');
  logo.className = 'flex items-center gap-2 cursor-pointer';
  
  const logoIcon = document.createElement('span');
  logoIcon.className = 'text-xl font-black text-pink-scream';
  logoIcon.textContent = '👁';
  logo.appendChild(logoIcon);
  
  const logoText = document.createElement('span');
  logoText.className = 'text-sm font-black text-gray-900';
  logoText.textContent = 'Cheshman';
  logo.appendChild(logoText);
  
  header.appendChild(logo);
  
  // Mobile Menu Button
  const menuBtn = document.createElement('button');
  menuBtn.className = 'p-2 hover:bg-gray-100 rounded transition-colors';
  menuBtn.textContent = '☰';
  menuBtn.setAttribute('aria-label', 'Toggle menu');
  
  let menuOpen = false;
  menuBtn.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menuOpen = !menuOpen;
      menu.classList.toggle('hidden');
    }
  });
  
  header.appendChild(menuBtn);
  
  return header;
}

export function createMobileMenu() {
  const menu = document.createElement('div');
  menu.id = 'mobile-menu';
  menu.className = 'hidden fixed top-16 left-0 right-0 bg-white border-b-2 border-gray-200 z-30 md:hidden';
  menu.dir = 'rtl';
  
  const navItems = [
    { label: 'خانه', page: 'landing' },
    { label: 'فروشگاه', page: 'store' },
    { label: 'علاقه‌مندی', page: 'favorites' },
    { label: 'سبد', page: 'cart' },
    { label: 'پنل مدیریت', page: 'admin' },
  ];
  
  navItems.forEach(item => {
    const link = document.createElement('button');
    link.className = 'block w-full text-right px-6 py-4 border-b border-gray-100 font-bold text-gray-700 hover:bg-gray-50 transition-colors duration-200';
    link.textContent = item.label;
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      renderPage(document.getElementById('app'), item.page);
    });
    menu.appendChild(link);
  });
  
  return menu;
}
