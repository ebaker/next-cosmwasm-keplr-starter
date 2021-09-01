module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        juno: {
          primary: '#f0827d',
          'primary-focus': '#e67873',
          'primary-content': '#ffffff',
          secondary: '#9f9f9f',
          'secondary-focus': '#959595',
          'secondary-content': '#ffffff',
          accent: '#7171F0',
          'accent-focus': '#6767E6',
          'accent-content': '#ffffff',
          neutral: '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          info: '#71F0E9',
          success: '#65F09A',
          warning: '#F0DF95',
          error: '#F06C65',
        },
      },
    ],
  },
}
