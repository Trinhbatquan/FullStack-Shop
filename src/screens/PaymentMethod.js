import { Header } from "components";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const PaymentMethod = () => {
  const [checked, setChecked] = useState(false);
  const radioRef = useRef();
  const navigate = useNavigate();

  const handleSavedMethod = () => {
    if (!radioRef.current.checked) {
      toast.error("Please check the field", {
        autoClose: 3000,
      });
    } else {
      navigate("/placeOrder");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <ToastContainer />
        <div
          className="medium:border-none medium:outline-none sm:border-none sm:outline-none shadow-lg backdrop-blur-sm 
                  rounded-sm px-2 py-4 mt-16 border border-gray-200 flex flex-col items-center"
        >
          <span className="text-black font-semibold text-xl text-center">
            SELECT PAYMENT METHOD
          </span>
          <form
            className="flex flex-col items-center"
            style={{ minWidth: "100%", width: "100%" }}
          >
            <div className="w-full flex items-center py-4 px-6 mb-3 mt-1">
              <input
                name="address"
                type="radio"
                value="PayPal or Credit Card"
                ref={radioRef}
                onChange={() => setChecked(true)}
              />
              <span className="text-headingColor text-lg ml-2">
                PayPal or Credit Card
              </span>
            </div>

            <div
              className="py-4 px-4 mb-6 mt-1 cursor-pointer text-headingColor text-lg 
                          font-semibold opacity-80 hover:opacity-100
                          mx-auto"
              style={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "#1cb803",
              }}
            >
              <button
                type="button"
                className="w-full"
                onClick={handleSavedMethod}
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
