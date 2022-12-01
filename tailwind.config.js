/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html'],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
      },
      fontFamily: {
        'inter': ['Inter'],
        'lexend-deca': ['Lexend Deca'],
        'barlow': ['"Barlow"','sans'],
        'barlow-condensed': ['"Barlow Condensed"','sans'],
        'bellefair': ['"Bellefair"','sans'],
      },
    },
  },
  plugins: [],
}
