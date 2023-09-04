import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  favoriteProducts: [],
  filterFavorite: "normal",
};

const favoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState,
  reducers: {
    getAllFavorites: (state, action) => {
      return {
        ...current(state),
        favoriteProducts: action.payload,
      };
    },
    getFavoriteByFilter: (state, action) => {
      let product;
      product = [...current(state)?.favoriteProducts];
      if (product.length === 0 || product.length === 1) {
        return {
          ...current(state),
          filterFavorite: action.payload,
        };
      }
      if (action.payload === "normal") {
        product = product.sort((a, b) =>
          b.product.updatedAt.localeCompare(a.product.updatedAt)
        );
      } else if (action.payload === "asc") {
        product = product.sort((a, b) => a.product.price - b.product.price);
      } else if (action.payload === "desc") {
        product = product.sort((a, b) => b.product.price - a.product.price);
      } else if (action.payload === "rating") {
        product = product.sort(
          (a, b) => b.product.numReviews - a.product.numReviews
        );
      }
      return {
        favoriteProducts: product,
        filterFavorite: action.payload,
      };
    },
    // getProductOfFilter(state, action) {
    //   let product = [];
    //   console.log("reducer");
    //   let { productsOfSearch } = current(state);
    //   let { page, pages } = productsOfSearch;
    //   if (action.payload === "normal") {
    //     product = [...productsOfSearch?.result];
    //     product.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    //   } else if (action.payload === "newest") {
    //     //không sort trực tiếp state ban đầu, copy ra cho an toàn
    //     // product = result.sort((a, b) => b.price.localeCompare(a.price));
    //     product = [...productsOfSearch?.result];
    //     product.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    //   } else if (action.payload === "rating") {
    //     product = [...productsOfSearch?.result];
    //     product.sort((a, b) => b.rating - a.rating);
    //   } else if (action.payload === "desc") {
    //     product = [...productsOfSearch?.result];
    //     product.sort((a, b) => b.price - a.price);
    //   } else if (action.payload === "asc") {
    //     product = [...productsOfSearch?.result];
    //     product.sort((a, b) => a.price - b.price);
    //   }
    //   return {
    //     filter: action.payload,
    //     productsOfSearch: {
    //       page,
    //       pages,
    //       result: product,
    //     },
    //   };
    // },
  },
});

const { reducer, actions } = favoriteSlice;
export const { getAllFavorites, getFavoriteByFilter } = actions;
export default reducer;
