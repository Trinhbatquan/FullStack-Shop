import { createSlice } from "@reduxjs/toolkit";


const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
const deliveryAddressStorage = JSON.parse(localStorage.getItem("deliveryAddress"))

const initialState = {
    carts: cartLocalStorage || [],
    deliveryAddress: deliveryAddressStorage || []
}

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: 
                {
                   addCart: (state, action) => {
                    const newCart = action.payload;
                    const existCart = state.carts.filter(cart => cart.name === newCart.name)
                    if (existCart.length === 0) {
                        state.carts.push(newCart);
                    } 
                   },
                   updateCart: (state, action) => {
                    const updateCart = action.payload;
                    const indexCart = state.carts.findIndex(cart => cart._id === updateCart._id)
                    console.log(indexCart)
                    if (indexCart || (indexCart === 0)) {
                        state.carts[indexCart] = updateCart
                    }
                   },
                   deleteCart: (state, action) => {
                    state.carts.splice(action.payload, 1)
                   },
                   addDeliveryAddress: (state, action) => {
                    state.deliveryAddress = action.payload
                   },
                   deleteAllCarts: (state, action) => {
                    state.carts = action.payload
                   }
                }
    }
)

const {reducer, actions} = cartSlice;
export const {addCart, updateCart, deleteCart, addDeliveryAddress, deleteAllCarts} = actions;
export default reducer;