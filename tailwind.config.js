module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust if needed
  theme: {
    extend: {
      keyframes: {
        bounceSpin: {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "50%": { transform: "translateX(20px) rotate(180deg)" },
        },
      },
      animation: {
        "bounce-spin": "bounceSpin 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
