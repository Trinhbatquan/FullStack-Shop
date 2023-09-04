import React, { useState, useEffect } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { Header, Loading } from "components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
// import { dataImage } from "../assets/img/index";
import { createNewOrder } from "api/index";
import { createOrder } from "reduxToolkit/orderSlice";
import { deleteAllCarts } from "reduxToolkit/cartSlice";

const PlaceOrderScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.userSlice.user);
  const cart = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts, deliveryAddress } = cart;

  const cartsProducts = () => {
    return carts.reduce((acc, item) => acc + item?.qty * item?.price, 0);
  };

  const cartsShipping = () => {
    return cartsProducts() > 1500000 ? 0 : 100000;
  };

  const cartsTax = () => {
    return Math.round(0.12 * cartsProducts());
  };

  const cartsTotal = () => {
    return (
      Number(cartsProducts()) + Number(cartsShipping()) + Number(cartsTax())
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateNewOrder = () => {
    const order = {
      orderItems: carts,
      shippingAddress: deliveryAddress,
      paymentMethod: "PayPal or Credit Card",
      taxPrice: cartsTax(),
      shippingPrice: cartsShipping(),
      itemsPrice: cartsProducts(),
      totalPrice: cartsTotal(),
    };
    createNewOrder(order).then((newOrder) => {
      dispatch(createOrder(newOrder));
      dispatch(deleteAllCarts([]));
      localStorage.removeItem("cart");
      navigate(`/order/${newOrder._id}`);
    });
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
          className="w-full h-56 medium:h-auto sm:h-auto bg-slate-200 flex items-center justify-between 
          rounded-md shadow-lg backdrop-blur-sm medium:backdrop-blur-none sm:backdrop-blur-none
          medium:flex-wrap sm:flex-wrap medium:py-8 sm:py-8 sm:pl-4 medium:justify-start medium:gap-12 sm:justify-start sm:gap-10"
        >
          <div className="flex items-center xl:justify-center xl:flex-1 medium:w-c-1/2 sm:w-c-1 medium:ml-10 sm:mf-4">
            <BsFillPersonFill
              className="medium:w-40 medium:h-60 sm:w-40 sm:h-40 w-80 h-80 text-4xl sm:text-xl p-3 border border-gray-300 rounded-full shadow-lg
             backdrop-blur-md medium:backdrop-blur-none sm:backdrop-blur-none bg-slate-100 text-slate-400 mr-8"
            />
            <div>
              <span className="font-semibold text-xl text-headingColor">
                Customer
              </span>
              <p className="text-black text-lg sm:text:md opacity-80 mt-1">
                {user?.name}
              </p>
              <p className="text-black text-lg sm:text:md opacity-80">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center xl:justify-center xl:flex-1 relative  medium:w-c-1/2 sm:w-c-1 medium:ml-10 sm:mf-4">
            <FaShippingFast
              className="medium:w-40 medium:h-60 sm:w-40 sm:h-40 w-80 h-80 text-4xl sm:text-xl p-3 border border-gray-300 rounded-full shadow-lg
             backdrop-blur-md medium:backdrop-blur-none sm:backdrop-blur-none bg-slate-100 text-slate-400 mr-8"
            />
            <div className="w-full">
              <span className="font-semibold text-xl sm:text-lg text-headingColor">
                Order info
              </span>
              <p className="text-black text-lg sm:text-md sm:text:md opacity-80 mt-1">
                Shipping: {deliveryAddress?.country}
              </p>
              <p className="text-black text-lg sm:text:md opacity-80">
                Pay method: Paypal Or Credit Card
              </p>
            </div>
            {/* <button type="button" className="bg-green-400 py-2 absolute left-28 right-0 top-24 rounded-md text-lg sm:text:md font-semibold text-headingColor"
              style={{minWidth: '60%', width: '60%'}}
            >
                Not Pair
              </button> */}
          </div>
          <div className="flex items-center xl:justify-center xl:flex-1 relative  medium:w-c-1/2 sm:w-c-1 medium:ml-10 sm:mf-4">
            <FaShippingFast
              className="medium:w-40 medium:h-60 sm:w-40 sm:h-40 w-80 h-80 text-4xl sm:text-xl p-3 border border-gray-300 rounded-full shadow-lg
             backdrop-blur-md medium:backdrop-blur-none sm:backdrop-blur-none bg-slate-100 text-slate-400 mr-8"
            />
            <div className="w-full">
              <span className="font-semibold text-xl sm:text-lg text-headingColor">
                Delivery to
              </span>
              <p className="text-black text-lg sm:text:md opacity-80 mt-1">
                Address: {deliveryAddress?.address}, {deliveryAddress?.city}
              </p>
              <p className="text-black text-lg sm:text:md opacity-80">
                Postal Code: {deliveryAddress?.postalCode}
              </p>
            </div>
            {/* <button type="button" className="bg-green-400 py-2 absolute left-28 right-0 top-20 rounded-md text-lg sm:text:md font-semibold text-headingColor"
              style={{minWidth: '60%', width: '60%'}}
            >
                Not Delivery
              </button> */}
          </div>
        </div>

        {carts.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <span className="text-xl text-headingColor font-semibold mb-4">
              No cart to order.
            </span>
            <NavLink
              to="/"
              className="w-1/2 medium:w-c-70 sm:w-c-1 bg-textColor text-white h-14
              text-center cursor-pointer text-xl hover:opacity-90 flex items-center 
              rounded-md shadow-lg backdrop-blur-sm justify-center"
            >
              Go Shopping
            </NavLink>
          </div>
        ) : (
          <div className="flex items-start justify-between mt-8 sm:flex-col sm:gap-4">
            <div className="w-c-70 flex flex-col border-r-2 border-gray-400 sm:border-none sm:w-full">
              {carts.map((cart, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="flex items-center justify-between w-full mb-4 sm:flex-col sm:items-center 
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
                        <span className="text-lg sm:text:md text-black font-semibold medium:ml-0 sm:ml-0 medium:w-full sm:w-full">
                          {cart?.name}
                        </span>
                        <div className="flex items-center justify-start medium:w-full sm:w-full gap-20">
                          <div>
                            <p className="text-headingColor text-lg sm:text:md opacity-80">
                              Quantity
                            </p>
                            <p className="ml-8 text-md">{cart?.qty}</p>
                          </div>
                          <div>
                            <p className="text-headingColor text-lg sm:text:md opacity-80">
                              SubTotal
                            </p>
                            <p className="ml-1 text-md">
                              {cart?.qty * cart?.price}đ
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <hr className="text-black text-center ml-0"
                    style={{maxWidth: '80%', width: '80%'}}
                  /> */}
                  </>
                );
              })}
            </div>

            <div className="w-1/4 sm:w-c-1 flex flex-col justify-start mt-8 text-center rounded-md sm:py-4 sm:mt-0 sm:mx-auto">
              <div
                className="flex items-center"
                style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
              >
                <div className="flex-1 py-2 px-1  text-black font-semibold text-lg sm:text:md">
                  Products
                </div>
                <div className="flex-1 py-2 px-1">{`${cartsProducts()}đ`}</div>
              </div>

              <hr
                className="text-black text-center mx-auto"
                style={{ maxWidth: "80%", width: "80%" }}
              />

              <div
                className="flex items-center"
                style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
              >
                <div className="flex-1 py-2 px-1  text-black font-semibold text-lg sm:text:md">
                  Shipping
                </div>
                <div className="flex-1 py-2 px-1">{`${cartsShipping()}đ`}</div>
              </div>

              <hr
                className="text-black text-center mx-auto"
                style={{ maxWidth: "80%", width: "80%" }}
              />

              <div
                className="flex items-center"
                style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
              >
                <div className="flex-1 py-2 px-1  text-black font-semibold text-lg sm:text:md">
                  Tax
                </div>
                <div className="flex-1 py-2 px-1">{`${cartsTax()}đ`}</div>
              </div>

              <hr
                className="text-black text-center mx-auto"
                style={{ maxWidth: "80%", width: "80%" }}
              />

              <div
                className="flex items-center"
                style={{ maxHeight: "42px", height: "42px", minHeight: "42px" }}
              >
                <div className="flex-1 py-2 px-1  text-black font-semibold text-lg sm:text:md">
                  Total
                </div>
                <div className="flex-1 py-2 px-1">{`${cartsTotal()}đ`}</div>
              </div>

              <button
                className=" w-4/5 mx-auto bg-blue-400 py-2 rounded-md mt-3 cursor-pointer"
                onClick={handleCreateNewOrder}
              >
                Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceOrderScreen;
