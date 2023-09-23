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
    updateAllCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return {
        ...current(state),
        carts: action.payload,
      };
    },
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
      const carts = [...current(state).carts];
      // console.log(carts)
      const cartsDelete = action.payload;
      cartsDelete.forEach((item) => {
        for (let i = 0; i < carts.length; i++) {
          if (item?.product === carts[i]?.product) {
            carts.splice(i, 1);
            break;
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(carts));
      return {
        ...current(state),
        carts,
      };
    },
    // deleteManyCart: (state, action) => {
    //   let carts = [...current(state).carts];
    //   let cartDelete = action.payload;
    //   console.log(carts);
    //   console.log(cartDelete);
    //   for (let i = 0; i < cartDelete.length; i++) {
    //     carts = carts.filter((item) => {
    //       return item.product !== cartDelete[i];
    //     });
    //   }
    //   localStorage.setItem("cart", JSON.stringify(carts));
    //   return {
    //     ...current(state),
    //     carts,
    //   };
    // },
    addDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(state.deliveryAddress)
      );
    },
    deleteAllCarts: (state, action) => {
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        ...current(state),
        carts: [],
      };
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
  updateAllCart,
} = actions;
export default reducer;
