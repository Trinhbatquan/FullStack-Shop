import {configureStore} from '@reduxjs/toolkit';
import  productsReducer from './productSlice'
import cartSlice from './cartSlice'
import userSlice from './userSlice'
import toastSlice from './toastSlice'
import orderSlice from './orderSlice'

export const store = configureStore(
    {
        reducer: {
            productsReducer,
            cartSlice,
            userSlice,
            toastSlice,
            orderSlice
        }
    }
)