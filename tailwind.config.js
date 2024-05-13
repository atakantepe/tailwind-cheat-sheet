/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  purge: [],
  content: {
    files: ["./src/**/*.{vue,js,ts,jsx,tsx}","./src/components/*.{vue,js,ts,jsx,tsx}"],
  
      safelist: [ {
        pattern: /.+/,
      },],
    
  },

  darkMode: false, 
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


