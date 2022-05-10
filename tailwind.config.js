module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        growIn: {
          '0%': {height: 0},
          '100%': {height: 28},
        },
        fadeIn: {
          '0%': {opacity: 0},
          '50%': {opacity: 0},
          '100%': {opacity: 1},
        },
      },
      animation: {
        'grow-in': 'growIn 150ms ease-in-out',
        'fade-in': 'fadeIn 250ms ease-in-out',
      },
    },
  },
  plugins: [],
};
