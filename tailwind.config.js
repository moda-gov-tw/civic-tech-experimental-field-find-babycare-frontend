/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: 'var(--bb-color-orange-600)',
        white: 'var(--bb-color-white)',
        error: 'var(--bb-color-error-red)',
        success: 'var(--bb-color-success-green)',
        'orange-700': 'var(--bb-color-orange-700)',
        'orange-600': 'var(--bb-color-orange-600)',
        'orange-50': 'var(--bb-color-orange-50)',
        'gray-700': 'var(--bb-color-gray-700)',
        'gray-600': 'var(--bb-color-gray-600)',
        'gray-200': 'var(--bb-color-gray-200)',
        'gray-50': 'var(--bb-color-gray-50)',
      }
    },
    spacing: {
      '0': '0',
      '1': '2px',
      '2': '4px',
      '3': '8px',
      '4': '12px',
      '5': '16px',
      '6': '24px',
      '7': '32px',
      '8': '40px',
      '9': '64px',
      '10': '80px',
    },
  },
  plugins: [],
};
