/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-scream': '#FF10F0',
        'yellow-canary': '#FFD700',
        'green-lawn': '#32CD32',
      },
      borderWidth: {
        '4': '4px',
        '8': '8px',
      },
      fontFamily: {
        'farsi-bold': ['IRANSans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'flat-black': '4px 4px 0px #000000',
        'flat-black-thick': '8px 8px 0px #000000',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
