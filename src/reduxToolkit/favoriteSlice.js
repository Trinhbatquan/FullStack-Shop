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
  },
});

const { reducer, actions } = favoriteSlice;
export const { getAllFavorites, getFavoriteByFilter } = actions;
export default reducer;
