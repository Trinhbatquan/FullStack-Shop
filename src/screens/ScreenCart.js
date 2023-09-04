import React, { useState, useEffect } from "react";
// import { dataImage } from "assets/img";

import { FaTimes } from "react-icons/fa";
import { useParams, useLocation } from "react-router";
import { Header } from "components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, deleteCart, updateCart } from "reduxToolkit/cartSlice";
import { getProductById } from "api/index";
import { NavLink } from "react-router-dom";

const ScreenCart = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const qty = useLocation().search.split("=")[1];

  const carts = useSelector((state) => state.cartSlice.carts);
  const user = useSelector((state) => state.userSlice.user);
  console.log(carts);
  localStorage.setItem("cart", JSON.stringify(carts));

  useEffect(() => {
    if (id.id) {
      getProductById(id.id).then((data) => {
        dispatch(
          addCart({
            product: data._id,
            name: data.name,
            image: data.image,
            description: data.description,
            rating: data.rating,
            price: data.price,
            numReviews: data.numReviews,
            countInStock: data.countInStock,
            reviews: data.reviews,
            qty,
          })
        );
      });
    }
  }, []);

  const handleUpdateCart = (qty, index) => {
    dispatch(
      updateCart({
        _id: carts[index]._id,
        name: carts[index].name,
        image: carts[index].image,
        description: carts[index].description,
        rating: carts[index].rating,
        numReviews: carts[index].numReviews,
        price: carts[index].price,
        countInStock: carts[index].countInStock,
        reviews: carts[index].reviews,
        qty: qty,
      })
    );
  };

  const handleRemoveCart = (index) => {
    dispatch(deleteCart(index));
  };

  return (
    <div>
      <Header />

      <div
        className="w-full flex flex-col mx-auto mt-8 p-8"
        style={{ maxWidth: "90%", width: "90%" }}
      >
        {carts.length === 0 ? (
          <div className="flex flex-col items-center">
            <span className="text-xl text-headingColor font-semibold mb-4">
              Don't have cart.
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
          <>
            <div className="w-full text-center bg-slate-300 h-16 mb-8 flex items-center justify-center">
              <span className="text-xl text-headingColor font-semibold ">
                Total Cart Product ({carts.length})
              </span>
            </div>

            <div className="w-full flex flex-col border border-gray-200 sm:gap-10 sm:border-none sm:border-0 md:border-none sm:backdrop-blur-none md:backdrop-blur-none shadow-sm backdrop-blur-sm p-2">
              {carts.map((cart, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex items-center justify-between 
                    sm:flex-col sm:justify-center sm:items-center sm:gap-2 w-full bg-white mb-4
                    sm:border-b-2 sm:border-gray-400 sm:py-4
                    md:border-b-2 md:border-gray-400 md:py-4"
                  >
                    <div className="flex items-center justify-evenly p-4">
                      <div
                        className="w-300 h-300 min-w-300 min-h-300 
                        md:min-w-210 md:min-h-210 md:max-w-230 md:max-h-230
                        sm:w-full sm:h-auto
                         p-4 cursor-pointer border border-gray-200 sm:border-none sm:border-0 rounded-md flex-1"
                        style={{
                          // backgroundImage: `url(${dataImage[cart?.image]})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          // maxWidth: "300px",
                          // maxHeight: "300px",
                          // width: "300px",
                          // height: "300px",
                          // minWidth: "300px",
                          // minHeight: "300px",
                        }}
                      ></div>
                    </div>

                    <div
                      className="flex-1 flex items-center justify-around
                    md:flex-col md:justify-center md:items-center md:gap-6
                    sm:flex-col sm:justify-center sm:items-center sm:gap-2"
                    >
                      <span
                        className="text-xl ml-16 text-black h-auto flex flex-wrap max-w-[30%] w-c-1/3 md:w-full md:max-w-full 
                      sm:w-full sm:max-w-full sm:min-h-30 sm:ml-0"
                      >
                        {cart?.name}
                      </span>
                      <div className="flex items-center justify-around w-2/3 md:w-full sm:w-full sm:items-start">
                        <div className="flex flex-col">
                          <p className="text-xl text-headingColor text-center mb-3 opacity-70 sm:min-h-30">
                            Quantity
                          </p>
                          <select
                            name="quantity"
                            id="quantity"
                            className="text-lg text-headingColor text-center py-2 px-2 font-semibold"
                            onChange={(e) =>
                              handleUpdateCart(e.target.value, index)
                            }
                            value={cart.qty}
                          >
                            {Array.from(Array(cart?.countInStock).keys()).map(
                              (count) => {
                                return (
                                  <option key={count + 1} value={count + 1}>
                                    {count + 1}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </div>
                        <div className="flex flex-col mr-4">
                          <p className="text-xl text-headingColor text-center mb-1 opacity-70 sm:min-h-30">
                            Price
                          </p>
                          <p className="text-lg text-headingColor text-center font-semibold py-2 px-2 mx-auto my-auto">
                            {cart?.price}đ
                          </p>
                        </div>
                      </div>
                    </div>
                    <FaTimes
                      className="absolute left-3 top-4 text-xl cursor-pointer text-white
                  bg-red-800 rounded-full h-6 w-6 px-1 py-1 text-center
                  sm:h-8 sm:w-8 sm:top-6 sm:-left-3"
                      onClick={() => handleRemoveCart(index)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="w-full mr-4 p-4 mb-8 sm:mb-4 sm:mr-0 sm:flex sm:items-center sm:justify-center">
              <span className="float-right text-xl font-semibold text-black">
                Totals:{" "}
                {carts?.reduce((acc, item) => acc + item?.qty * item?.price, 0)}
                đ
              </span>
            </div>

            <div
              className="flex items-center justify-evenly 
            sm:flex-col sm:justify-center sm:items-center sm:gap-3"
            >
              <NavLink
                to="/"
                className="bg-black text-white w-c-1/3 md:w-2/5 sm:w-full h-12 md:h-16 sm:h-16 text-center cursor-pointer text-lg hover:opacity-90 rounded-md backdrop-blur-md shadow-md"
              >
                <button className="w-full h-full flex items-center justify-center">
                  <span>CONTINUE TO SHOPPING</span>
                </button>
              </NavLink>
              <NavLink
                to={`${
                  user?.name
                    ? "/deliveryAddress"
                    : "/login?redirect=/deliveryAddress"
                }`}
                className="bg-green-500 text-white w-c-1/3 md:w-2/5 sm:w-full h-12 md:h-16 sm:h-16 text-center cursor-pointer text-lg hover:opacity-90 rounded-md backdrop-blur-md shadow-md"
              >
                <button className="w-full flex items-center justify-center h-full">
                  <span>CHECKOUT</span>
                </button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScreenCart;
