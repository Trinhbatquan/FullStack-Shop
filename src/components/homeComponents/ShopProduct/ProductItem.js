import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Rating from "../Rating/Rating";

import { AiOutlineCheck } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getFavoriteByUser, removeFavorite } from "api";
import { getAllFavorites } from "reduxToolkit/favoriteSlice";
import { useDispatch } from "react-redux";

import lozad from "lozad";
import Loading from "components/loadingToast/Loading";
import { toast } from "react-toastify";
import i18n from "i18n";

const ProductItem = ({ product, favorite, type }) => {
  // using CommonJS modules

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFavoriteProduct = () => {
    setLoading(true);
    setTimeout(() => {
      removeFavorite(product?._id).then((data) => {
        console.log("data" + JSON.stringify(data));
        if (data?.code === 0) {
          getFavoriteByUser().then((res) => {
            if (res?.code === 0) {
              dispatch(getAllFavorites(res?.favoriteArr));
            }
            setLoading(false);
            toast.success(
              `${
                i18n.language === "en"
                  ? "Delete Successfully."
                  : "Xoá thành công."
              }`,
              {
                autoClose: 3000,
                position: "bottom-right",
                theme: "colored",
              }
            );
          });
        }
      });
    }, 1000);
  };

  useEffect(() => {
    const lazyLoadImg = () => {
      lozad(".lozad", {
        load: function (el) {
          console.log(el);
          el.src = el.dataset.src;
          el.onload = function () {
            el.classList.add("fade");
          };
        },
      }).observe();
    };
    if (!type) {
      lazyLoadImg();
    }
  }, []);

  const handleBuyNow = (product) => {
    navigate(`/cart/${product._id}?qty=${1}`);
  };

  return (
    <>
      <div
        className={`product-item flex flex-col rounded-md shadow-lg
                        bg-white cursor-pointer mx-auto w-full
                        border border-gray-200 pb-2 relative ${
                          favorite ? "" : "hover:-translate-y-1"
                        } transition-all duration-200`}
      >
        <img
          // whileTap={{ scale: 0.95 }}
          className="lozad"
          data-src={product?.image}
          src={type === "search-page" ? product?.image : ""}
          alt="None"
          style={{
            // backgroundImage: `url(${product?.image})`,
            // backgroundImage: `url(../../../assets/img/image1.jpg)`,
            // paddingTop: "140%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "330px",
            objectFit: "cover",
          }}
        ></img>
        <p
          className="mt-2 text-md sm:text-sm"
          style={{
            color: "#333",
            fontWeight: "400",
            lineHeight: "18px",
            margin: "10px 5px 5px 6px",
            height: "36px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
          }}
        >
          {product?.name}
        </p>

        <div className="flex items-center justify-between mx-1 my-1.5">
          <span className="text-red-700 flex items-center justify-center text-lg sm:text-md">
            <span className="relative -top-1">$</span>
            {product?.price}
          </span>
        </div>
        <div className="flex items-center justify-start ml-2 gap-1 mb-1.5">
          <Rating value={product?.rating} />
          <span
            className="text-sm sm:text-xs opacity-70"
            style={{ color: "#333" }}
          >
            {`Sold ${product?.sold}`}
          </span>
        </div>
        <div className="flex items-center justify-between ml-2 gap-1">
          <span
            className="text-sm sm:text-xs opacity-70 text-black"
            style={{ color: "#333" }}
          >
            {product?.position}
          </span>
          <span
            className="text-sm sm:text-xs opacity-70 text-black mr-2"
            style={{ color: "#333" }}
          >
            {`Review ${product?.numReviews}`}
          </span>
        </div>
        {favorite && (
          <>
            <div className="flex items-center justify-center px-2 py-2">
              <div
                onClick={() => handleBuyNow(product)}
                className="w-full flex items-center justify-center transition-all duration-300 border text-blue-600 border-blue-600 rounded-md hover:text-white hover:bg-blue-600"
              >
                <span className="py-2 px-1 mx-auto text-md sm:text-sm">
                  {i18n.language === "en" ? "Buy now" : "Mua ngay"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center px-2 py-2">
              <div
                className="w-full flex items-center justify-center transition-all duration-300 border   border-red-500 rounded-md text-red-500 hover:text-white hover:bg-red-500"
                onClick={handleRemoveFavoriteProduct}
              >
                <div className="py-2 px-1 mx-auto flex items-center justify-center ">
                  <RiDeleteBin6Line className="text-xl sm:text-lg" />
                  <span className="text-md sm:text-sm">
                    {i18n.language === "en" ? "Remove now" : "Xoá ngay"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        {product?.favorite && (
          <div
            class="absolute flex items-center justify-start"
            style={{
              top: "10px",
              left: "-4px",
              color: "white",
              backgroundColor: "rgb(247, 70, 46)",
              padding: "2px 4px 2px 0",
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "16px",
              paddingRight: "4px",
              borderTopRightRadius: "3px",
              borderBottomRightRadius: "3px",
            }}
          >
            <AiOutlineCheck
              style={{
                color: "white",
                fontSize: "9px",
                margin: "0 2px 0 5px",
              }}
            ></AiOutlineCheck>
            <span className="text-white">Favorite</span>
            <div
              style={{
                position: "absolute",
                bottom: -3,
                left: 0,
                borderTop: "3.5px solid rgb(247, 70, 46)",
                borderLeft: "3.5px solid transparent",
                filter: "brightness(60%)",
              }}
            ></div>
          </div>
        )}
        {product?.discount > 0 && (
          <div
            class="product-item__sale absolute top-0 right-0 flex flex-col items-center justify-center gap-1"
            style={{
              height: "42px",
              width: "40px",
              backgroundColor: "rgba(255, 218, 75, 0.98)",
              textAlign: "center",
            }}
          >
            <span
              class="product-item__sale-number"
              style={{
                color: "rgb(247, 70, 46)",
                lineHeight: "12px",
                top: "2px",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              {`${product?.discount}%`}
            </span>
            <span
              class="product-item__sale-reduce text-white text-xs font-semibold"
              style={{
                lineHeight: "12px",
                top: "2px",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              DEC
            </span>
            <div
              className="absolute right-0 top-full"
              style={{
                borderStyle: "solid",
                borderWidth: "0 20px 5px",
                borderColor:
                  "transparent rgba(255, 218, 75, 0.98) transparent rgba(255, 218, 75, 0.98)",
              }}
            ></div>
          </div>
        )}
      </div>
      {loading && (
        <div className="fixed z-50 top-0 bottom-0 flex items-center justify-center mx-auto left-0 right-0 w-full max-h-full bg-black bg-opacity-25">
          <div className="absolute top-[50%] left-[50%]">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
