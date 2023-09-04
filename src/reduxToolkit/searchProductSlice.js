import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  productsOfSearch: {},
  filter: "normal",
};

const searchProductSlice = createSlice({
  name: "productOfSearch",
  initialState,
  reducers: {
    getProductOfSearch: (state, action) => {
      return {
        ...state,
        productsOfSearch: action.payload,
      };
    },
    getProductOfFilter(state, action) {
      let product = [];
      console.log("reducer");
      let { productsOfSearch } = current(state);
      let { page, pages } = productsOfSearch;
      if (action.payload === "normal") {
        product = [...productsOfSearch?.result];
        product.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      } else if (action.payload === "newest") {
        //không sort trực tiếp state ban đầu, copy ra cho an toàn
        // product = result.sort((a, b) => b.price.localeCompare(a.price));
        product = [...productsOfSearch?.result];
        product.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      } else if (action.payload === "rating") {
        product = [...productsOfSearch?.result];
        product.sort((a, b) => b.rating - a.rating);
      } else if (action.payload === "desc") {
        product = [...productsOfSearch?.result];
        product.sort((a, b) => b.price - a.price);
      } else if (action.payload === "asc") {
        product = [...productsOfSearch?.result];
        product.sort((a, b) => a.price - b.price);
      }
      return {
        filter: action.payload,
        productsOfSearch: {
          page,
          pages,
          result: product,
        },
      };
    },
  },
});

const { reducer, actions } = searchProductSlice;
export const { getProductOfSearch, getProductOfFilter } = actions;
export default reducer;
