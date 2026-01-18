// Utilities and Helper Functions

export function formatCurrency(amount) {
  return amount.toLocaleString('fa-IR');
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('fa-IR');
}

export function createConfirmDialog(message, onConfirm, onCancel) {
  const confirmed = window.confirm(message);
  if (confirmed) {
    onConfirm();
  } else if (onCancel) {
    onCancel();
  }
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function localStorage_get(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

export function localStorage_set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

// Animation utilities
export function slideIn(element, duration = 300) {
  element.style.opacity = '0';
  element.style.transform = 'translateX(50px)';
  
  setTimeout(() => {
    element.style.transition = `all ${duration}ms ease`;
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }, 10);
}

export function fadeOut(element, duration = 300) {
  element.style.transition = `opacity ${duration}ms ease`;
  element.style.opacity = '0';
  
  setTimeout(() => {
    element.remove();
  }, duration);
}

// Toast Notification
export function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  const colors = {
    'success': 'bg-green-lawn',
    'error': 'bg-pink-scream',
    'warning': 'bg-yellow-canary',
    'info': 'bg-gray-800'
  };
  
  toast.className = `fixed bottom-24 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg font-bold border-4 border-black`;
  toast.textContent = message;
  toast.dir = 'rtl';
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    fadeOut(toast);
  }, duration);
}

// LocalStorage for cart persistence
export function saveCart(cart) {
  localStorage_set('cheshman_cart', cart);
}

export function loadCart() {
  return localStorage_get('cheshman_cart') || [];
}

// Print Invoice
export function printInvoice(invoiceData) {
  const printWindow = window.open('', '', 'height=600,width=800');
  let html = `
    <html dir="rtl">
      <head>
        <title>فاکتور ${invoiceData.invoiceNumber}</title>
        <style>
          body { font-family: Arial; direction: rtl; }
          .header { text-align: center; border-bottom: 4px solid #000; padding: 20px; }
          .items { margin: 20px 0; }
          .item { padding: 10px; border-bottom: 2px solid #000; }
          .total { font-weight: bold; font-size: 18px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>فاکتور فروش</h1>
          <p>شماره: ${invoiceData.invoiceNumber}</p>
          <p>تاریخ: ${invoiceData.date}</p>
        </div>
        <div class="items">
  `;
  
  invoiceData.items.forEach(item => {
    html += `
      <div class="item">
        <span>${item.name}</span>
        <span>${item.quantity}</span>
        <span>${item.price}</span>
      </div>
    `;
  });
  
  html += `
        </div>
        <div class="total">
          جمع کل: ${invoiceData.total}
        </div>
      </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}
