/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--red-principal)',
        'secondary-color': 'var(--dark-red-secondary)',
        'tertiary-color': 'var(--soft-gray)',
        'cuaternary-color': 'var(--gray)',
        'quinary-color': 'var(--light-red)'
      }
    }
  },
  plugins: []
}
