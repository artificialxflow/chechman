import { createTitle, createButton, createCard, createBottomNavigation, createHeader, createMobileHeader, createMobileMenu } from '../components.js';
import { renderPage } from '../router.js';

export function createLandingPage() {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100';
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
  main.className = 'pt-24 md:pt-32 pb-32 md:pb-12 px-4 md:px-12';
  main.dir = 'rtl';
  
  // Hero Section - Grid Layout (1 col mobile, 2 col desktop)
  const heroGrid = document.createElement('div');
  heroGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-7xl mx-auto mb-20';
  heroGrid.dir = 'rtl';
  
  // Hero Content
  const heroContent = document.createElement('div');
  heroContent.className = 'flex flex-col justify-center';
  heroContent.dir = 'rtl';
  
  const heroTitle = document.createElement('h1');
  heroTitle.className = 'text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight';
  heroTitle.textContent = 'عینک‌های بی‌نظیر';
  heroContent.appendChild(heroTitle);
  
  const heroSubtitle = document.createElement('h2');
  heroSubtitle.className = 'text-xl md:text-2xl text-pink-scream font-bold mb-6';
  heroSubtitle.textContent = 'کیفیت و سبک در یک جا';
  heroContent.appendChild(heroSubtitle);
  
  const heroDescription = document.createElement('p');
  heroDescription.className = 'text-lg text-gray-700 mb-8 leading-relaxed';
  heroDescription.textContent = 'بهترین مجموعه عینک‌های آفتابی، طبی و ورزشی برای هر سلیقه و نیاز. ما مایل هستیم که شما را با خدمات درجه‌ی اول و محصولات معیاری آشنا کنیم.';
  heroContent.appendChild(heroDescription);
  
  // CTA Buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex gap-4 md:gap-6 flex-wrap';
  
  const shopBtn = createButton('ورود به فروشگاه', () => {
    renderPage(document.getElementById('app'), 'store');
  }, 'btn-primary text-lg md:text-xl px-8 md:px-10 py-3 md:py-4');
  
  const adminBtn = createButton('پنل مدیریت', () => {
    renderPage(document.getElementById('app'), 'admin');
  }, 'btn-secondary text-lg md:text-xl px-8 md:px-10 py-3 md:py-4');
  
  buttonContainer.appendChild(shopBtn);
  buttonContainer.appendChild(adminBtn);
  heroContent.appendChild(buttonContainer);
  
  heroGrid.appendChild(heroContent);
  
  // Hero Image/Visual (Desktop Only)
  const heroVisual = document.createElement('div');
  heroVisual.className = 'hidden md:flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg p-12 min-h-96';
  
  const visualContent = document.createElement('div');
  visualContent.className = 'text-center';
  
  const visualEmoji = document.createElement('div');
  visualEmoji.className = 'text-8xl mb-6 animate-bounce';
  visualEmoji.textContent = '👓';
  visualContent.appendChild(visualEmoji);
  
  const visualText = document.createElement('p');
  visualText.className = 'text-xl font-bold text-gray-700';
  visualText.textContent = 'مجموعه‌ی متنوع عینک';
  visualContent.appendChild(visualText);
  
  heroVisual.appendChild(visualContent);
  heroGrid.appendChild(heroVisual);
  
  main.appendChild(heroGrid);
  
  // Features Section
  const featuresSection = document.createElement('section');
  featuresSection.className = 'bg-white rounded-lg shadow-md p-8 md:p-12 max-w-7xl mx-auto mb-20';
  featuresSection.dir = 'rtl';
  
  const featuresTitle = document.createElement('h2');
  featuresTitle.className = 'text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center';
  featuresTitle.textContent = 'چرا چشمان؟';
  featuresSection.appendChild(featuresTitle);
  
  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-8';
  
  const features = [
    { icon: '✓', title: 'کیفیت تضمین شده', desc: 'تمام محصولات دارای گارانتی و تضمین کیفیت' },
    { icon: '⚡', title: 'ارسال سریع', desc: 'ارسال به سراسر کشور در کمترین زمان' },
    { icon: '💳', title: 'پرداخت آسان', desc: 'پشتیبانی از تمام روش‌های پرداخت' },
  ];
  
  features.forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.className = 'text-center p-6';
    
    const featureIcon = document.createElement('div');
    featureIcon.className = 'text-5xl font-black text-pink-scream mb-4';
    featureIcon.textContent = feature.icon;
    featureCard.appendChild(featureIcon);
    
    const featureTitle = document.createElement('h3');
    featureTitle.className = 'text-xl font-bold text-gray-900 mb-3';
    featureTitle.textContent = feature.title;
    featureCard.appendChild(featureTitle);
    
    const featureDesc = document.createElement('p');
    featureDesc.className = 'text-gray-600';
    featureDesc.textContent = feature.desc;
    featureCard.appendChild(featureDesc);
    
    featuresGrid.appendChild(featureCard);
  });
  
  featuresSection.appendChild(featuresGrid);
  main.appendChild(featuresSection);
  
  container.appendChild(main);
  
  // Bottom Navigation (Mobile Only)
  const bottomNav = createBottomNavigation('landing');
  container.appendChild(bottomNav);
  
  return container;
}
