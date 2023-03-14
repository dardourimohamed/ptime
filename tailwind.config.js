/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      amiri: ['amiri'],
      baloo: ['baloo'],
      elmessiri: ['elmessiri'],
      jomhuria: ['jomhuria'],
      lalezar: ['lalezar'],
      lateef: ['lateef'],
    }
  },
  safelist: [
    'font-amiri',
    'font-baloo',
    'font-elmessiri',
    'font-jomhuria',
    'font-lalezar',
    'font-lateef',
  ],
  plugins: [],
}
