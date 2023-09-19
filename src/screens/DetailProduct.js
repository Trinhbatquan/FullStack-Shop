import React, { useState, useEffect } from "react";
import { Rating, Header, Loading } from "../components";
import { useLocation, useParams } from "react-router";
import {
  addFavorite,
  createReview,
  getFavoriteByProduct,
  getFavoriteByUser,
  getProductById,
  removeFavorite,
} from "api/index";
// import { dataImage } from "assets/img/index";
import { useSelector, useDispatch } from "react-redux";
import { getProductsById } from "reduxToolkit/productSlice";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

import { BsMessenger, BsFacebook, BsCartCheck } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiFillHome } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { GrFormSubtract, GrAdd } from "react-icons/gr";
import { TbTargetArrow } from "react-icons/tb";
import { setNavBar } from "reduxToolkit/navBarSlice";
import NavBar from "utils/NavBar";
import { getAllFavorites } from "reduxToolkit/favoriteSlice";
import { updateAllCart } from "reduxToolkit/cartSlice";

const DetailProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [countFavorite, setCountFavorite] = useState(0);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.productsReducer.productIdSelect);
  const user = useSelector((state) => state.userSlice.user);
  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const favoriteRedux = useSelector(
    (state) => state.favoriteReducer.favoriteProducts
  );
  const id = useParams();
  // console.log(id);
  // console.log(navigation);
  const location = useLocation();
  const keyNavigate = location?.pathname?.split("/")[1];
  // console.log("key" + JSON.stringify(keyNavigate));
  let parametersKey = [],
    parametersValue = [];
  if (product?.parameters) {
    parametersKey = Object.keys(product?.parameters);
    parametersValue = Object.values(product?.parameters);
  }

  //status favorite
  let statusFavorite = false;
  for (let i = 0; i < favoriteRedux.length; i++) {
    if (favoriteRedux[i]?.product?._id === product?._id) {
      statusFavorite = true;
      break;
    }
  }

  //count of favorite
  const countOfFavorite = async () => {
    getFavoriteByProduct(id.id).then((res) => {
      if (res?.code === 0) {
        setCountFavorite(res?.countOfFavorite);
      }
    });
  };

  // console.log(parametersKey);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getProductById(id.id).then((data) => {
      dispatch(getProductsById(data));
      setIsLoading(true);
    });
    countOfFavorite();
    dispatch(setNavBar(keyNavigate));
  }, []);

  const handleCartProduct = () => {
    navigate(`/cart/${id.id}?qty=${qty}`);
  };

  const handleBuyNow = (product) => {
    const data = {
      product: product._id,
      name: product.name,
      image: product.image,
      description: product.description,
      rating: product.rating,
      price: product.price,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
      reviews: product.reviews,
      qty,
    };
    // console.log(data);
    dispatch(updateAllCart([data]));
    navigate(
      user?.name ? "/deliveryAddress" : "/login?redirect=/deliveryAddress"
    );
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (rating && comment) {
      createReview(id.id, {
        rating,
        comment,
      }).then((mess) => {
        if (mess) {
          getProductById(id.id).then((data) => {
            dispatch(getProductsById(data));
          });
          toast.success("Add review successfully!!!", {
            autoClose: 2000,
          });
          setComment("");
          setRating(0);
        } else {
          toast.error("You have already reviewed. Thanks", {
            autoClose: 2000,
          });
          setComment("");
          setRating(0);
        }
      });
    } else {
      toast.warning("You need enter all field", {
        autoClose: 2000,
      });
    }
  };

  const handleFavoriteAdd = async () => {
    if (!user) {
      navigate(`/login?redirect=/favorite?id=${id.id}`);
    } else {
      await addFavorite(id.id).then((data) => {
        if (data?.code === 0) {
          getFavoriteByUser().then((res) => {
            if (res?.code === 0) {
              dispatch(getAllFavorites(res?.favoriteArr));
            }
          });
        }
      });
      countOfFavorite();
    }
  };

  const handleFavoriteRemove = async () => {
    await removeFavorite(id.id).then((data) => {
      // console.log("data" + JSON.stringify(data));
      if (data?.code === 0) {
        getFavoriteByUser().then((res) => {
          if (res?.code === 0) {
            dispatch(getAllFavorites(res?.favoriteArr));
          }
        });
      }
    });
    countOfFavorite();
  };

  return (
    <div className="w-full " style={{ backgroundColor: "#f5f5f5" }}>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>

      {isLoading ? (
        <div className=" w-full flex flex-col py-6">
          <ToastContainer />
          {navigation && (
            <div className="w-4/5 mx-auto">
              <NavBar navigation={navigation} />
            </div>
          )}
          <div
            className="flex items-center justify-center gap-1
            mx-auto mt-4 mb-6
            sm:flex-col sm:items-center sm:justify-between sm:gap-6
            w-4/5 sm:w-c-1"
            style={{
              backgroundColor: "#fff",
              borderRadius: "3px",
              boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
            }}
          >
            <div className="w-2/5 md:w-1/3 sm:w-3/4 p-4 flex flex-col item-center justify-center gap-6">
              <div
                // className="cursor-pointer hover:scale-95"
                style={{
                  backgroundImage: `url(${product?.image})`,
                  paddingTop: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="flex items-center justify-evenly">
                <div
                  className="text-md flex items-center justify-center gap-2 flex-1"
                  style={{ borderRight: "1px solid rgb(227, 213, 213)" }}
                >
                  Share:{" "}
                  <BsFacebook className="text-2xl text-blue-700 cursor-pointer" />{" "}
                  <BsMessenger className="text-2xl text-blue-700 cursor-pointer" />
                </div>
                <div className="text-md flex-1 flex items-center justify-center gap-2">
                  {" "}
                  {!statusFavorite && (
                    <AiOutlineHeart
                      className="text-2xl cursor-pointer text-red-700"
                      onClick={handleFavoriteAdd}
                    />
                  )}
                  {user?.name && statusFavorite && (
                    <AiFillHeart
                      className="text-2xl cursor-pointer text-red-700"
                      onClick={handleFavoriteRemove}
                    />
                  )}
                  {`Favorite (${countFavorite}.0)`}
                </div>
              </div>
            </div>

            <div className="py-6  w-c-55 md:w-1/2 mx-auto sm:w-full sm:flex-col sm:items-center sm:justify-center sm:mx-auto">
              <p className="font-semibold text-xl text-headingColor mb-4">
                {product?.name}
              </p>
              <div className="flex items-center mb-4 text-md justify-start gap-6">
                <div
                  className="w-1/5 flex items-center justify-start gap-2"
                  style={{ borderRight: "1px solid rgb(227, 213, 213)" }}
                >
                  <span
                    className="text-md"
                    style={{
                      color: "#ee4d2d",
                      borderBottom: "1px solid #ee4d2d",
                      padding: "0.5px 0",
                    }}
                  >
                    {product?.rating}
                  </span>
                  <Rating value={product?.rating} font="md" />
                </div>
                <div
                  className="w-1/5"
                  style={{ borderRight: "1px solid rgb(227, 213, 213)" }}
                >
                  <span className="mr-1 text-md text-headingColor" style={{}}>
                    {product?.numReviews}
                  </span>
                  <span
                    className="text-md text-headingColor opacity-60"
                    style={{}}
                  >
                    Ratings
                  </span>
                </div>
                <div
                  className="w-1/5"
                  // style={{ borderRight: "1px solid rgb(227, 213, 213)" }}
                >
                  <span className="mr-1 text-md text-headingColor" style={{}}>
                    {product?.sold}
                  </span>
                  <span
                    className="text-md text-headingColor opacity-60"
                    style={{}}
                  >
                    Sold
                  </span>
                </div>
              </div>

              <div className="flex flex-col mt-4 mb-6 w-4/5 md:w-full sm:w-full">
                <div className="flex items-center py-2 px-4 justify-start">
                  <span className="text-red-600  text-lg relative -top-2 pr-1">
                    $
                  </span>
                  <span className="text-red-600 text-3xl">
                    {product?.price}
                  </span>
                  <div
                    style={{
                      marginLeft: "15px",
                      color: "#fff",
                      textTransform: "uppercase",
                      background: "#ee4d2d",
                      borderRadius: "2px",
                      padding: "2px 4px",
                      fontWeight: "600",
                      lineHeight: "1",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {`${product?.discount}% Off`}
                  </div>
                </div>
                <div className="flex items-center py-2 px-4 justify-start gap-8">
                  <span className=" text-md" style={{ color: "#757575" }}>
                    Status
                  </span>
                  <span
                    className=" text-md"
                    style={{
                      background: "rgba(208,1,27,.08)",
                      padding: "3px 7px",
                      border: 0,
                      whiteSpace: "nowrap",
                      color: "#ee4d2d",
                    }}
                  >
                    {product?.countInStock ? "In Stock" : "Unavailable"}
                  </span>
                </div>
                <div className="flex items-center py-2 px-4 justify-start gap-8">
                  <span className=" text-md" style={{ color: "#757575" }}>
                    Add-on
                  </span>
                  <span
                    className=" text-md"
                    style={{
                      background: "rgba(208,1,27,.08)",
                      padding: "3px 7px",
                      border: 0,
                      whiteSpace: "nowrap",
                      color: "#ee4d2d",
                    }}
                  >
                    Add-on Deal
                  </span>
                </div>
                <div className="flex items-center py-2 px-4 justify-start gap-8">
                  <span className=" text-md" style={{ color: "#757575" }}>
                    Shipping
                  </span>
                  <span className="flex items-center justify-center gap-1 text-md">
                    <FaShippingFast className="text-xl text-red-700" />
                    <span
                      style={{
                        background: "rgba(208,1,27,.08)",
                        padding: "3px 7px",
                        border: 0,
                        whiteSpace: "nowrap",
                        color: "#ee4d2d",
                      }}
                    >
                      {product?.transport
                        ? product?.transport.slice(0, 1).toUpperCase() +
                          product?.transport.slice(1, product.transport.length)
                        : "None"}
                    </span>
                  </span>
                </div>

                {product?.countInStock ? (
                  <div className="flex items-center py-2 px-4 justify-start gap-8">
                    <span className="text-md" style={{ color: "#757575" }}>
                      Quantity
                    </span>
                    <div className="flex items-center justify-center">
                      <button
                        className="text-lg flex items-center justify-center"
                        style={{
                          border: "1px solid rgba(0,0,0,.09)",
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                          backgroundColor: "transparent",
                          color: "rgba(0,0,0,.8)",
                          width: "40px",
                          height: "36px",
                        }}
                        onClick={() =>
                          qty > 1 ? setQty(qty - 1) : setQty(qty)
                        }
                      >
                        <GrFormSubtract className="text-lg" />
                      </button>
                      <input
                        value={qty}
                        className="text-center"
                        style={{
                          width: "50px",
                          height: "36px",
                          border: "1px solid rgba(0,0,0,.09)",
                        }}
                      />
                      <button
                        className="text-lg flex items-center justify-center"
                        style={{
                          border: "1px solid rgba(0,0,0,.09)",
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                          backgroundColor: "transparent",
                          color: "rgba(0,0,0,.8)",
                          width: "40px",
                          height: "36px",
                        }}
                        onClick={() =>
                          qty < product?.countInStock
                            ? setQty(qty + 1)
                            : setQty(qty)
                        }
                      >
                        <GrAdd className="text-md" />
                      </button>
                    </div>
                    <span
                      className="text-md"
                      style={{
                        color: "#757575",
                      }}
                    >{`${product?.countInStock} pieces available`}</span>
                  </div>
                ) : null}

                {/* <div className="flex items-center py-2 px-4 justify-start gap-8">
                  <span className=" text-md" style={{ color: "#757575" }}>
                    Specification
                  </span>
                  <span className="flex items-center justify-center gap-1 text-md">
                    <FaShippingFast className="text-xl" />
                    <span
                      style={{
                        background: "rgba(208,1,27,.08)",
                        padding: "3px 7px",
                        border: 0,
                        whiteSpace: "nowrap",
                        color: "#ee4d2d",
                      }}
                    >
                      {product?.transport
                        ? product?.transport.slice(0, 1).toUpperCase() +
                          product?.transport.slice(1, product.transport.length)
                        : "None"}
                    </span>
                  </span>
                </div> */}
              </div>

              <div className="flex items-center justify-start gap-10 pb-6">
                <button
                  type="button"
                  className="w-1/3 sm:w-full rounded-md text-red-600 sm:mx-auto
                  p-3 text-lg opacity-70 hover:opacity-100 flex items-center justify-center gap-3"
                  style={{
                    border: "1px solid red",
                    backgroundColor: "rgba(255,197,178,.181)",
                  }}
                  onClick={handleCartProduct}
                >
                  <BsCartCheck className="text-red-600 text-2xl" />{" "}
                  <span className="text-md">Add To Cart</span>
                </button>
                <button
                  type="button"
                  className="w-1/3 sm:w-full bg-red-600 rounded-md text-white sm:mx-auto p-3 text-lg opacity-70 hover:opacity-100"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>
              <hr />
              <span className="text-md text-red-700 flex items-center justify-start gap-2 mt-3">
                <TbTargetArrow className="text-xl text-red-700" />
                Get the items you ordered or get your money back.
              </span>
            </div>
          </div>

          <div
            className="ml-[10%] flex py-4 px-6 flex-col items-start justify-start gap-1
            mt-1 mb-6
            sm:flex-col sm:items-center sm:justify-between sm:gap-6
            w-2/5 sm:w-c-1"
            style={{
              backgroundColor: "#fff",
              borderRadius: "3px",
              boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
            }}
          >
            <p className="text-lg font-semibold text-headingColor py-2">{`Product Specifications of ${product?.name}`}</p>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              {parametersKey.length > 0 &&
                parametersKey.map((spec, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-sm w-full flex items-center justify-start gap-8 h-auto ${
                        (index + 1) % 2 === 0 ? "bg-white" : "bg-gray-200"
                      }`}
                    >
                      <p className="p-2 flex-1 text-md text-red-700">{spec}</p>
                      <span className="p-2  text-md text-blue-700 block">
                        {parametersValue[index]}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div
            className="flex py-4 items-center justify-center gap-1
            mx-auto mt-1 mb-6
            sm:flex-col sm:items-center sm:justify-between sm:gap-6
            w-4/5 sm:w-c-1"
            style={{
              backgroundColor: "#fff",
              borderRadius: "3px",
              boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
            }}
          >
            <div className="flex flex-col w-2/5 sm:w-c-1">
              <span className="text-lg text-headingColor font-semibold mb-4">
                REVIEWS
              </span>

              {product.reviews.length === 0 ? (
                <input
                  type="text"
                  className="w-2/5 sm:w-c-1 bg-gray-200 text-black p-4 opacity-80 mt-2"
                  value="No reviews"
                />
              ) : (
                product.reviews.map((review, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="w-full mb-4 rounded-sm bg-slate-300 p-4 shadow-md flex flex-col items-start"
                      >
                        <p className="text-md text-black ">{review?.name}</p>
                        <Rating value={review?.rating} className="float-left" />
                        <p className="text-md text-black">{`${moment(
                          review?.createdAt
                        ).calendar()}`}</p>
                        <input
                          type="text"
                          className="bg-primary text-black w-full px-2 py-4 opacity-80 mt-2"
                          defaultValue=""
                          value={review?.comment}
                        />
                      </div>
                    </>
                  );
                })
              )}
            </div>

            <div className="flex flex-col mt-4 w-c-55 sm:w-c-1">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <span className="text-lg font-semibold text-headingColor mb-4">
                  WRITE A CUSTOMER REVIEW
                </span>

                {user?.name ? (
                  <>
                    <label
                      className="text-md text-black mb-2 font-semibold"
                      htmlFor="ratings"
                    >
                      Rating
                    </label>
                    <select
                      className="px-3 py-4 "
                      id="ratings"
                      name="ratings"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option className="text-md text-black" value="">
                        Select...
                      </option>
                      <option className="text-md text-black" value="1">
                        1-Bad
                      </option>
                      <option className="text-md text-black" value="2">
                        2-Medium
                      </option>
                      <option className="text-md text-black" value="3">
                        3-Good
                      </option>
                      <option className="text-md text-black" value="4">
                        4-Very Good
                      </option>
                      <option className="text-md text-black" value="5">
                        5-Excellent
                      </option>
                    </select>
                    <p className="font-semibold text-md mt-4">Comment</p>
                    <textarea
                      value={comment ? comment : ""}
                      className="border border-gray-300 mt-2 mb-8 focus:outline-blue-400 px-2"
                      rows="4"
                      cols="25"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-green-400 hover:bg-gray-500 text-white px-2 py-3 "
                      onClick={handleAddReview}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="outline-none border border-gray-200 w-full backdrop-blur-sm shadow-sm 
                    rounded-sm flex items-center justify-start px-4 py-4 bg-slate-200 text-red-600 cursor-text text-md"
                    >
                      Please
                      <NavLink
                        to={`/login?redirect=/product?id=${product?._id}`}
                      >
                        <span className="font-semibold text-black cursor-pointer mx-1">
                          Login
                        </span>
                      </NavLink>
                      to write a review
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DetailProduct;
