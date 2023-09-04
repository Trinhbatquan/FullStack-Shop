import React, { useState, useEffect } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { Header, Loading } from "components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { dataImage } from "../assets/img/index";
import { getOrderById, updateOrderPay } from "reduxToolkit/orderSlice";
import { orderById, updateOrderWhenPay } from "api/index";
import { FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { motion } from "framer-motion";
import moment from "moment";

const PlaceOrderScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orderItemById = useSelector((state) => state.orderSlice.orderId);
  const redirectedFromProfile = useLocation().search.split("=/")[1];
  console.log(redirectedFromProfile);
  const {
    shippingAddress,
    user,
    orderItems,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  } = orderItemById;

  const updateOrderWhenPayment = useSelector(
    (state) => state.orderSlice.orderUpdatePay
  );
  const { paidAt, paymentResult, isPaid, isDelivered, _id } =
    updateOrderWhenPayment;
  let status = "";
  if (paymentResult) {
    status = paymentResult?.status;
  }
  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!redirectedFromProfile === "order") {
      setIsLoading(true);
      orderById(id.id).then((orderId) => {
        dispatch(getOrderById(orderId));
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
      orderById(id.id).then((orderId) => {
        dispatch(getOrderById(orderId));
        dispatch(updateOrderPay(orderId));
        setIsLoading(false);
      });
    }
  }, []);

  const handleUpdateOrderPay = () => {
    setIsLoading(true);
    setTimeout(() => {
      updateOrderWhenPay(id.id, {
        ...orderItemById,
        status: "Completed",
        update_time: Date.now(),
        email_address: user?.email,
      }).then((updateOrder) => {
        dispatch(updateOrderPay(updateOrder));
        setIsLoading(false);
      });
    }, 1000);
  };

  return (
    <>
      <Header />
      <div
        className="flex flex-col mx-auto mt-8 xl:py-8"
        style={{ minWidth: "90%", width: "90%" }}
      >
        {isLoading && <Loading />}
        <div
          className="w-full h-72 medium:h-auto sm:h-auto bg-slate-200 flex items-center justify-between 
          rounded-md shadow-lg backdrop-blur-sm medium:backdrop-blur-none sm:backdrop-blur-none
          medium:flex-wrap sm:flex-wrap medium:py-8 sm:py-8 sm:pl-4 medium:justify-start medium:gap-12 sm:justify-start sm:gap-10"
        >
          <div className="flex items-center xl:justify-center xl:flex-1 medium:w-c-1/2 sm:w-c-1 medium:ml-10 sm:mf-4">
            <BsFillPersonFill
              className="sm:hidden text-4xl p-3 border border-gray-300 rounded-full shadow-lg
             backdrop-blur-md medium:backdrop-blur-none sm:backdrop-blur-none bg-slate-100 text-slate-400 mr-8"
              style={{
                minHeight: "80px",
                minWidth: "80px",
                height: "80px",
                width: "80px",
              }}
            />
            <div>
              <span className="font-semibold sm:text-lg text-headingColor">
                Customer
              </span>
              <p className="text-black sm:text-md opacity-80 mt-1">
                {user?.name}
              </p>
              <p className="text-black sm:text-md opacity-80">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center xl:justify-center xl:flex-1 relative  medium:w-c-1/2 sm:w-c-1 medium:ml-10 sm:mf-4 sm:pb-10">
            <FaShippingFast
              className="sm:hidden text-4xl p-3 border border-gray-300 rounded-full shadow-lg
             backdrop-blur-md medium:backdrop-blur-none sm:backdrop-blur-none bg-slate-100 text-slate-400 mr-8"
              style={{
                minHeight: "80px",
                minWidth: "80px",
                height: "80px",
                width: "80px",
              }}
            />
            <div className="w-full">
              <span className="font-semibold sm:text-lg text-headingColor">
                Order info
              </span>
              <p className="text-black sm:text-md opacity-80 mt-1">
                Shipping: {shippingAddress?.country}
              </p>
              <p className="text-black sm:text-md opacity-80">
                Pay method: {paymentMethod}
              </p>
            </div>
            <button
              type="button"
              className={`py-2 px-1 absolute left-28 right-0 top-28 medium:top-36 sm:top-24 sm:left-0 rounded-md sm:text-md font-semibold text-white 
              ${isPaid && _id == id.id ? "bg-backColor" : "bg-red-700"}`}
              style={{ minWidth: "60%", width: "60%" }}
            >
              {isPaid && _id == id.id
                ? `Paid ${status} at ${moment(paidAt).calendar()}`
                : "Not Paid"}
            </button>
          </div>
          <div className="flex items-center xl:justify-center xl:flex-1 relative  medium:w-c-1/2 sm:w-c-1 medium:ml-10 sm:mf-4 sm:pb-10">
            <FaShippingFast
              className="sm:hidden text-4xl p-3 border border-gray-300 rounded-full shadow-lg
             backdrop-blur-md medium:backdrop-blur-none sm:backdrop-blur-none bg-slate-100 text-slate-400 mr-8"
              style={{
                minHeight: "80px",
                minWidth: "80px",
                height: "80px",
                width: "80px",
              }}
            />
            <div className="w-full">
              <span className="font-semibold sm:text-lg text-headingColor">
                Delivery to
              </span>
              <p className="text-black sm:text-md opacity-80 mt-1">
                Address: {shippingAddress?.address}, {shippingAddress?.city}
              </p>
              <p className="text-black sm:text-md opacity-80">
                Postal Code: {shippingAddress?.postalCode}
              </p>
            </div>
            <button
              type="button"
              className="bg-red-700 py-2 absolute left-28 right-0 top-32 medium:top-10 medium:left-72 sm:left-0 sm:top-24 rounded-md sm:text-md font-semibold text-white"
              style={{ minWidth: "60%", width: "60%" }}
            >
              {isDelivered || "Not Delivery"}
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between mt-8 sm:flex-col sm:gap-4">
          <div className="w-c-70 flex flex-col border-r-2 border-gray-400 sm:border-none sm:w-full">
            {orderItems?.map((cart, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex items-center justify-between w-full sm:flex-col sm:items-center 
                      sm:justify-center sm:gap-2 sm:mx-auto sm:border-b-2 sm:border-gray-200 sm:py-6"
                  >
                    <div className="flex items-center justify-between sm:mx-auto">
                      <img
                        // src={dataImage[cart?.image]}
                        alt="None"
                        className="w-40 h-40 sm:w-64 sm:h-64  object-cover p-2 bg-slate-100 cursor-pointer rounded-sm shadow-sm"
                      />
                    </div>

                    <div
                      className="flex items-center justify-center flex-1  gap-20
                      medium:flex-col medium:items-center medium:justify-center medium:gap-4 medium:ml-10
                      sm:flex-col sm:gap-2 sm:items-center sm:justify-center"
                    >
                      <span className="sm:text-md sm:text:md text-black font-semibold medium:ml-0 sm:ml-0 medium:w-full sm:w-full">
                        {cart?.name}
                      </span>
                      <div className="flex items-center justify-start medium:w-full sm:w-full gap-20">
                        <div>
                          <p className="text-headingColor sm:text-md opacity-80">
                            Quantity
                          </p>
                          <p className="ml-8 sm:text-sm">{cart?.qty}</p>
                        </div>
                        <div>
                          <p className="text-headingColor sm:text-md opacity-80">
                            SubTotal
                          </p>
                          <p className="ml-1 sm:text-sm">
                            {cart?.qty * cart?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr
                    className="text-black text-center ml-0"
                    style={{ maxWidth: "80%", width: "80%" }}
                  />
                </>
              );
            })}
          </div>

          <div className="w-1/4 sm:w-c-1 flex flex-col justify-start mt-8 text-center rounded-md sm:py-4 sm:mt-0 sm:mx-auto">
            <div
              className="flex items-center"
              style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
            >
              <div className="flex-1 py-2 px-1  text-black font-semibold sm:text-md">
                Products
              </div>
              <div className="flex-1 py-2 px-1">{itemsPrice}</div>
            </div>

            <hr
              className="text-black text-center mx-auto"
              style={{ maxWidth: "80%", width: "80%" }}
            />

            <div
              className="flex items-center"
              style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
            >
              <div className="flex-1 py-2 px-1  text-black font-semibold sm:text-md">
                Shipping
              </div>
              <div className="flex-1 py-2 px-1">{shippingPrice}</div>
            </div>

            <hr
              className="text-black text-center mx-auto"
              style={{ maxWidth: "80%", width: "80%" }}
            />

            <div
              className="flex items-center"
              style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
            >
              <div className="flex-1 py-2 px-1  text-black font-semibold sm:text-md">
                Tax
              </div>
              <div className="flex-1 py-2 px-1">{taxPrice}</div>
            </div>

            <hr
              className="text-black text-center mx-auto"
              style={{ maxWidth: "80%", width: "80%" }}
            />

            <div
              className="flex items-center"
              style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
            >
              <div className="flex-1 py-2 px-1  text-black font-semibold sm:text-md">
                Total
              </div>
              <div className="flex-1 py-2 px-1">{totalPrice}</div>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <motion.div
                initial={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -50 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  className={`w-4/5 mx-auto bg-yellow-400 py-1 rounded-md mt-3 cursor-pointer mb-2 
                flex items-center justify-center ${
                  isPaid && _id == id.id ? "opacity-60 cursor-text" : null
                }`}
                  onClick={handleUpdateOrderPay}
                >
                  <FaCcPaypal className="text-5xl" />
                </button>
                <button
                  className={`w-4/5 mx-auto bg-black py-2 rounded-md mt-1 cursor-pointer mb-2 text-primary flex items-center justify-center px-1 ${
                    isPaid && _id == id.id ? "opacity-60 cursor-text" : null
                  }`}
                >
                  <FaCcMastercard className="text-5xl mr-1" /> Debit or Credit
                  Card
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
