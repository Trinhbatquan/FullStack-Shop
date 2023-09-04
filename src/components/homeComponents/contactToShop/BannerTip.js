import React from "react";
import "./BannerTip.css";

const BannerTip = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="sm:w-4/5 sm:rounded-md w-full relative my-auto flex items-center justify-center mx-auto mt-10"
      style={{
        minHeight: "360px",
        height: "500px",
        backgroundImage: `url("./assets/image/tip.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
      }}
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0  my-auto flex items-center justify-center mx-auto"
        style={{ backgroundColor: "rgba(0,0,0,0.35" }}
      >
        <div className="flex flex-col items-center justify-center text-center w-full">
          <h2
            className="text-2xl font-semibold mb-1 opacity-90"
            style={{ color: "#fff", textShadow: "0 0 #fff", fontWeight: "800" }}
          >
            DO YOU NEED MORE TIPS?
          </h2>
          <p
            className="text-lg pb-4 opacity-90"
            style={{ color: "#fff", textShadow: "0 0 #fff", fontWeight: "800" }}
          >
            Sign up free and get the latest tips.
          </p>
          <form
            onSubmit={handleSubmit}
            className="px-1 py-4 relative"
            style={{ minWidth: "70%" }}
          >
            <input
              placeholder="Your email..."
              type="email"
              name="email"
              className="banner-tip-input text-center py-3 opacity-90 placeholder:text-slate-500
                    rounded-3xl outline-none focus:opacity-100 focus:shadow-lg placeholder:text-md text-md duration-300 transition-all
                    focus:bg-white"
              style={{
                minWidth: "80%",
                backgroundColor: "rgb(238, 225, 225)",
              }}
            />
            <input
              value="Yes. I want!"
              name="subscribe"
              type="submit"
              className="banner-tip-submit-input xl:absolute sm:mt-3 medium:absolute right-16 px-10 py-3.5 rounded-3xl text-sm
                    backdrop-blur-md cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-300 font-semibold"
              style={{
                backgroundColor: "rgb(48, 180, 29)",
                color: "rgb(28, 58, 23)",
                fontWeight: "600",
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerTip;
