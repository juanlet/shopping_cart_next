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
              DEFAULT: 'hsl(210 40% 96%)',
              foreground: 'hsl(215 28% 17%)',
            },
            destructive: {
              DEFAULT: 'hsl(0 84% 60%)',
              foreground: 'hsl(0 0% 100%)',
            },
            muted: {
              DEFAULT: 'hsl(210 40% 96%)',
              foreground: 'hsl(210 30% 46%)',
            },
          },
      borderRadius: {
        lg: `0.5rem`,
        md: `calc(0.5rem - 2px)`,
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config