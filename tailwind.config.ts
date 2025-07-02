import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(210 40% 90%)',
        background: 'hsl(210 40% 98%)',
        foreground: 'hsl(215 28% 17%)',
        primary: {
          DEFAULT: 'hsl(217 91% 60%)',
          foreground: 'hsl(210 40% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(215 28% 17%)',
        },
        muted: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(210 30% 46%)',
        },
      },
      borderRadius: {
        lg: `0.75rem`, 
        md: `0.5rem`,
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config