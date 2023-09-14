import { createSlice, current } from "@reduxjs/toolkit";

const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
const deliveryAddressStorage = JSON.parse(
  localStorage.getItem("deliveryAddress")
);

const initialState = {
  carts: cartLocalStorage || [],
  deliveryAddress: deliveryAddressStorage || {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const newCart = action.payload;
      const existCart = state.carts.filter(
        (cart) => cart.name === newCart.name
      );
      if (existCart.length === 0) {
        state.carts.push(newCart);
      }
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
    updateCart: (state, action) => {
      const updateCart = action.payload;
      const indexCart = state.carts.findIndex(
        (cart) => cart.name === updateCart.name
      );
      console.log(indexCart);
      if (indexCart || indexCart === 0) {
        state.carts[indexCart] = updateCart;
      }
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
    deleteCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
    deleteManyCart: (state, action) => {
      let carts = [...current(state).carts];
      let cartDelete = action.payload;
      console.log(carts);
      console.log(cartDelete);
      for (let i = 0; i < cartDelete.length; i++) {
        // for (let j = 0; j < carts.length; i++) {
        //   if (carts[j].product === cartDelete[i]) {
        //     carts.splice(j, 1);
        //     break;
        //   }
        // }
        carts = carts.filter((item) => {
          return item.product !== cartDelete[i];
        });
      }
      // console.log(carts);
      localStorage.setItem("cart", JSON.stringify(carts));
      return {
        ...current(state),
        carts,
      };
    },
    addDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(state.deliveryAddress)
      );
    },
    deleteAllCarts: (state, action) => {
      state.carts = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
  },
});

const { reducer, actions } = cartSlice;
export const {
  addCart,
  updateCart,
  deleteCart,
  addDeliveryAddress,
  deleteAllCarts,
  deleteManyCart,
} = actions;
export default reducer;
