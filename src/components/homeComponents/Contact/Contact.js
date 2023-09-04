import React from "react";

import { BsFillTelephoneFill, BsCreditCardFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { FaFax, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";

const Contact = () => {
  return (
    <div className="w-full flex flex-col justify-center xl:h-510 medium:h-510 sm:h-600">
      <div
        className="bg-white flex flex-row sm:flex-col items-center justify-evenly"
        style={{ minHeight: "80%" }}
      >
        <div className="flex flex-col items-center justify-center">
          <BsFillTelephoneFill
            className="bg-primary text-xs p-3 rounded-full"
            style={{
              border: "3px solid #1cb803",
              color: "#1cb803",
              width: "60px",
              height: "60px",
            }}
          />
          <p className="font-semibold text-xl mt-3 text-headingColor">
            Call Us 24x7
          </p>
          <p className="text-md mt-1">0796 065 535</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <GiPositionMarker
            className="bg-primary text-xs p-3 rounded-full"
            style={{
              border: "3px solid #1cb803",
              color: "#1cb803",
              width: "60px",
              height: "60px",
            }}
          />
          <p className="font-semibold text-xl mt-3 text-headingColor">
            Position
          </p>
          <p className="text-md mt-1">Ha Noi, Viet Nam</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FaFax
            className="bg-primary text-xs p-3 rounded-full"
            style={{
              border: "3px solid #1cb803",
              color: "#1cb803",
              width: "60px",
              height: "60px",
            }}
          />
          <p className="font-semibold text-xl mt-3 text-headingColor">Fax</p>
          <p className="text-md mt-1">0796 065 535</p>
        </div>
      </div>

      <div
        className="bg-slate-200 flex items-center justify-center"
        style={{ minHeight: "20%" }}
      >
        <FaCcMastercard className="text-5xl mr-6 cursor-pointer text-cartBg" />
        <RiVisaLine className="text-5xl mr-6 cursor-pointer text-blue-800" />
        <FaCcPaypal className="text-5xl mr-6 cursor-pointer " />
        <BsCreditCardFill className="text-5xl mr-6 cursor-pointer text-gray-700" />
      </div>
    </div>
  );
};

export default Contact;
