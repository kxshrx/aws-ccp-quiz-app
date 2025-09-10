/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Vibrant Palette from Image
        'palette-cream': '#F5EFE6',
        'palette-beige': '#E8DFCA',
        'palette-blue': '#6D94C5',
        'palette-light-blue': '#CBDCEB',
        // Additional complementary colors
        'palette-warm-white': '#FEFEFE',
        'palette-soft-gray': '#F7F4F1',
        'palette-charcoal': '#2C3E50',
        'palette-navy': '#34495E',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        custom: {
          "primary": "#6D94C5",
          "primary-content": "#FFFFFF",
          "secondary": "#E8DFCA", 
          "secondary-content": "#2C3E50",
          "accent": "#CBDCEB",
          "accent-content": "#34495E",
          "neutral": "#34495E",
          "neutral-content": "#F5EFE6",
          "base-100": "#FEFEFE",
          "base-200": "#F5EFE6", 
          "base-300": "#E8DFCA",
          "base-content": "#2C3E50",
          "info": "#6D94C5",
          "info-content": "#FFFFFF",
          "success": "#16a085",
          "success-content": "#FFFFFF",
          "warning": "#f39c12",
          "warning-content": "#FFFFFF",
          "error": "#e74c3c",
          "error-content": "#FFFFFF",
        },
      },
    ],
    base: false,
    styled: true,
    utils: true,
  },
}
