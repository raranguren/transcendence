/**@type {import('tailwindcss').Config} */

//tout ce qui n'est pas specifie ici va prendre la valeur par defaut donnee par tailwindcss
//hors de "extend" : override le default ; dedans: ajoute une possibilite

module.exports = 
{
  content: ["./index.html", "./src/**/*.ts"],
  theme: 
  {
    extend: 
    {
      backgroundImage: {
        'main-bg': "url('/assets/images/background.jpg')",
      },
      fontFamily:
      {
        sans: ['FinkHeavy', 'sans-serif'],
      },
      animation:
      {},
      keyframes:
      {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};