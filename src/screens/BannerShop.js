import React from "react";
import Slider from "react-slick";

const BannerShop = ({ settings }) => {
  console.log(settings);
  return (
    <div className="mx-auto my-4 sm:my-0 xl:w-[90%] lg:w-[90%] xl:h-[370px] lg:h-[370px] md:h-[220px] md:w-full sm:w-full sm:h-[100px]">
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
          className="xl:h-[360px] lg:h-[360px] md:h-[220px] sm:h-[100px] bg-cover "
          style={{
            minWidth: "100%",
            minHeight: "100px",
            width: "100%",
            height: "360px",
          }}
        >
          <div
            className="xl:h-[360px] lg:h-[360px] md:h-[220px] sm:h-[100px] bg-cover "
            style={{
              width: "100%",
              backgroundImage: "url('/assets/image/banner1.png')",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <div
          style={{
            minWidth: "100%",
            minHeight: "100px",
            width: "100%",
          }}
        >
          <div
            className="xl:h-[360px] lg:h-[360px] md:h-[220px] sm:h-[100px] bg-cover "
            style={{
              width: "100%",
              backgroundImage: "url('/assets/image/banner2.png')",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <div
          style={{
            minWidth: "100%",
            minHeight: "100px",
            width: "100%",
          }}
        >
          <div
            className="xl:h-[360px] lg:h-[360px] md:h-[220px] sm:h-[100px] bg-cover "
            style={{
              width: "100%",
              backgroundImage: "url('/assets/image/banner3.png')",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <div
          style={{
            minWidth: "100%",
            minHeight: "100px",
            width: "100%",
          }}
        >
          <div
            className="xl:h-[360px] lg:h-[360px] md:h-[220px] sm:h-[100px] bg-cover "
            style={{
              width: "100%",
              backgroundImage: "url('/assets/image/banner5.png')",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerShop;
