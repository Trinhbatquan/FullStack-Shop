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
import { ToastContainer, toast } from "react-toastify";
import i18n from "i18n";

const PlaceOrderScreen = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const orderItemById = useSelector((state) => state.orderSlice.orderId);
  const currentUser = JSON.parse(localStorage.getItem("userShop"));
  const redirectedFromProfile = useLocation().search.split("=/")[1];
  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const keyNavigate = i18n.language === "en" ? "Payment" : "Thanh toán";

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

  const [sdkReady, setSdkReady] = useState(false);

  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
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

    const loadData = async () => {
      if (orderItemById?._id) {
        if (!isPaid) {
          if (!window.paypal) {
            await addPayPalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
      await orderById(id.id).then((res) => {
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
    };
    loadData();
  }, [orderItemById?._id]);

  useEffect(() => {
    dispatch(setNavBar(keyNavigate));
  }, [i18n.language]);

  const handleUpdateOrderPay = (type, data) => {
    setLoading(true);
    updateOrderWhenPay(id.id, {
      ...orderItemById,
      status: "Completed",
      update_time: Date.now(),
      email_address: user?.email,
      method: type,
    }).then((res) => {
      if (res.code === 0) {
        orderById(id.id).then((res) => {
          if (res?.code === 0) {
            dispatch(getOrderById(res?.order));
            setLoading(false);
            toast.success(
              `${
                i18n.language === "en"
                  ? "Order Successfully. Item is delivering."
                  : "Đặt hàng thành công. Đơn hành đang được chuyển đến bạn."
              }`,
              {
                autoClose: 3000,
                theme: "colored",
                position: "bottom-right",
              }
            );
          }
        });
      } else {
        setLoading(false);
        toast.error(
          `${
            i18n.language === "en"
              ? "Something error. Please contact to admin."
              : "Có lỗi. Vui lòng liên hệ quản trị viên."
          }`,
          {
            autoClose: 3000,
            theme: "colored",
            position: "bottom-right",
          }
        );
      }
    });
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
    <div className="pb-10 h-[100vh]" style={{ backgroundColor: "#f5f5f5" }}>
      <ToastContainer />
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      {navigation && (
        <div className="sm:hidden w-4/5 pl-[5%] pt-4">
          <NavBar navigation={navigation} />
        </div>
      )}
      <div className="flex flex-col mx-auto mt-4 xl:py-8 px-[5%] sm:px-[2%]">
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
              <span className="text-lg text-red-600">
                {i18n.language === "en" ? "User Info" : "Thông tin khách hàng"}
              </span>
            </div>
            <div className="flex items-center justify-start gap-3 sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:mt-2">
              <p className="text-black text-md font-semibold sm:border-none sm:text:md pr-2 border-r-2 border-gray-300">
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
            <span className="xl:text-xl lg:text-lg md:text-lg text-md text-blue-500 font-semibold mb-4">
              {i18n.language === "en"
                ? "Don't have orders"
                : "Không có đơn hàng"}
            </span>
            <NavLink to="/" className="w-full flex items-center justify-center">
              <Button
                type="button"
                label={i18n.language === "en" ? "Go Shopping" : "Mua sắm"}
                className="p-button-outlined text-lg"
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
                header={`${i18n.language === "en" ? "Image" : "Ảnh"}`}
                body={imageBodyTemplate}
                style={{
                  width: "10%",
                }}
              ></Column>
              <Column
                field="name"
                header={`${
                  i18n.language === "en" ? "Name Product" : "Tên sản phẩm"
                }`}
                style={{
                  width: "60%",
                }}
              ></Column>
              <Column
                header={`${i18n.language === "en" ? "Quantity" : "Số lượng"}`}
                field="qty"
                style={{
                  width: "20%",
                }}
              ></Column>
              <Column
                header={`${i18n.language === "en" ? "Price" : "Giá"}`}
                body={priceBodyTemplate}
              ></Column>
            </DataTable>

            <div
              className="mt-3 w-full flex flex-col justify-center gap-3"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgb(232,229,229)",
              }}
            >
              <div className="w-full flex items-center justify-start gap-12 px-3 pt-3 sm:flex-col sm:items-center sm:justify-start sm:gap-4">
                <p className="text-headingColor opacity-80 text-md">
                  {`${
                    i18n.language === "en"
                      ? "Payment methods"
                      : "Chọn phương thức thanh toán"
                  }`}
                </p>
                <div className="flex-1 flex items-center justify-start gap-3 sm:flex-wrap sm:justify-center">
                  <button
                    className={`${
                      payment === "paypal"
                        ? "border border-spacing-1 border-red-500"
                        : "border border-spacing-1 border-gray-200"
                    } ${isPaid ? "cursor-not-allowed" : "cursor-pointer"}
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white sm:w-[90%]`}
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
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white sm:w-[90%]`}
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
                      {i18n.language === "en"
                        ? "Cash on Delivery"
                        : "Thanh toán khi nhận hàng"}
                    </span>
                  </button>
                  <button
                    className={` cursor-not-allowed
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white border border-spacing-1 border-gray-200 sm:w-[45%]`}
                  >
                    <span className="text-sm text-gray-200">VN Pay</span>
                  </button>
                  <button
                    className={` cursor-not-allowed
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white border border-spacing-1 border-gray-200 sm:w-[45%]`}
                  >
                    <span className="text-sm text-gray-200">Shoppe Pay</span>
                  </button>
                </div>
              </div>
              <hr />
              <div className="w-full flex items-start justify-between gap-8 sm:flex-col sm:items-center sm:justify-start sm:gap-6">
                <div className="w-[50%] flex items-start justify-start gap-12 px-3 pt-3 sm:flex-col sm:items-center sm:justify-start sm:gap-3 sm:w-full">
                  <p className="text-headingColor opacity-80 text-md">
                    {i18n.language === "en"
                      ? "Product's Status"
                      : "Trạng thái đơn hàng"}
                  </p>
                  <div className="flex-1 flex items-center justify-start gap-3 sm:w-full sm:justify-center">
                    <button
                      className={`cursor-text 
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white sm:w-[45%]
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
                        {isPaid
                          ? `${
                              i18n.language === "en" ? "Paid" : "Đã thanh toán"
                            }`
                          : `${
                              i18n.language === "en"
                                ? "Not Paid"
                                : "Chưa thanh toán"
                            }`}
                      </span>
                    </button>
                    <button
                      className={`cursor-text
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white sm:w-[45%]
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
                        {isPaid
                          ? `${
                              i18n.language === "en"
                                ? "Delivering..."
                                : "Đang vận chuyển..."
                            }`
                          : `${
                              i18n.language === "en"
                                ? "Not Delivery"
                                : "Chưa vận chuyển"
                            }`}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex items-start justify-end sm:w-full sm:justify-center">
                  <div className="py-3 px-2 mr-16 sm:mr-0 sm:w-full">
                    <div className="flex items-center py-2 text-headingColor text-md sm:justify-center sm:text-center sm:mx-auto">
                      <span className="flex-1">
                        {`${
                          i18n.language === "en"
                            ? "Merchandise Total:"
                            : "Tiền hàng:"
                        }`}
                      </span>
                      <span className="w-c-1/3 sm:flex-1 pl-2">
                        {itemsPrice}$
                      </span>
                    </div>
                    <div className="flex items-center py-2 text-headingColor text-md sm:justify-center sm:text-center sm:mx-auto">
                      <span className="flex-1">
                        {`${
                          i18n.language === "en"
                            ? "Shipping Cost:"
                            : "Phí giao hàng:"
                        }`}
                      </span>
                      <span className="w-c-1/3 sm:flex-1 pl-2">
                        {shippingPrice}$
                      </span>
                    </div>
                    <div className="flex items-center py-2 text-headingColor text-md sm:justify-center sm:text-center sm:mx-auto">
                      <span className="flex-1">
                        {`${
                          i18n.language === "en"
                            ? "Payment Total:"
                            : "Tổng số tiền:"
                        }`}
                      </span>
                      <span className="w-c-1/3 sm:flex-1 pl-2 text-4xl text-red-500">
                        {totalPrice}$
                      </span>
                    </div>
                    {!isPaid &&
                      (payment === "paypal" ? (
                        !sdkReady ? (
                          <Loading />
                        ) : (
                          <div className="my-5 sm:w-full">
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
                            <span className="text-md">{`${
                              i18n.language === "en"
                                ? "Cash on Delivery"
                                : "Thanh toán khi nhận hàng"
                            }`}</span>
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

      {loading && (
        <div className="fixed z-50 top-0 bottom-0 flex items-center justify-center mx-auto left-0 right-0 w-full max-h-full bg-black bg-opacity-25">
          <div className="absolute top-[50%] left-[50%]">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrderScreen;
