
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'slow-rotate': 'slowRotate 8s linear infinite'
      },
      keyframes: {
        slowRotate: {
          '0%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(-2deg)' }
        }
      }
    },
  },
  plugins: [],
}
