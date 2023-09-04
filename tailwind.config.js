module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        60: "60px",
        80: "80px",
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
        "c-1/3": "30%",
        "c-1/2": "40%",
        "c-85": "85%",
        "c-1": "90%",
        "c-55": "55%",
        "c-70": "70%",
      },
      height: {
        60: "60px",
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        100: "100px",
        210: "210px",
        300: "300px",
        350: "350px",
        620: "620px",
      },
      minHeight: {
        30: "30px",
        210: "210px",
        300: "300px",
        350: "350px",
        620: "620px",
      },
      maxWidth: {
        230: "230px",
      },
      maxHeight: {
        230: "230px",
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(256,256,256,0.4)",
        darkOverlay: "rgba(0,0,0,0.5)",
        lightOverlay: "rgba(256,256,256,0.2)",
        lighttextGray: "#9ca0ab",
        card: "rgba(256,256,256,0.8)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
        loaderOverlay: "rgba(256,256,256,0.1)",
        inputColor: "#eaf1fb",
        backColor: "rgb(28, 184, 3)",
        headerColor: "#f1f3f4",
        subColor: "#dee5e8",
        skeletonColor: "#e2e5e7",
      },
    },
    screens: {
      sm: { max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      // lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
      medium: { min: "768px", max: "1280px" },

      lg: { max: "1280px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      xl: { min: "1280px" },
      // => @media (min-width: 1536px) { ... }
    },
    keyframes: {
      skeleton: {
        to: {
          "background-position": "right -40px top 0",
        },
      },
    },
    animation: {
      animate_skeleton: "skeleton 1s ease infinite",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      // "100%": "100%",
      // "40px": "40px",
      skeleton_size: "40px 100%",
    },
    backgroundPosition: {
      left: "left",
      top: "top",
      0: "0",
      skeleton_position: "left -40px top 0",
      center: "center",
    },
    backgroundImage: {
      //  'hero-pattern': "url('/img/hero-pattern.svg')",
      //  'footer-texture': "url('/img/footer-texture.png')",
      skeleton_image:
        "linear-gradient(90deg,rgba(#fff, 0),rgba(#fff, 0.5),rgba(#fff, 0))",
    },
    // fontSize: {
    //   sm: "12px",
    //   base: "14px",
    //   xl: "1.25rem",
    //   "2xl": "1.563rem",
    //   "3xl": "1.953rem",
    //   "4xl": "2.441rem",
    //   "5xl": "3.052rem",
    // },
  },
  plugins: [
    // require("tailwind-scrollbar")
  ],
};
