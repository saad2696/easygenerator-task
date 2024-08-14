/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      
        primary: {
          dark : '#172A59',
          shade : '#1A3B7B',
          tint : '#1164B0',
          light: '#34AAE2',
          black:"#222326",
          grey:"#3E3F40",
          darkgrey:"#565759",
          lightgrey:"#A7A8AB",
          lightwhite:"#F0F1F2"
        
        },
        secondary: {
          DEFAULT: '#FF5521',
          
        },
        label: {
          DEFAULT: '#3E3F40',
        },
      },
    },
  },
  plugins: [],
}
