import { createTitle, createSubtitle, createCard, createButton, createAdminSidebar, createBottomNavigation, createHeader, createMobileHeader, createMobileMenu } from '../components.js';
import { renderPage } from '../router.js';

export function createAdminPage() {
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
  
  // Mobile Toggle Button for Sidebar (Mobile Only)
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'fixed top-20 left-4 z-50 md:hidden bg-gray-900 text-white p-2 font-bold rounded transition-all duration-200';
  toggleBtn.setAttribute('aria-label', 'Toggle sidebar menu');
  toggleBtn.setAttribute('id', 'sidebar-toggle');
  toggleBtn.innerHTML = '☰';
  toggleBtn.addEventListener('click', () => {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
      sidebar.classList.toggle('translate-x-0');
    }
  });
  container.appendChild(toggleBtn);
  
  // Sidebar
  const sidebar = createAdminSidebar('dashboard');
  
  const menuButtons = sidebar.querySelectorAll('[data-admin-menu]');
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.adminMenu;
      const mainContent = document.getElementById('admin-content');
      
      // Update active state
      menuButtons.forEach(b => {
        b.classList.remove('bg-yellow-canary', 'text-black');
        b.classList.add('border-yellow-canary', 'bg-transparent', 'text-white');
      });
      btn.classList.add('bg-yellow-canary', 'text-black');
      btn.classList.remove('border-yellow-canary', 'bg-transparent', 'text-white');
      
      renderAdminContent(mainContent, sectionId);
      
      // Close sidebar on mobile after selection
      if (window.innerWidth < 768) {
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
      }
    });
  });
  
  // Set first button as active
  if (menuButtons.length > 0) {
    menuButtons[0].classList.add('bg-yellow-canary', 'text-black');
    menuButtons[0].classList.remove('border-yellow-canary', 'bg-transparent', 'text-white');
  }
  
  container.appendChild(sidebar);
  
  // Main Content
  const mainContent = document.createElement('div');
  mainContent.className = 'pt-24 md:pt-16 md:mr-64 px-4 md:px-8 transition-all duration-300 max-w-7xl';
  mainContent.dir = 'rtl';
  mainContent.id = 'admin-content';
  
  renderAdminContent(mainContent, 'dashboard');
  
  container.appendChild(mainContent);
  
  // Bottom Navigation (Mobile Only)
  const bottomNav = createBottomNavigation('admin');
  container.appendChild(bottomNav);
  
  return container;
}

function renderAdminContent(container, section) {
  container.innerHTML = '';
  
  switch (section) {
    case 'dashboard':
      renderDashboard(container);
      break;
    case 'products':
      renderProductsManagement(container);
      break;
    case 'inventory':
      renderInventoryManagement(container);
      break;
    case 'accounting':
      renderAccountingManagement(container);
      break;
    case 'orders':
      renderOrdersManagement(container);
      break;
  }
}

function renderDashboard(container) {
  const title = createTitle('داشبورد');
  title.className = 'title-neo text-4xl md:text-5xl mb-8';
  container.appendChild(title);
  
  // Stats Cards
  const statsGrid = document.createElement('div');
  statsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8';
  statsGrid.dir = 'rtl';
  
  const stats = [
    { label: 'فروش امروز', value: '15,850,000', icon: '💰', color: 'bg-gradient-to-br from-pink-scream to-pink-400' },
    { label: 'مشتریان فعال', value: '128', icon: '👥', color: 'bg-gradient-to-br from-green-500 to-emerald-400' },
    { label: 'محصول در انبار', value: '2,450', icon: '📦', color: 'bg-gradient-to-br from-blue-500 to-cyan-400' },
    { label: 'سفارشات معلق', value: '23', icon: '⏳', color: 'bg-gradient-to-br from-orange-500 to-yellow-400' },
  ];
  
  stats.forEach((stat, index) => {
    const card = document.createElement('div');
    card.className = `${stat.color} text-white font-bold p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`;
    card.style.animationDelay = `${index * 100}ms`;
    card.dir = 'rtl';
    
    const icon = document.createElement('div');
    icon.className = 'text-5xl md:text-6xl mb-3';
    icon.textContent = stat.icon;
    card.appendChild(icon);
    
    const label = document.createElement('p');
    label.className = 'text-sm md:text-base mb-2 font-bold opacity-90';
    label.textContent = stat.label;
    card.appendChild(label);
    
    const value = document.createElement('p');
    value.className = 'text-2xl md:text-4xl font-black';
    value.textContent = stat.value;
    card.appendChild(value);
    
    statsGrid.appendChild(card);
  });
  
  container.appendChild(statsGrid);
  
  // Chart Placeholder
  const chartSection = document.createElement('div');
  chartSection.className = 'bg-white rounded-lg shadow-md p-6 md:p-8 mb-8';
  chartSection.dir = 'rtl';
  
  const chartTitle = createSubtitle('فروش هفتگی');
  chartTitle.className = 'subtitle-neo text-2xl md:text-3xl mb-6';
  chartSection.appendChild(chartTitle);
  
  const chartPlaceholder = document.createElement('div');
  chartPlaceholder.className = 'h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 font-bold';
  chartPlaceholder.textContent = 'نمودار فروش (نیاز به Chart.js)';
  chartSection.appendChild(chartPlaceholder);
  
  container.appendChild(chartSection);
}

function renderProductsManagement(container) {
  const title = createTitle('مدیریت محصولات');
  title.className = 'title-neo text-4xl md:text-5xl mb-8';
  container.appendChild(title);
  
  // Add Product Button
  const addBtn = createButton('افزودن محصول جدید', () => {
    alert('بخش افزودن محصول جدید');
  }, 'btn-primary text-white mb-8 px-8 py-3 text-lg font-bold');
  container.appendChild(addBtn);
  
  // Products Table
  const tableContainer = document.createElement('div');
  tableContainer.className = 'overflow-x-auto bg-white rounded-lg shadow-md';
  tableContainer.dir = 'rtl';
  
  const table = document.createElement('table');
  table.className = 'w-full';
  table.dir = 'rtl';
  
  const thead = document.createElement('thead');
  thead.className = 'bg-gray-900 text-white border-b-2 border-gray-200';
  thead.innerHTML = `
    <tr>
      <th class="p-4 text-right font-bold">نام محصول</th>
      <th class="p-4 text-right font-bold">قیمت</th>
      <th class="p-4 text-right font-bold">دسته</th>
      <th class="p-4 text-right font-bold">عملیات</th>
    </tr>
  `;
  table.appendChild(thead);
  
  const tbody = document.createElement('tbody');
  const products = [
    { name: 'عینک آفتابی مدل A', price: '450,000', category: 'آفتابی' },
    { name: 'عینک طبی مدل B', price: '350,000', category: 'طبی' },
    { name: 'عینک ورزشی مدل C', price: '520,000', category: 'ورزشی' },
    { name: 'عینک خلبانی مدل D', price: '480,000', category: 'خلبانی' },
    { name: 'عینک گرد مدل E', price: '420,000', category: 'گرد' },
  ];
  
  products.forEach((product, idx) => {
    const row = document.createElement('tr');
    row.className = `${idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-white'} transition-colors duration-200 border-b border-gray-200`;
    row.dir = 'rtl';
    row.innerHTML = `
      <td class="p-4 font-bold">${product.name}</td>
      <td class="p-4 text-pink-scream font-black">${product.price}</td>
      <td class="p-4">${product.category}</td>
      <td class="p-4 flex gap-2 flex-wrap">
        <button class="px-4 py-2 bg-green-500 text-white font-bold rounded cursor-pointer hover:shadow-md transition-all duration-200">ویرایش</button>
        <button class="px-4 py-2 bg-pink-scream text-white font-bold rounded cursor-pointer hover:shadow-md transition-all duration-200">حذف</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  tableContainer.appendChild(table);
  container.appendChild(tableContainer);
}

function renderInventoryManagement(container) {
  const title = createTitle('مدیریت انبار');
  title.className = 'title-neo text-4xl md:text-5xl mb-8';
  container.appendChild(title);
  
  const subtitle = createSubtitle('ثبت اطلاعات عینک تخصصی');
  subtitle.className = 'subtitle-neo text-xl md:text-2xl mb-6';
  container.appendChild(subtitle);
  
  const form = document.createElement('form');
  form.className = 'bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 max-w-2xl';
  form.dir = 'rtl';
  
  const fields = [
    { label: 'نام عینک', name: 'name', type: 'text', required: true },
    { label: 'نوع عدسی', name: 'lensType', type: 'text', required: true },
    { label: 'پل بینی (میلی‌متر)', name: 'nosebridge', type: 'number', required: true },
    { label: 'طول دسته (میلی‌متر)', name: 'templeLength', type: 'number', required: true },
    { label: 'عرض لنز (میلی‌متر)', name: 'lensWidth', type: 'number', required: true },
    { label: 'نسخه (فاصله)', name: 'prescription', type: 'text' },
    { label: 'محور (Axis)', name: 'axis', type: 'number' },
  ];
  
  fields.forEach((field, index) => {
    const group = document.createElement('div');
    group.className = 'mb-6';
    group.style.animationDelay = `${index * 50}ms`;
    group.dir = 'rtl';
    
    const label = document.createElement('label');
    label.className = 'block font-bold mb-2 text-gray-700';
    label.textContent = field.label;
    group.appendChild(label);
    
    const input = document.createElement('input');
    input.type = field.type;
    input.name = field.name;
    input.className = 'w-full px-4 py-2 border-2 border-gray-300 rounded font-bold focus:outline-none focus:ring-2 focus:ring-pink-scream focus:border-transparent transition-all duration-200';
    input.setAttribute('aria-label', field.label);
    if (field.required) input.required = true;
    group.appendChild(input);
    
    form.appendChild(group);
  });
  
  const submitBtn = createButton('ثبت اطلاعات', () => {
    alert('اطلاعات ثبت شد');
  }, 'btn-primary text-white w-full py-3 text-lg font-bold');
  form.appendChild(submitBtn);
  
  container.appendChild(form);
}

function renderAccountingManagement(container) {
  const title = createTitle('حسابداری و فاکتور');
  title.className = 'title-neo text-4xl md:text-5xl mb-8';
  container.appendChild(title);
  
  const invoiceTable = document.createElement('div');
  invoiceTable.className = 'overflow-x-auto bg-white rounded-lg shadow-md';
  invoiceTable.dir = 'rtl';
  
  const table = document.createElement('table');
  table.className = 'w-full';
  table.dir = 'rtl';
  
  table.innerHTML = `
    <thead class="bg-gray-900 text-white border-b-2 border-gray-200">
      <tr>
        <th class="p-4 text-right font-bold">شماره فاکتور</th>
        <th class="p-4 text-right font-bold">تاریخ</th>
        <th class="p-4 text-right font-bold">مبلغ</th>
        <th class="p-4 text-right font-bold">وضعیت</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200">
        <td class="p-4 font-bold">FAC-001</td>
        <td class="p-4">1402/10/15</td>
        <td class="p-4 text-green-600 font-bold">2,850,000</td>
        <td class="p-4"><span class="bg-green-500 text-white px-3 py-1 font-bold rounded">پرداخت شده</span></td>
      </tr>
      <tr class="bg-gray-50 hover:bg-white transition-colors duration-200 border-b border-gray-200">
        <td class="p-4 font-bold">FAC-002</td>
        <td class="p-4">1402/10/16</td>
        <td class="p-4 text-pink-scream font-bold">1,550,000</td>
        <td class="p-4"><span class="bg-pink-scream text-white px-3 py-1 font-bold rounded">معلق</span></td>
      </tr>
      <tr class="bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200">
        <td class="p-4 font-bold">FAC-003</td>
        <td class="p-4">1402/10/17</td>
        <td class="p-4 text-green-600 font-bold">3,200,000</td>
        <td class="p-4"><span class="bg-green-500 text-white px-3 py-1 font-bold rounded">پرداخت شده</span></td>
      </tr>
    </tbody>
  `;
  
  invoiceTable.appendChild(table);
  container.appendChild(invoiceTable);
}

function renderOrdersManagement(container) {
  const title = createTitle('مدیریت سفارشات');
  title.className = 'title-neo text-4xl md:text-5xl mb-8';
  container.appendChild(title);
  
  const ordersTable = document.createElement('div');
  ordersTable.className = 'overflow-x-auto bg-white rounded-lg shadow-md';
  ordersTable.dir = 'rtl';
  
  const table = document.createElement('table');
  table.className = 'w-full';
  table.dir = 'rtl';
  
  table.innerHTML = `
    <thead class="bg-gray-900 text-white border-b-2 border-gray-200">
      <tr>
        <th class="p-4 text-right font-bold">شماره سفارش</th>
        <th class="p-4 text-right font-bold">مشتری</th>
        <th class="p-4 text-right font-bold">مبلغ</th>
        <th class="p-4 text-right font-bold">وضعیت</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200">
        <td class="p-4 font-bold">ORD-1001</td>
        <td class="p-4">علی محمدی</td>
        <td class="p-4 font-bold">5,200,000</td>
        <td class="p-4"><span class="bg-green-500 text-white px-3 py-1 font-bold rounded">تحویل داده شده</span></td>
      </tr>
      <tr class="bg-gray-50 hover:bg-white transition-colors duration-200 border-b border-gray-200">
        <td class="p-4 font-bold">ORD-1002</td>
        <td class="p-4">فاطمه رحیمی</td>
        <td class="p-4 font-bold">3,450,000</td>
        <td class="p-4"><span class="bg-blue-500 text-white px-3 py-1 font-bold rounded">در حال ارسال</span></td>
      </tr>
      <tr class="bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200">
        <td class="p-4 font-bold">ORD-1003</td>
        <td class="p-4">حسن عبدی</td>
        <td class="p-4 font-bold">2,800,000</td>
        <td class="p-4"><span class="bg-pink-scream text-white px-3 py-1 font-bold rounded">منتظر تأیید</span></td>
      </tr>
    </tbody>
  `;
  
  ordersTable.appendChild(table);
  container.appendChild(ordersTable);
}
