import { Header } from "components";
import React from "react";
// import {Banner} from '../assets/img/index'
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };
  return (
    <div className="w-full">
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div
        className="flex flex-col justify-center items-center gap-2 mx-auto mt-5"
        style={{ minWidth: "30%", width: "50%" }}
      >
        <span className="text-lg text-blue-500">Page Not Found</span>
        <button
          type="button"
          class="py-2.5 h-16 w-full px-5 mr-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          onClick={() => handleReturn()}
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
