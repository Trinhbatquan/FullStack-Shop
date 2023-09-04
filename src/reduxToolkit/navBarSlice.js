import { createSlice } from "@reduxjs/toolkit";

const keyLocale = JSON.parse(localStorage.getItem("navBarShop"));

const initialState = {
  keyNavBar: keyLocale || "",
};

const navBarSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setNavBar: (state, action) => {
      localStorage.setItem("navBarShop", JSON.stringify(action.payload));
      return {
        keyNavBar: action.payload,
      };
    },
  },
});

const { reducer, actions } = navBarSlice;
export const { setNavBar } = actions;
export default reducer;
