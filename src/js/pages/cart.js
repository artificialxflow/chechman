import { createTitle, createSubtitle, createButton, createBottomNavigation, createHeader, createMobileHeader, createMobileMenu } from '../components.js';
import { getState, removeFromCart, updateQuantity, getCartTotal, getCartCount } from '../store.js';

export function createCartPage() {
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
  
  const title = createTitle('سبد خریدتان');
  title.className = 'title-neo text-4xl md:text-5xl mb-8';
  main.appendChild(title);
  
  const state = getState();
  
  if (state.cart.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'text-center py-12 max-w-7xl mx-auto';
    empty.innerHTML = '<p class="text-2xl md:text-3xl font-bold mb-4">سبد خریدتان خالی است</p><p class="text-gray-600 text-lg">برای افزودن محصول به فروشگاه بروید</p>';
    main.appendChild(empty);
  } else {
    // Cart Items
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'mb-8 space-y-4 max-w-7xl mx-auto';
    itemsContainer.dir = 'rtl';
    
    state.cart.forEach((item, index) => {
      const itemCard = document.createElement('div');
      itemCard.className = 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-pink-scream';
      itemCard.style.animationDelay = `${index * 50}ms`;
      itemCard.dir = 'rtl';
      
      const info = document.createElement('div');
      info.dir = 'rtl';
      info.className = 'flex-1';
      
      const itemName = document.createElement('h4');
      itemName.className = 'font-bold text-lg md:text-xl mb-2';
      itemName.textContent = item.name;
      info.appendChild(itemName);
      
      const itemPrice = document.createElement('p');
      itemPrice.className = 'text-pink-scream font-black text-2xl mb-3';
      itemPrice.textContent = `${item.price.toLocaleString('fa-IR')} تومان`;
      info.appendChild(itemPrice);
      
      const qtyControl = document.createElement('div');
      qtyControl.className = 'flex items-center gap-2 border-2 border-gray-300 rounded p-2 bg-gray-50 w-fit';
      qtyControl.dir = 'rtl';
      
      const decBtn = createButton('-', () => {
        if (item.quantity > 1) {
          updateQuantity(item.id, item.quantity - 1);
          location.reload();
        }
      }, 'btn-secondary px-4 py-2 text-lg font-bold');
      
      const qtySpan = document.createElement('span');
      qtySpan.className = 'font-bold text-lg px-4';
      qtySpan.textContent = item.quantity;
      
      const incBtn = createButton('+', () => {
        updateQuantity(item.id, item.quantity + 1);
        location.reload();
      }, 'btn-secondary px-4 py-2 text-lg font-bold');
      
      qtyControl.appendChild(incBtn);
      qtyControl.appendChild(qtySpan);
      qtyControl.appendChild(decBtn);
      
      info.appendChild(qtyControl);
      itemCard.appendChild(info);
      
      const removeBtn = createButton('حذف', () => {
        removeFromCart(item.id);
        location.reload();
      }, 'btn-primary text-white font-bold px-6 py-2');
      
      itemCard.appendChild(removeBtn);
      itemsContainer.appendChild(itemCard);
    });
    
    main.appendChild(itemsContainer);
    
    // Total Section
    const totalSection = document.createElement('div');
    totalSection.className = 'bg-gradient-to-r from-pink-scream to-pink-400 rounded-lg shadow-lg mb-8 p-8 max-w-7xl mx-auto text-white';
    totalSection.dir = 'rtl';
    
    const totalLabel = document.createElement('p');
    totalLabel.className = 'text-xl md:text-2xl font-bold mb-4';
    totalLabel.textContent = 'جمع کل:';
    totalSection.appendChild(totalLabel);
    
    const totalAmount = document.createElement('p');
    totalAmount.className = 'text-4xl md:text-5xl font-black mb-6';
    totalAmount.textContent = `${getCartTotal().toLocaleString('fa-IR')} تومان`;
    totalSection.appendChild(totalAmount);
    
    const checkoutBtn = createButton('تکمیل خریدی', () => {
      alert('سفارش شما ثبت شد. از خرید شما متشکریم!');
    }, 'bg-white text-pink-scream font-bold px-8 py-3 rounded text-lg w-full md:w-auto');
    totalSection.appendChild(checkoutBtn);
    
    main.appendChild(totalSection);
  }
  
  container.appendChild(main);
  
  // Bottom Navigation (Mobile Only)
  const bottomNav = createBottomNavigation('cart');
  container.appendChild(bottomNav);
  
  return container;
}
