import React from "react";
import Skeleton from "utils/Skeleton";

const LoadingSkeleton = () => {
  return (
    <div
      className="product-item flex flex-col rounded-md shadow-lg
                        bg-white cursor-pointer mx-auto w-full
                        border border-gray-200 pb-2 relative"
    >
      <Skeleton
        // whileTap={{ scale: 0.95 }}
        // className="hover:scale-95"
        className="h-[310px]"
        style={
          {
            // backgroundImage: `url(${product?.image})`,
            // backgroundImage: `url(../../../assets/img/image1.jpg)`,
            // paddingTop: "140%",
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "cover",
            // objectFit: "contain",
          }
        }
      ></Skeleton>
      <p
        className="mt-2"
        style={
          {
            // color: "#333",
            // fontWeight: "400",
            // lineHeight: "18px",
            // // margin: "10px 5px 5px 6px",
            // height: "36px",
            // overflow: "hidden",
            // display: "-webkit-box",
            // WebkitBoxOrient: "vertical",
            // WebkitLineClamp: "2",
          }
        }
      >
        <Skeleton className="h-[16px] mx-1 mb-0.5"></Skeleton>
        <Skeleton className="h-[16px] mx-1 mb-2"></Skeleton>
        {/* {product?.name} */}
        {/* <Skeleton /> */}
      </p>

      <div className="flex items-center justify-between mx-1 my-1.5">
        {/* <span className="text-red-700 flex items-center justify-center text-lg">
          <span className="relative -top-1">$</span>
          {product?.price}
          <Skeleton />
        </span> */}
        {/* <AiFillHeart /> */}
        <Skeleton className="w-full h-[28px]" />
      </div>
      {/* <div className="flex items-center justify-start ml-2 gap-1 mb-1.5"> */}
      {/* <Rating value={product?.rating} />
        <span className="text-sm opacity-70" style={{ color: "#333" }}>
          {`Sold ${product?.sold}`}
        </span> */}
      <Skeleton className="flex items-center justify-start mb-1.5 h-[20px] mx-1" />
      {/* </div> */}
      <Skeleton className="flex items-center justify-start h-[20px] mx-1" />
      {/* <div className="flex items-center justify-between ml-2 gap-1"> */}
      {/* <span
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
        </span> */}
      {/* </div> */}
      {/* {product?.favorite && (
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
      )} */}
    </div>
  );
};

export default LoadingSkeleton;
