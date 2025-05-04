export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "babylonschooledunpalizarin-crimson":
          "var(--babylonschooledunpalizarin-crimson)",
        babylonschooledunpblack: "var(--babylonschooledunpblack)",
        "babylonschooledunpblack-4": "var(--babylonschooledunpblack-4)",
        "babylonschooledunpclear-day": "var(--babylonschooledunpclear-day)",
        "babylonschooledunpcyan-aqua-30":
          "var(--babylonschooledunpcyan-aqua-30)",
        "babylonschooledunpeastern-blue":
          "var(--babylonschooledunpeastern-blue)",
        "babylonschooledunpfair-pink": "var(--babylonschooledunpfair-pink)",
        babylonschooledunpgallery: "var(--babylonschooledunpgallery)",
        "babylonschooledunplavender-blush":
          "var(--babylonschooledunplavender-blush)",
        babylonschooledunpmagnolia: "var(--babylonschooledunpmagnolia)",
        babylonschooledunpmartinique: "var(--babylonschooledunpmartinique)",
        "babylonschooledunporange-peel": "var(--babylonschooledunporange-peel)",
        babylonschooledunpselago: "var(--babylonschooledunpselago)",
        "babylonschooledunpselago-47": "var(--babylonschooledunpselago-47)",
        "babylonschooledunpshamrock-30": "var(--babylonschooledunpshamrock-30)",
        "babylonschooledunptorch-red-30":
          "var(--babylonschooledunptorch-red-30)",
        babylonschooledunptuna: "var(--babylonschooledunptuna)",
        babylonschooledunptundora: "var(--babylonschooledunptundora)",
        babylonschooledunpwhite: "var(--babylonschooledunpwhite)",
        "babylonschooledunpwhite-02": "var(--babylonschooledunpwhite-02)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "babylonschool-edu-np-quicksand-bold":
          "var(--babylonschool-edu-np-quicksand-bold-font-family)",
        "babylonschool-edu-np-quicksand-bold-upper":
          "var(--babylonschool-edu-np-quicksand-bold-upper-font-family)",
        "babylonschool-edu-np-quicksand-medium":
          "var(--babylonschool-edu-np-quicksand-medium-font-family)",
        "babylonschool-edu-np-quicksand-medium-title":
          "var(--babylonschool-edu-np-quicksand-medium-title-font-family)",
        "babylonschool-edu-np-quicksand-regular":
          "var(--babylonschool-edu-np-quicksand-regular-font-family)",
        "babylonschool-edu-np-semantic-button":
          "var(--babylonschool-edu-np-semantic-button-font-family)",
        "babylonschool-edu-np-semantic-heading-1":
          "var(--babylonschool-edu-np-semantic-heading-1-font-family)",
        "babylonschool-edu-np-semantic-heading-2":
          "var(--babylonschool-edu-np-semantic-heading-2-font-family)",
        "babylonschool-edu-np-semantic-heading-3":
          "var(--babylonschool-edu-np-semantic-heading-3-font-family)",
        "babylonschool-edu-np-semantic-heading-4":
          "var(--babylonschool-edu-np-semantic-heading-4-font-family)",
        "babylonschool-edu-np-semantic-heading-6":
          "var(--babylonschool-edu-np-semantic-heading-6-font-family)",
        "babylonschool-edu-np-semantic-link":
          "var(--babylonschool-edu-np-semantic-link-font-family)",
        "babylonschool-edu-np-semantic-strong":
          "var(--babylonschool-edu-np-semantic-strong-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};