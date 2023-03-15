/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js,php}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./courses/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maBold: ["MA Bold"],
        maRegular: ["MA Regular"],
        maLight: ["MA Light"],
        maExtraBold: ["MA ExtraBold"],
        maSemiBold: ["MA SemiBold"],
        RobotoBold: ["Roboto Bold"],
        RobotoRegular: ["Roboto Regular"],
        RobotoLight: ["Roboto Light"],
        RobotoExtraBold: ["Roboto ExtraBold"],
        RobotoSemiBold: ["Roboto SemiBold"],
      },
      colors: {
        transparent: "transparent",
        primary: "#122045",
        accent: "#BB2557",
        light: "#fafafa",
        primaryLight: "#f0f2f5",
        primaryText: "#666666",
      },
    },
  },
  plugins: [],
};
