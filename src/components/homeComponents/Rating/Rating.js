import React from "react";

import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";

const Rating = ({ value, font }) => {
  return (
    <div className="flex items-center justify-center gap-0.5">
      <i>
        {+value > 1 && (
          <BsStarFill
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value < 1 && +value > 0 && (
          <BsStarHalf
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value == 0 && (
          <BsStar
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
      </i>

      <i>
        {+value >= 2 && (
          <BsStarFill
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value < 2 && +value > 1 && (
          <BsStarHalf
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value <= 1 && (
          <BsStar
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
      </i>

      <i>
        {+value >= 3 && (
          <BsStarFill
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value < 3 && +value > 2 && (
          <BsStarHalf
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value <= 2 && (
          <BsStar
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
      </i>

      <i>
        {+value >= 4 && (
          <BsStarFill
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value < 4 && +value > 3 && (
          <BsStarHalf
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value <= 3 && (
          <BsStar
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
      </i>

      <i>
        {+value >= 5 && (
          <BsStarFill
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value < 5 && +value > 4 && (
          <BsStarHalf
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
        {+value <= 4 && (
          <BsStar
            className={`${font === "md" ? "text-md" : "text-xs"}`}
            style={{ color: "#1cb803" }}
          />
        )}
      </i>
    </div>
  );
};

export default Rating;
