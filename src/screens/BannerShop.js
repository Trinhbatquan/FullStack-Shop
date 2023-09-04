import React from "react";
import Slider from "react-slick";

const BannerShop = ({ settings }) => {
  console.log(settings);
  return (
    <div className="mx-auto my-4" style={{ width: "90%", height: "370px" }}>
      {/* <div
        className=""
        style={{
          width: "700px",
          height: "360px",
          backgroundImage: "url('/assets/image/banner1.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div> */}
      <Slider {...settings}>
        {/* <img src="/assets/image/banner1.png" alt="None" /> */}
        <div
          style={{
            minWidth: "100%",
            minHeight: "260px",
            width: "100%",
            height: "360px",
          }}
        >
          <div
            className=""
            style={{
              width: "100%",
              height: "360px",
              backgroundImage: "url('/assets/image/banner1.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div
          style={{
            minWidth: "100%",
            minHeight: "260px",
            width: "100%",
            height: "360px",
          }}
        >
          <div
            className=""
            style={{
              width: "100%",
              height: "360px",
              backgroundImage: "url('/assets/image/banner2.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div
          style={{
            minWidth: "100%",
            minHeight: "260px",
            width: "100%",
            height: "360px",
          }}
        >
          <div
            className=""
            style={{
              width: "100%",
              height: "360px",
              backgroundImage: "url('/assets/image/banner3.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        {/* <div
          style={{
            minWidth: "100%",
            minHeight: "260px",
            width: "100%",
            height: "360px",
          }}
        >
          <div
            className=""
            style={{
              width: "100%",
              height: "360px",
              backgroundImage: "url('/assets/image/banner4.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div> */}
        <div
          style={{
            minWidth: "100%",
            minHeight: "260px",
            width: "100%",
            height: "360px",
          }}
        >
          <div
            className=""
            style={{
              width: "100%",
              height: "360px",
              backgroundImage: "url('/assets/image/banner5.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerShop;
