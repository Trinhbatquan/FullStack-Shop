import React, { useEffect, useState } from "react";
import { Rating } from "../../../components";
import { motion } from "framer-motion";
import { getAllProducts } from "api/index";
import {dataImage} from 'assets/img/index'
import {NavLink} from "react-router-dom";
import { Loading } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {AiFillHeart} from 'react-icons/ai'
import {AiOutlineHeart} from 'react-icons/ai'
import { getProductsByAll, getProductsBySearch } from "reduxToolkit/productSlice";

const ShopProduct = () => {
  window.scrollTo(0,0)
  const [isLoading, setIsLoading] = useState(false)
  const numberOfPage = useParams().pageNumber

  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.productsReducer.allProducts)
  const productsSearch = useSelector((state) => state.productsReducer.productsBySearch)

  useEffect(() => {
      if (numberOfPage) {
        getAllProducts(numberOfPage).then((data) => {
          dispatch(getProductsByAll(data));
          dispatch(getProductsBySearch(""))
          setIsLoading(true);
        })
      } else {
        getAllProducts().then((data) => {
          dispatch(getProductsByAll(data));
          dispatch(getProductsBySearch(""))
          setIsLoading(true);
      })}
  }, [numberOfPage]
  );


  return (
    <div
      className="flex flex-row flex-wrap mx-auto mt-8"
      style={{ minWidth: "80%", width: "80%" }}
    >

      
      { isLoading ? (productsSearch === [] ? 
        products?.map((product, index) => {
        return (
            <NavLink
              to={`/products/${product._id}`}
              key={index}
              className="flex flex-col px-6 py-6  mb-8 rounded-md shadow-lg backdrop-blur-md hover:bg-primary cursor-pointer mx-auto border border-gray-200"
              style={{ width: "30%", minWidth: "30%" }}
            >
              <motion.div
                // whileTap={{ scale: 0.95 }}
                // className="hover:scale-95"
                style={{
                  backgroundImage: `url(${dataImage[product.image]})`,
                  paddingTop: "85%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></motion.div>
              <p className="mt-2 text-headingColor text-sm font-semibold h-8"
                style={{lineHeight: '32px'}}
              >
                {product.name.length > 40 ? `${product.name.slice(0,40)}...` : product.name}
              </p>
              <div className="flex items-center justify-between mt-2 mx-1">
                <Rating value={product?.rating} />
                <span className="text-xs text-headingColor opacity-80">
                  {product.numReviews} reviews
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 mx-1">
              <span className="text-xs text-red-700 font-semibold">
                  {product?.price}đ
                </span>
                <AiFillHeart />
              </div>
            </NavLink>

        );
      }) : 
      productsSearch?.map((product, index) => {
        return (
            <NavLink
              to={`/products/${product._id}`}
              key={index}
              className="flex flex-col px-6 py-6 mb-8 rounded-md shadow-lg backdrop-blur-md hover:bg-primary cursor-pointer mx-auto  border border-gray-200"
              style={{ width: "30%", maxWidth: "30%" }}
            >
              <motion.div
                // whileTap={{ scale: 0.95 }}
                // className="hover:scale-95"
                style={{
                  backgroundImage: `url(${dataImage[product.image]})`,
                  paddingTop: "85%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></motion.div>
              <p className="mt-2 text-headingColor text-sm font-semibold h-8"
                style={{lineHeight: '32px'}}
              >
                {product.name.length > 40 ? `${product.name.slice(0,40)}...` : product.name}
              </p>
              <div className="flex items-center justify-between mt-2 mx-1">
                <Rating value={product?.rating} />
                <span className="text-xs text-headingColor opacity-80">
                  {product.numReviews} reviews
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 mx-1">
              <span className="text-xs text-red-700 font-semibold">
                {product?.price}đ
                </span>
                <AiOutlineHeart className="text-red-700"/>
              </div>
            </NavLink>

        );
      })
      
      )
      
      : <Loading />
      
      }

     
    </div>
  );
};

export default ShopProduct;
