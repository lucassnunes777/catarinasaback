import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0A0A0A",
        primary: {
          DEFAULT: "#000080",
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#6B7280"
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0A0A0A"
        },
        border: "#E5E7EB"
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "2rem",
          xl: "2rem",
          "2xl": "2rem"
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config


