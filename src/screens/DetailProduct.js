import React, { useState, useEffect } from "react";
import { Rating, Header, Loading } from "../components";
import { useParams } from "react-router";
import { createReview, getProductById } from "api/index";
import { dataImage } from "assets/img/index";
import { useSelector, useDispatch } from "react-redux";
import { getProductsById } from "reduxToolkit/productSlice";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import moment from 'moment'
import { ToastContainer, toast } from "react-toastify";

const DetailProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.productsReducer.productIdSelect);
  const user = useSelector((state) => state.userSlice.user);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const id = useParams();
  console.log(id);

  useEffect(() => {
    getProductById(id.id).then((data) => {
      dispatch(getProductsById(data));
      setIsLoading(true);
    });
  }, []);

  const handleCartProduct = () => {
    navigate(`/cart/${id.id}?qty=${qty}`);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (rating && comment) {
      createReview(id.id, {
        rating,
        comment
      }).then((mess) => {
        if (mess) {
          getProductById(id.id).then((data) => {
            dispatch(getProductsById(data));
          });
          toast.success("Add review successfully!!!",
          {
            autoClose: 2000
          })
          setComment("")
          setRating(0)
        } else {
          toast.error("You have already reviewed. Thanks", {
            autoClose: 2000
          })
          setComment("")
          setRating(0)
        }
      })
    } else {
      toast.warning("You need enter all field", {
        autoClose: 2000
      })
    }
  }

  return (
    <>
      <Header />

      {isLoading ? (
        <div className=" w-full flex flex-col py-6">
        <ToastContainer />
          <div
            className="flex items-start justify-between mx-auto mt-8 mb-10"
            style={{ maxWidth: "80%", width: "80%" }}
          >
            <div
              className="p-4 bg-inputColor rounded-md backdrop-blur-md shadow-md"
              style={{ minWidth: "40%", width: "40%" }}
            >
              <div
                // className="cursor-pointer hover:scale-95"
                style={{
                  backgroundImage: `url(${dataImage[product?.image]})`,
                  paddingTop: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

            <div
              className="px-10 py-6 rounded-md shadow-md backdrop-blur-md bg-inputColor"
              style={{ maxWidth: "55%", width: "55%" }}
            >
              <p className="font-semibold text-2xl text-headingColor mb-4">
                {product?.name}
              </p>
              <p className="flex items-center flex-wrap opacity-70 mb-4 text-lg">
                {product?.description}
              </p>

              <div
                className="flex flex-col mt-8 mb-16"
                style={{ maxWidth: "70%", width: "70%" }}
              >
                <div className="flex items-center py-2 px-4 justify-between border border-gray-300 text-center">
                  <span className="text-black  text-lg">Price</span>
                  <span className="text-black  text-lg">{product?.price}đ</span>
                </div>
                <div className="flex items-center py-2 px-4 justify-between border border-gray-300">
                  <span className="text-black  text-lg">Status</span>
                  <span className="text-black  text-lg">
                    {product?.countInStock ? "In Stock" : "Unavailable"}
                  </span>
                </div>
                <div className="flex items-center py-2 px-4 justify-between border border-gray-300">
                  <span className="text-black  text-lg">Review</span>
                  <span className="text-black flex items-center justify-center text-lg">
                    <Rating value={product?.rating} />
                    <span className="text-black ml-2 text-lg">
                      {product?.numReviews} reviews
                    </span>
                  </span>
                </div>

                {product?.countInStock ? (
                  <div className="flex items-center py-2 px-4 justify-between border border-gray-300">
                    <span className="text-black  text-lg">Quantity</span>
                    <select
                      name="test"
                      className=" text-lg p-2 text-black"
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {Array.from(Array(product?.countInStock).keys()).map(
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
                ) : null}
              </div>

              <button
                style={{ maxWidth: "70%", width: "70%" }}
                type="button"
                className="w-full bg-black text-white p-4 text-xl opacity-70 hover:opacity-100"
                onClick={handleCartProduct}
              >
                ADD TO CART
              </button>
            </div>
          </div>

          <div
            className="flex items-start justify-between mx-auto mt-16"
            style={{ minWidth: "80%", width: "80%" }}
          >
            <div
              className="flex flex-col"
              style={{ minWidth: "40%", width: "40%" }}
            >
              <span className="text-2xl text-headingColor font-semibold mb-4">
                REVIEWS
              </span>

              {
                product.reviews.length === 0 ? (
                  <input
                                type="text"
                                className="bg-primary text-black w-full px-2 py-4 opacity-80 mt-2"
                                value= "No reviews"
                                style={{maxWidth: '40%', width: '40%'}}
                              />
                ) : (
                  product.reviews.map((review, index) => {
                    return <>

                            <div key={index} className="w-full mb-4 bg-slate-300 p-4  rounded-md shadow-md flex flex-col items-start">
                              <p className="text-lg text-black ">{review?.name}</p>
                              <Rating value={review?.rating} className="float-left"/>
                              <p className="text-lg text-black">{`${moment(review?.createdAt).calendar()}`}</p>
                              <input
                                type="text"
                                className="bg-primary text-black w-full px-2 py-4 opacity-80 mt-2"
                                defaultValue=""
                                value={review?.comment}
                              />
                            </div>
                    </>
                  })
                )
              }
             
            </div>

            <div
              className="flex flex-col mt-4"
              style={{ minWidth: "55%", width: "55%" }}
            >
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <span className="text-2xl font-semibold text-headingColor mb-4">
                  WRITE A CUSTOMER REVIEW
                </span>

                {user?.name ? (
                  <>
                    <label
                      className="text-lg text-black mb-2 font-semibold"
                      htmlFor="ratings"
                    >
                      Rating
                    </label>
                    <select className="px-3 py-4 " id="ratings" name="ratings" value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option className="text-lg text-black" value="">
                       Select...
                      </option>
                      <option className="text-lg text-black" value="1">
                        1-Bad
                      </option>
                      <option className="text-lg text-black" value="2">
                        2-Medium
                      </option>
                      <option className="text-lg text-black" value="3">
                        3-Good
                      </option>
                      <option className="text-lg text-black" value="4">
                        4-Very Good
                      </option>
                      <option className="text-lg text-black" value="5">
                        5-Excellent
                      </option>
                    </select>
                    <p className="font-semibold text-lg mt-4">Comment</p>
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
                    rounded-sm flex items-center justify-start px-3 py-4 bg-slate-200 text-red-600 cursor-text text-lg"
                    >
                      Please
                      <NavLink to= {`/login?redirect=/product?id=${product?._id}`}>
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
    </>
  );
};

export default DetailProduct;
