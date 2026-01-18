# 📋 دستورات سریع - کارت مرجع

## 🚀 شروع سریع

```bash
# نصب
npm install

# توسعه
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 📁 فایل‌های اصلی

| فایل | توضیح |
|-----|-------|
| `index.html` | صفحه HTML اصلی |
| `src/js/main.js` | نقطه ورود اپلیکیشن |
| `src/js/router.js` | سیستم مسیریابی |
| `src/js/store.js` | State Management |
| `src/css/style.css` | استایل‌های اصلی |
| `tailwind.config.js` | تنظیمات Tailwind |

---

## 🎨 رنگ‌های پروژه

```
🌸 Pink Scream: #FF10F0
💛 Yellow Canary: #FFD700
💚 Green Lawn: #32CD32
```

---

## 📱 صفحات

| صفحه | مسیر | توضیح |
|-------|------|-------|
| خانگی | landing | صفحه اول |
| فروشگاه | store | لیست محصولات |
| سبد | cart | سبد خرید |
| مدیریت | admin | پنل مدیریت |

---

## 🛠️ کامپوننت‌های کلیدی

```javascript
// دکمه
createButton(text, onClick, className)

// کارت
createCard(content, className)

// تیتر
createTitle(text, className)

// زیرتیتر
createSubtitle(text, className)
```

---

## 📦 State Functions

```javascript
getState()                      // دریافت state
addToCart(product)             // افزودن به سبد
removeFromCart(productId)      // حذف از سبد
updateQuantity(id, qty)        // تغییر تعداد
toggleLike(productId)          // Like کردن
filterProducts(category)       // فیلتر
getCartTotal()                 // جمع کل
getCartCount()                 // تعداد اقلام
```

---

## 🔄 Navigation

```javascript
// تغییر صفحه
renderPage(container, 'landing')   // خانگی
renderPage(container, 'store')     // فروشگاه
renderPage(container, 'cart')      // سبد
renderPage(container, 'admin')     // مدیریت
```

---

## 💾 Local Storage

```javascript
// ذخیره سبد
saveCart(cart)

// بارگذاری سبد
loadCart()
```

---

## 🎯 CSS Classes

```css
.btn-neo          /* دکمه */
.btn-neo-pink     /* دکمه صورتی */
.btn-neo-yellow   /* دکمه زرد */
.btn-neo-green    /* دکمه سبز */
.card-neo         /* کارت */
.title-neo        /* تیتر */
```

---

## 📞 مستندات

- [README.md](../README.md) - معرفی
- [SETUP_GUIDE.md](../SETUP_GUIDE.md) - نصب
- [DEVELOPMENT.md](../DEVELOPMENT.md) - توسعه
- [API_SPEC.md](../API_SPEC.md) - API

---

## 🐛 مشکل‌گیری

```bash
# پاک کردن و نصب مجدد
rm -r node_modules package-lock.json
npm cache clean --force
npm install

# Hard Refresh
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

---

## ✨ نکات سریع

- سایت در `http://localhost:5173` اجرا می‌شود
- RTL Layout (جهت فارسی)
- SPA Navigation (بدون رفرش)
- Mobile Responsive
- PWA Ready

---

**آخرین بروزرسانی**: 1402/10/17
