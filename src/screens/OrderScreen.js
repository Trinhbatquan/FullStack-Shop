import React, { useState, useEffect } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { Header, Loading } from "components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { dataImage } from "../assets/img/index";
import { getOrderById, updateOrderPay } from "reduxToolkit/orderSlice";
import { orderById, updateOrderWhenPay } from "api/index";
import { BsPaypal, BsCartCheck } from "react-icons/bs";
import { HiOutlineCash } from "react-icons/hi";
import { motion } from "framer-motion";
import moment from "moment";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { setNavBar } from "reduxToolkit/navBarSlice";
import NavBar from "utils/NavBar";
import { Button } from "primereact/button";
import axios from "axios";

import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const orderItemById = useSelector((state) => state.orderSlice.orderId);
  const currentUser = JSON.parse(localStorage.getItem("userShop"));
  const redirectedFromProfile = useLocation().search.split("=/")[1];
  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const keyNavigate = location?.pathname?.split("/")[1];

  //data
  const {
    shippingAddress,
    user,
    orderItems,
    paymentMethod,
    shippingPrice,
    totalPrice,
    itemsPrice,
    isDelivered,
    isPaid,
    paymentResult,
  } = orderItemById;

  const [payment, setPayment] = useState("");

  console.log(paymentResult);
  console.log(payment);

  const [sdkReady, setSdkReady] = useState(false);

  console.log("sdk" + sdkReady);

  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(setNavBar(keyNavigate));

    //handle payment paypal
    const addPayPalScript = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data?.data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (orderItemById?._id) {
      if (!isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }

    setTimeout(() => {
      orderById(id.id).then((res) => {
        if (res?.code === 0) {
          dispatch(getOrderById(res?.order));
          if (res?.order?.paymentResult?.method) {
            setPayment(res?.order.paymentResult.method);
          } else {
            setPayment("paypal");
          }
          setIsLoading(false);
        }
      });
    }, 1500);
  }, [orderItemById?._id]);

  const handleUpdateOrderPay = (type, data) => {
    setIsLoading(true);
    setTimeout(() => {
      updateOrderWhenPay(id.id, {
        ...orderItemById,
        status: "Completed",
        update_time: Date.now(),
        email_address: user?.email,
        method: type,
      }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          orderById(id.id).then((res) => {
            if (res?.code === 0) {
              dispatch(getOrderById(res?.order));
            }
          });
        } else {
          toast.error("Error");
        }
        setIsLoading(false);
      });
    }, 1000);
  };

  //data tables
  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image object-cover w-[50px] h-[80px]"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    console.log(rowData);
    return (
      <span className="text-red-500 text-md">{`${
        +rowData?.price * +rowData?.qty
      }$`}</span>
    );
  };

  return (
    <div className="pb-10" style={{ backgroundColor: "#f5f5f5" }}>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      {navigation && (
        <div className="w-4/5 pl-[5%] pt-4">
          <NavBar navigation={navigation} />
        </div>
      )}
      <div className="flex flex-col mx-auto mt-4 xl:py-8 px-[5%]">
        <div
          className="w-full flex items-start flex-col justify-center gap-4 py-3 px-4"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgb(232,229,229)",
          }}
        >
          <div className="flex w-full items-start flex-col justify-center">
            <div className="flex item-center justify-start">
              <BsFillPersonFill className="text-2xl text-red-600 mx-1" />
              <span className="text-lg text-red-600">User Info</span>
            </div>
            <div className="flex items-center justify-start gap-3">
              <p className="text-black text-md font-semibold sm:text:md pr-2 border-r-2 border-gray-300">
                {user?.name}
              </p>
              <p className="text-black text-md sm:text:md opacity-80 mt-1">
                {shippingAddress?.address}, {shippingAddress?.city},{" "}
                {shippingAddress?.country}
              </p>
            </div>
          </div>
        </div>

        {orderById?._id ? (
          <div className="flex flex-col items-center mt-4">
            <span className="text-xl text-blue-500 font-semibold mb-4">
              Don't have order item.
            </span>
            <NavLink to="/" className="w-full flex items-center justify-center">
              <Button
                type="button"
                label="GO SHOPPING"
                className="p-button-outlined"
                style={{ width: "50%" }}
              />
            </NavLink>
          </div>
        ) : (
          <div className="mt-4 w-full">
            <DataTable
              value={orderItemById?.orderItems}
              responsiveLayout="scroll"
              rows={10}
              resizableColumns
              columnResizeMode="fit"
              showGridlines
            >
              <Column
                header="Image"
                body={imageBodyTemplate}
                style={{
                  width: "10%",
                }}
              ></Column>
              <Column
                field="name"
                header="Name Product"
                style={{
                  width: "60%",
                }}
              ></Column>
              <Column
                header="Quantity"
                field="qty"
                style={{
                  width: "20%",
                }}
              ></Column>
              <Column header="Price" body={priceBodyTemplate}></Column>
            </DataTable>

            <div
              className="mt-3 w-full flex flex-col justify-center gap-3"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgb(232,229,229)",
              }}
            >
              <div className="w-full flex items-center justify-start gap-12 px-3 pt-3">
                <p className="text-headingColor opacity-80 text-md">
                  Payment Method
                </p>
                <div className="flex-1 flex items-center justify-start gap-3">
                  <button
                    className={`${
                      payment === "paypal"
                        ? "border border-spacing-1 border-red-500"
                        : "border border-spacing-1 border-gray-200"
                    } ${isPaid ? "cursor-not-allowed" : "cursor-pointer"}
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white`}
                    onClick={() => (isPaid ? "" : setPayment("paypal"))}
                  >
                    <BsPaypal
                      className={`text-lg  ${
                        payment === "paypal" ? "text-red-500" : "text-gray-200"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        payment === "paypal" ? "text-red-500" : "text-gray-200"
                      }`}
                    >
                      PayPal
                    </span>
                  </button>
                  <button
                    className={`${
                      payment === "cash"
                        ? "border border-spacing-1 border-red-500"
                        : "border border-spacing-1 border-gray-200"
                    } ${isPaid ? "cursor-not-allowed" : "cursor-pointer"}
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white`}
                    onClick={() => (isPaid ? "" : setPayment("cash"))}
                  >
                    <HiOutlineCash
                      className={`text-lg  ${
                        payment === "cash" ? "text-red-500" : "text-gray-200"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        payment === "cash" ? "text-red-500" : "text-gray-200"
                      }`}
                    >
                      Cash on Delivery
                    </span>
                  </button>
                  <button
                    className={` cursor-not-allowed
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white border border-spacing-1 border-gray-200`}
                  >
                    <span className="text-sm text-gray-200">VN Pay</span>
                  </button>
                  <button
                    className={` cursor-not-allowed
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white border border-spacing-1 border-gray-200`}
                  >
                    <span className="text-sm text-gray-200">Shoppe Pay</span>
                  </button>
                </div>
              </div>
              <hr />
              <div className="w-full flex items-start justify-between gap-8">
                <div className="w-[50%] flex items-start justify-start gap-12 px-3 pt-3">
                  <p className="text-headingColor opacity-80 text-md">
                    Product's Status
                  </p>
                  <div className="flex-1 flex items-center justify-start gap-3">
                    <button
                      className={`cursor-text 
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white 
${
  isPaid
    ? "border border-spacing-1 border-backColor"
    : "border border-spacing-1 border-gray-200"
}`}
                    >
                      {isPaid && (
                        <AiOutlineCheck className="text-lg text-backColor" />
                      )}
                      <span
                        className={`text-sm ${
                          isPaid ? "text-backColor" : "text-gray-200"
                        }`}
                      >
                        {isPaid ? "Paid" : "Not Paid"}
                      </span>
                    </button>
                    <button
                      className={`cursor-text
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white border border-spacing-1 border-gray-200
${
  isPaid
    ? "border border-spacing-1 border-backColor"
    : "border border-spacing-1 border-gray-200"
}`}
                    >
                      <span
                        className={`text-sm ${
                          isPaid ? "text-backColor" : "text-gray-200"
                        }`}
                      >
                        {isPaid ? "Delivering..." : "Not Delivery"}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex items-start justify-end">
                  <div className="py-3 px-2 mr-16">
                    <div className="flex items-center py-2 text-headingColor text-md">
                      <span className="flex-1">Merchandise Total:</span>
                      <span className="w-c-1/3 pl-2">{itemsPrice}$</span>
                    </div>
                    <div className="flex items-center py-2 text-headingColor text-md">
                      <span className="flex-1">Shipping Total:</span>
                      <span className="w-c-1/3 pl-2">{shippingPrice}$</span>
                    </div>
                    <div className="flex items-center py-2 text-headingColor text-md">
                      <span className="flex-1">Total Payment:</span>
                      <span className="w-c-1/3 pl-2 text-4xl text-red-500">
                        {totalPrice}$
                      </span>
                    </div>
                    {!isPaid &&
                      (payment === "paypal" ? (
                        !sdkReady ? (
                          <Loading />
                        ) : (
                          <div className="my-5">
                            <PayPalButton
                              amount={23}
                              onSuccess={(data) =>
                                handleUpdateOrderPay("paypal", data)
                              }
                            />
                          </div>
                        )
                      ) : (
                        <button
                          type="button"
                          className={`w-full my-5 rounded-md text-red-600 sm:mx-auto
                    p-3 text-lg opacity-70 hover:opacity-100 flex items-center justify-center gap-3 ${
                      isPaid &&
                      "cursor-not-allowed opacity-25 flex flex-col justify-center gap-1"
                    }`}
                          style={{
                            border: "1px solid red",
                            backgroundColor: "rgba(255,197,178,.181)",
                          }}
                          onClick={() => handleUpdateOrderPay("cash", "")}
                        >
                          <div>{isLoading && <Loading />}</div>
                          <div className="w-full flex items-center justify-center gap-1">
                            <BsCartCheck className="text-red-600 text-2xl" />{" "}
                            <span className="text-md">Cash on Delivery</span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
