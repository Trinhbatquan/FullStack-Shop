import React, { useState, useEffect } from "react";

import { BsCartCheck, BsFillPersonFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Header, Loading } from "components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
// import { dataImage } from "../assets/img/index";
import { createNewOrder } from "api/index";
import { createOrder } from "reduxToolkit/orderSlice";
import { deleteAllCarts } from "reduxToolkit/cartSlice";
import { useLocation } from "react-router-dom";
import { setNavBar } from "reduxToolkit/navBarSlice";
import NavBar from "utils/NavBar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import moment from "moment";
import { useTranslation } from "react-i18next";

const PlaceOrderScreen = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState("Express");
  const user = useSelector((state) => state.userSlice.user);
  const cart = useSelector((state) => state.cartSlice);
  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const keyNavigate = i18n.language === "en" ? "Checkout" : "Mua ngay";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts, deliveryAddress } = cart;

  const dateNow = moment(new Date());

  const dateShipping = () => {
    if (shipping === "Express") {
      return `${moment(dateNow).format("DD-MM-YYYY")} --- ${moment(dateNow)
        .add(2, "days")
        .format("DD-MM-YYYY")}`;
    } else if (shipping === "Fast") {
      return `${moment(dateNow).format("DD-MM-YYYY")} --- ${moment(dateNow)
        .add(3, "days")
        .format("DD-MM-YYYY")}`;
    } else {
      return `${moment(dateNow).format("DD-MM-YYYY")} --- ${moment(dateNow)
        .add(4, "days")
        .format("DD-MM-YYYY")}`;
    }
  };

  const cartsProducts = () => {
    return carts.reduce((acc, item) => acc + item?.qty * item?.price, 0);
  };

  const cartsShipping = () => {
    return shipping === "Express" ? 100 : shipping === "Fast" ? 80 : 50;
  };

  const cartsTotal = () => {
    return Number(cartsProducts()) + Number(cartsShipping());
  };

  useEffect(() => {
    dispatch(setNavBar(keyNavigate));
    setIsLoading(false);
  }, [i18n.language]);

  const handleCreateNewOrder = () => {
    setLoading(true);
    const order = {
      orderItems: carts,
      shippingAddress: deliveryAddress,
      paymentMethod: "PayPal",
      taxPrice: 0,
      shippingPrice: cartsShipping(),
      itemsPrice: cartsProducts(),
      totalPrice: cartsTotal(),
    };
    createNewOrder(order).then((newOrder) => {
      dispatch(deleteAllCarts([]));
      localStorage.removeItem("cart");
      setLoading(false);
      navigate(`/order/${newOrder._id}`);
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
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      {navigation && (
        <div className="sm:hidden w-4/5 pl-[5%] pt-4">
          <NavBar navigation={navigation} />
        </div>
      )}
      <div className="flex flex-col mx-auto mt-4 xl:py-8 px-[5%] sm:px-[2%]">
        {isLoading && <Loading />}
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
              <span className="text-lg text-red-600 ">
                {i18n.language === "en" ? "User Info" : "Thông tin khách hàng"}
              </span>
            </div>
            <div className="flex items-center justify-start gap-3 sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:mt-2">
              <p className="text-black text-md font-semibold sm:text:md pr-2 border-r-2 border-gray-300 sm:border-none">
                {user?.name}
              </p>
              <p className="text-black text-md sm:text:md opacity-80 mt-1">
                {deliveryAddress?.address}, {deliveryAddress?.city},{" "}
                {deliveryAddress?.country}
              </p>
            </div>
          </div>
        </div>

        {carts.length === 0 ? (
          <div className="flex flex-col items-center mt-4">
            <span className="xl:text-xl lg:text-lg md:text-lg text-md text-blue-500 font-semibold mb-4">
              {i18n.language === "en"
                ? "Don't have product"
                : "Không có sản phẩm"}
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
              value={carts}
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
              className="flex items-start flex-col gap-2 mt-3 pb-5"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgb(232,229,229)",
              }}
            >
              <div className="border-b-2 border-gray-200 flex items-center justify-start gap-10 py-3 px-4 w-full sm:flex-col sm:items-center sm:justify-start sm:gap-4">
                <label
                  for="countries"
                  class="text-md text-headingColor flex items-center justify-start gap-1"
                >
                  <FaShippingFast className="text-md text-headingColor" />{" "}
                  {`${
                    i18n.language === "en"
                      ? "Select shipping methods"
                      : "Chọn phương thức vận chuyển"
                  }`}
                </label>
                <div className="flex items-center justify-start gap-4">
                  <button
                    className={`${
                      shipping === "Express"
                        ? "border border-spacing-1 border-red-500"
                        : "border border-spacing-1 border-gray-200"
                    } cursor-pointer
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white`}
                    onClick={() => setShipping("Express")}
                  >
                    <span
                      className={`text-sm ${
                        shipping === "Express"
                          ? "text-red-500"
                          : "text-gray-200"
                      }`}
                    >
                      Express
                    </span>
                  </button>
                  <button
                    className={`${
                      shipping === "Fast"
                        ? "border border-spacing-1 border-red-500"
                        : "border border-spacing-1 border-gray-200"
                    } cursor-pointer
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white`}
                    onClick={() => setShipping("Fast")}
                  >
                    <span
                      className={`text-sm ${
                        shipping === "Fast" ? "text-red-500" : "text-gray-200"
                      }`}
                    >
                      Fast
                    </span>
                  </button>
                  <button
                    className={`${
                      shipping === "Economical"
                        ? "border border-spacing-1 border-red-500"
                        : "border border-spacing-1 border-gray-200"
                    } cursor-pointer
     flex items-center justify-center gap-0.5 py-2 px-3 bg-white`}
                    onClick={() => setShipping("Economical")}
                  >
                    <span
                      className={`text-sm ${
                        shipping === "Economical"
                          ? "text-red-500"
                          : "text-gray-200"
                      }`}
                    >
                      Economical
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-start justify-between gap-5 px-4 w-full sm:flex-col sm:items-center sm:justify-start sm:gap-6">
                <div className="flex-1 flex items-start justify-start gap-1">
                  <AiOutlineFieldTime className="text-headingColor text-xl" />
                  <span className="text-headingColor text-md">{`${
                    i18n.language === "en" ? "Received by" : "Nhận hàng vào"
                  } ${dateShipping()}`}</span>
                </div>
                <div className="w-[60%] flex items-center justify-end sm:w-full sm:mx-auto sm:justify-center">
                  <div className="pr-14 sm:pr-0 sm:w-full">
                    <div className="flex items-center py-2 text-headingColor text-md sm:justify-center sm:text-center">
                      <span className="flex-1">{`${
                        i18n.language === "en"
                          ? "Merchandise Total:"
                          : "Tiền hàng:"
                      }`}</span>
                      <span className="w-c-1/3 pl-2 sm:flex-1">{`${cartsProducts()}$`}</span>
                    </div>
                    <div className="flex items-center py-2 text-headingColor text-md sm:text-center">
                      <span className="flex-1">
                        {`${
                          i18n.language === "en"
                            ? "Shipping Cost:"
                            : "Phí giao hàng:"
                        }`}
                      </span>
                      <span className="w-c-1/3 pl-2 sm:flex-1">{`${cartsShipping()}$`}</span>
                    </div>
                    <div className="flex items-center py-2 text-headingColor text-md sm:text-center">
                      <span className="flex-1">
                        {`${
                          i18n.language === "en"
                            ? "Payment Total:"
                            : "Tổng số tiền:"
                        }`}
                      </span>
                      <span className="w-c-1/3 pl-2 sm:flex-1 text-4xl text-red-500">
                        {`${cartsTotal()}$`}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full my-5 rounded-md text-red-600 sm:mx-auto
                  p-3 text-lg opacity-70 hover:opacity-100 flex items-center justify-center gap-3"
                      style={{
                        border: "1px solid red",
                        backgroundColor: "rgba(255,197,178,.181)",
                      }}
                      onClick={() => handleCreateNewOrder()}
                    >
                      <BsCartCheck className="text-red-600 text-2xl" />
                      {i18n.language === "en" ? "Place Order" : "Đặt hàng"}
                    </button>
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
