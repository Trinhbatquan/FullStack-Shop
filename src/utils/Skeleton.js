import React from "react";

const Skeleton = ({ className, style }) => {
  // const myType = {
  //   backgroundImage:
  //     "linear-gradient(90deg,rgba(#fff, 0),rgba(#fff, 0.5),rgba(#fff, 0))",
  // };
  // console.log(style);
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        ...style,
        // myType,
        // backgroundColor: "#e2e5e7",
        // backgroundImage:
        //   "linear-gradient(90deg,rgba(#fff, 0),rgba(#fff, 0.5),rgba(#fff, 0))",
        // backgroundSize: "40px 100%",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "left -40px top 0",
      }}
    ></div>
  );
};

export default Skeleton;

//  bg-skeletonColor bg-skeleton_size bg-no-repeat bg-skeleton_position bg-skeleton_image animate-animate_skeleton
