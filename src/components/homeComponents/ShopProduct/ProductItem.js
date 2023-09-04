import React from "react";
import { motion } from "framer-motion";
import Rating from "../Rating/Rating";

import { AiOutlineCheck } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getFavoriteByUser, removeFavorite } from "api";
import { getAllFavorites } from "reduxToolkit/favoriteSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ product, favorite }) => {
  const dispatch = useDispatch();

  const handleRemoveFavoriteProduct = () => {
    removeFavorite(product?._id).then((data) => {
      console.log("data" + JSON.stringify(data));
      if (data?.code === 0) {
        getFavoriteByUser().then((res) => {
          if (res?.code === 0) {
            dispatch(getAllFavorites(res?.favoriteArr));
          }
        });
      }
    });
  };

  return (
    <div
      className="product-item flex flex-col rounded-md shadow-lg
                        bg-white cursor-pointer mx-auto w-full
                        border border-gray-200 pb-2 relative hover:-translate-y-1 transition-all duration-200"
    >
      <motion.div
        // whileTap={{ scale: 0.95 }}
        // className="hover:scale-95"
        style={{
          backgroundImage: `url(${product?.image})`,
          // backgroundImage: `url(../../../assets/img/image1.jpg)`,
          paddingTop: "140%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // objectFit: "contain",
        }}
      ></motion.div>
      <p
        className="mt-2 text-md"
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
        <span className="text-red-700 flex items-center justify-center text-lg">
          <span className="relative -top-1">$</span>
          {product?.price}
        </span>
      </div>
      <div className="flex items-center justify-start ml-2 gap-1 mb-1.5">
        <Rating value={product?.rating} />
        <span className="text-sm opacity-70" style={{ color: "#333" }}>
          {`Sold ${product?.sold}`}
        </span>
      </div>
      <div className="flex items-center justify-between ml-2 gap-1">
        <span
          className="text-sm opacity-70 text-black"
          style={{ color: "#333" }}
        >
          {product?.position}
        </span>
        <span
          className="text-sm opacity-70 text-black mr-2"
          style={{ color: "#333" }}
        >
          {`Review ${product?.numReviews}`}
        </span>
      </div>
      {favorite && (
        <>
          <div className="flex items-center justify-center px-2 py-2">
            <NavLink
              to=""
              className="w-full flex items-center justify-center border border-blue-700 rounded-md"
            >
              <span className="py-2 px-1 mx-auto text-md text-blue-600">
                Buy now
              </span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center px-2 py-2">
            <div
              className="w-full flex items-center justify-center border border-red-700 rounded-md"
              onClick={handleRemoveFavoriteProduct}
            >
              <div className="py-2 px-1 mx-auto flex items-center justify-center">
                <RiDeleteBin6Line className="text-xl text-red-600" />
                <span className="text-md text-red-700">Remove now</span>
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
  );
};

export default ProductItem;
