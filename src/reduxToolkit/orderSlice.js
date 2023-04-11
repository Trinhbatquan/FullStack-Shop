import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    order: null,
    orderId: {},
    orderUpdatePay: {},
    ordersByUser: [],
}

const orderSlice = createSlice(
    {
        name: 'order',
        initialState,
        reducers: 
                {
                    createOrder: (state, action) => {
                        state.order = action.payload;
                    },
                    getOrderById: (state, action) => {
                        state.orderId = action.payload;
                    },
                    updateOrderPay: (state, action) => {
                        state.orderUpdatePay = action.payload;
                    },
                    getOrdersByUser: (state, action) => {
                        state.ordersByUser = action.payload;
                    }
                }
    }
)

const {reducer, actions} = orderSlice;
export const {createOrder, getOrderById, updateOrderPay, getOrdersByUser} = actions;
export default reducer;
