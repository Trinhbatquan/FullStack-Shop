import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "api/index";
import {
  getProductsByAll,
  getProductsBySearch,
} from "reduxToolkit/productSlice";
import { useNavigate } from "react-router";

const Pagination = ({ numberOfPage, pages, handleNavigatePage }) => {
  console.log({ numberOfPage, pages, handleNavigatePage });
  // const navigate = useNavigate();

  // const { page, pages } = useSelector(
  //   (state) => state.productsReducer.allProducts
  // );
  // const handlePagination = (pageNumber) => {
  //   // getAllProducts(pageNumber).then((data) => {
  //   //     dispatch(getProductsByAll(data))
  //   //     dispatch(getProductsBySearch(""))
  //   // })
  //   navigate(`/?page=${pageNumber}`);
  // };
  return (
    <nav className="w-full mt-4 mb-4">
      <ul className="list-none flex items-center justify-center">
        {[...Array(pages).keys()]?.map((pageItem, index) => {
          return (
            <li
              key={index}
              className="rounded-md text-center mr-4 shadow-sm backdrop-blur-sm text-xl px-5 py-2 bg-white text-textColor font-semibold cursor-pointer sm:backdrop-blur-none"
              style={
                +numberOfPage === pageItem + 1
                  ? { backgroundColor: "black", color: "white" }
                  : {}
              }
              onClick={() => handleNavigatePage(pageItem + 1)}
            >
              <button
                text="button"
                name="button"
                className="border-none outline-none"
              >
                {pageItem + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
