/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to right, #1a1a1a, #2d2d2d, #1a1a1a)',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'dark-start': '#1a1a1a',
        'dark-middle': '#2d2d2d',
        'dark-end': '#1a1a1a',
      }),
    },
  },
  plugins: [],
}
  