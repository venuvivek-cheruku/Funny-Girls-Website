/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js,php}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./courses/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "productHeroImage": "url('./assets/images/bg.png')",
      },
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
        DmSans:["DM Sans"],
        DMSerif:["DM Serif Display"]
      },
      colors: {
        transparent: "transparent",
        darkBlue: "#171921",
        haiti:"#2B2934", 
        accentPink: "#E12C68",
        black: "#000000",
        white: "#FFFFFF",
        whiteShade: "rgba(255, 255, 255, 0.7)",
        whiteText: "rgba(255, 255, 255, 0.8)",
        accentPinkDimmed: "rgba(225, 44, 104, 0.8)"
      },
    },
  },
  plugins: [],
};
