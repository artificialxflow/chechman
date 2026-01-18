## راهنمای نصب و راه‌اندازی

### پیش‌نیازها
1. نصب Node.js و npm
2. نصب VS Code (اختیاری)

### مراحل نصب

#### مرحله 1: نصب Node.js
1. به سایت https://nodejs.org بروید
2. نسخه LTS را دانلود و نصب کنید
3. دستور زیر را در Terminal بزنید:
```bash
node --version
npm --version
```

#### مرحله 2: نصب Dependencies
```bash
cd c:\Users\Administrator\Documents\projects\chechman
npm install
```

#### مرحله 3: اجرای پروژه
```bash
npm run dev
```

پروژه در آدرس `http://localhost:5173` باز می‌شود.

### ساختار فایل‌ها

```
chechman/
├── src/
│   ├── css/
│   │   └── style.css          # استایل‌های اصلی و Tailwind
│   ├── js/
│   │   ├── main.js            # فایل ورودی
│   │   ├── router.js          # مسیریابی SPA
│   │   ├── components.js      # کامپوننت‌های مشترک
│   │   ├── store.js           # مدیریت state
│   │   └── pages/
│   │       ├── landing.js     # صفحه خانگی
│   │       ├── store.js       # فروشگاه
│   │       ├── cart.js        # سبد خرید
│   │       └── admin.js       # پنل مدیریت
│   └── assets/                # تصاویر و منابع
├── index.html                 # صفحه HTML اصلی
├── vite.config.js            # تنظیمات Vite
├── tailwind.config.js        # تنظیمات Tailwind
├── postcss.config.js         # تنظیمات PostCSS
└── package.json              # مشخصات پروژه
```

### فیچرهای پروژه

#### Landing Page (صفحه خانگی)
- ✅ Hero section با طراحی Neo-Brutalism
- ✅ Interactive Eye Emoji Tracker
- ✅ دو دکمه بزرگ برای ورود (فروشگاه/مدیریت)
- ✅ Bottom Navigation

#### Store Page (فروشگاه)
- ✅ Grid محصولات ۲ ستونه
- ✅ سیستم فیلتر بر اساس دسته
- ✅ دکمه Like برای محصولات
- ✅ افزودن به سبد خرید
- ✅ نمایش تعداد موارد سبد

#### Cart Page (سبد خرید)
- ✅ نمایش محصولات در سبد
- ✅ کنترل تعداد محصول (+/-)
- ✅ حذف محصول از سبد
- ✅ محاسبه جمع کل
- ✅ دکمه تکمیل خریدی

#### Admin Panel (پنل مدیریت)
- ✅ Sidebar ناویگیشن
- ✅ Dashboard با 4 کارت وضعیت
- ✅ مدیریت محصولات
- ✅ مدیریت انبار (فرم ثبت مشخصات عینک)
- ✅ حسابداری و فاکتورها
- ✅ مدیریت سفارشات

### دیزاین و استایل

#### رنگ‌های اختصاصی
- Pink Scream: `#FF10F0`
- Yellow Canary: `#FFD700`
- Green Lawn: `#32CD32`

#### ویژگی‌های Neo-Brutalism
- Border 4px و 8px
- Box Shadow سیاه تخت
- Transition effects on active
- طراحی bold و خط‌دار

#### فونت
- فونت فارسی: IRANSans
- Weight: Bold/Black برای تیترها

### راهنمای استفاده

#### صفحه خانگی
1. جملات خوش‌آمدگویی و توضیح پروژه
2. رفتن به فروشگاه یا پنل مدیریت

#### فروشگاه
1. مشاهده لیست محصولات
2. فیلتر بر اساس دسته (آفتابی، طبی، ورزشی...)
3. Like کردن محصول برای ذخیره
4. افزودن به سبد خرید

#### سبد خرید
1. مشاهده محصولات اضافه شده
2. تغییر تعداد محصول
3. حذف محصول
4. مشاهده جمع کل
5. تکمیل خریدی

#### پنل مدیریت
**Dashboard:**
- مشاهده آمار فروش، مشتریان، محصولات، سفارشات

**مدیریت محصولات:**
- جدول محصولات موجود
- قابلیت ویرایش و حذف

**مدیریت انبار:**
- فرم ثبت مشخصات تخصصی عینک:
  - نام عینک
  - نوع عدسی
  - پل بینی (mm)
  - طول دسته
  - عرض لنز
  - نسخه (فاصله)
  - محور

**حسابداری:**
- جدول فاکتورهای صادرشده
- وضعیت پرداخت

**سفارشات:**
- جدول سفارشات مشتریان
- وضعیت تحویل

### قابلیت‌های پیشرفته (اختیاری)

برای تکمیل پروژه می‌توانید موارد زیر را اضافه کنید:
- [ ] Backend API (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Authentication (JWT)
- [ ] Payment Gateway (Zarinpal/Stripe)
- [ ] Real-time Notifications
- [ ] PWA Manifest
- [ ] Chart.js برای نمودارها
- [ ] تصاویر محصولات واقعی
- [ ] Responsive Design بهتر

### مشکل‌گیری

اگر پروژه اجرا نشد:
1. بررسی نصب Node.js: `node --version`
2. حذف folder `node_modules`: `rm -r node_modules`
3. نصب مجدد: `npm install`
4. پاک کردن cache: `npm cache clean --force`
5. اجرای مجدد: `npm run dev`

### تماس و پشتیبانی

برای سوالات و پیشنهادات:
- ایمیل: support@cheshman.com
- تلفن: 021-XXXX-XXXX

---

**نسخه:** 1.0.0
**آخرین بروزرسانی:** 1402/10/17
