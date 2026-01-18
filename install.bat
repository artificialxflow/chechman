@echo off
REM نصب و اجرای پروژه چشمان برای Windows

setlocal enabledelayedexpansion

color 0F
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║            🚀 نصب و اجرای پروژه چشمان (Cheshman) 🚀            ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM بررسی Node.js
where /q node
if errorlevel 1 (
    echo ❌ Node.js نصب نشده است!
    echo 📥 لطفاً از این لینک نصب کنید: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js نصب شده است:
node --version

echo ✅ npm نصب شده است:
npm --version

echo.
echo 📁 نصب Dependencies...
call npm install

if errorlevel 1 (
    echo ❌ خطا در نصب Dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies نصب شده!
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎉 همه چیز آماده است! اکنون دستورات زیر را اجرا کنید:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🚀 برای اجرای سرور توسعه:
echo    npm run dev
echo.
echo 📦 برای Build برای Production:
echo    npm run build
echo.
echo 👁️  برای Preview Build:
echo    npm run preview
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🌐 سایت در آدرس http://localhost:5173 باز خواهد شد
echo.
echo 📚 مستندات:
echo    - README.md - مقدمه و نمای کلی
echo    - SETUP_GUIDE.md - راهنمای کامل نصب
echo    - DEVELOPMENT.md - دستور العمل توسعه
echo    - API_SPEC.md - مشخصات API
echo.
echo ✨ Happy Coding! 👀
echo.

pause
