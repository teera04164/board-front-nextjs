import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        success: 'var(--success)',
        critical: 'var(--critical)',
        'green-100': '#D8E9E4',
        'green-300': '#2B5F44',
        'green-500': '#243831',
        'gray-100': '#BBC2C0',
        'gray-300': '#939494',
      },
    },
  },
  daisyui: {
    themes: [
      {
        default: {
          primary: '#49A569',
          secondary: '#FF5722',
          accent: '#FFC107',
          neutral: '#1F2937',
          'base-100': '#ffffff',
          'green-300': '#2B5F44',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
} satisfies Config;
