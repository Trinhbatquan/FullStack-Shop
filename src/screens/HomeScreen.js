import React, { useState, useEffect, lazy, Suspense } from "react";
import { NextArrow, PrevArrow } from "./ArrowCustom";

// import { Header, ShopProduct, BannerTip, Contact } from "../components";
// import BannerShop from "./BannerShop";
import "./ArrowCustom.css";
import { Loading } from "components";
import axios from "axios";
// import RuleOfWork from "./RuleOfWork";

const Header = lazy(() => import("../components/Header"));
const BannerShop = lazy(() => import("./BannerShop"));
const RuleOfWork = lazy(() => import("./RuleOfWork"));
const ShopProduct = lazy(() =>
  import("../components/homeComponents/ShopProduct/ShopProduct")
);
const BannerTip = lazy(() =>
  import("../components/homeComponents/contactToShop/BannerTip")
);
const Contact = lazy(() =>
  import("../components/homeComponents/Contact/Contact")
);
const HomeScreen = () => {
  const setting = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      //   {
      //     breakpoint: 1536,
      //     settings: {
      //       dots: false,
      //       infinite: true,
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       autoplay: true,
      //       autoplaySpeed: 3000,
      //       pauseOnHover: true,
      //       nextArrow: <NextArrow />,
      //       prevArrow: <PrevArrow />,
      //     },
      //   },
      //   {
      //     breakpoint: 1280,
      //     settings: {
      //       dots: false,
      //       infinite: true,
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       autoplay: true,
      //       autoplaySpeed: 3000,
      //       pauseOnHover: true,
      //       nextArrow: <NextArrow />,
      //       prevArrow: <PrevArrow />,
      //     },
      //   },
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       dots: false,
      //       infinite: true,
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       autoplay: true,
      //       autoplaySpeed: 3000,
      //       pauseOnHover: true,
      //       nextArrow: <NextArrow />,
      //       prevArrow: <PrevArrow />,
      //     },
      //   },
      {
        breakpoint: 1023,
        settings: {
          // dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          nextArrow: <NextArrow type="disable" />,
          prevArrow: <PrevArrow type="disable" />,
        },
      },
      {
        breakpoint: 768,
        settings: {
          // dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          nextArrow: <NextArrow type="disable" />,
          prevArrow: <PrevArrow type="disable" />,
        },
      },
      {
        breakpoint: 480,
        settings: {
          // dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          nextArrow: <NextArrow type="disable" />,
          prevArrow: <PrevArrow type="disable" />,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    console.log("mounted hay re-render");
  }, []);

  // const [titleVn, setTitleVn] = useState("");
  // const [titleEn, setTitleEn] = useState("");
  // const [detailVn, setDetailVn] = useState("");
  // const [detailEn, setDetailEn] = useState("");
  // const [img, setImg] = useState("");

  // const handleImage = async (e) => {
  //   console.log(e.target.files[0]);
  //   const demo = await toBase64(e.target.files[0]);
  //   setImg(demo);
  // };

  // const handleSubmit = async () => {
  //   const body = {
  //     titleVn,
  //     titleEn,
  //     detailVn,
  //     detailEn,
  //     image: img,
  //   };

  //   const res = await axios.post("http://localhost:4000/add/image", {
  //     ...body,
  //   });
  //   console.log(res.data);
  // };

  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = reject;
  //   });

  return (
    <Suspense fallback={<Loading />}>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Header />
        <div style={{ height: "65px", width: "100%" }}></div>
        <BannerShop settings={setting} />
        <RuleOfWork />
        <ShopProduct />
        {/* <hr /> */}
        <BannerTip />
        <Contact />
      </div>
    </Suspense>
    // <>
    //   <textarea
    //     type="text"
    //     value={titleVn}
    //     onChange={(e) => setTitleVn(e.target.value)}
    //   />
    //   <textarea
    //     type="text"
    //     value={titleEn}
    //     onChange={(e) => setTitleEn(e.target.value)}
    //   />
    //   <textarea
    //     type="text"
    //     value={detailVn}
    //     onChange={(e) => setDetailVn(e.target.value)}
    //   />
    //   <textarea
    //     type="text"
    //     value={detailEn}
    //     onChange={(e) => setDetailEn(e.target.value)}
    //   />
    //   <input type="file" onChange={(e) => handleImage(e)} />
    //   <button onClick={handleSubmit}>Submit</button>
    // </>
  );
};

export default HomeScreen;
