import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allProducts: {},
    productIdSelect: null,
    productsBySearch: []
}

const productSlice = createSlice(
    {
        name: 'product',
        initialState,
        reducers: 
                {
                    getProductsByAll: (state, action) => {
                        return {
                            ...state,
                            allProducts: action.payload
                        }
                    },
                    getProductsById: (state, action) => {
                        return {
                            ...state,
                            productIdSelect: action.payload
                        }
                    },
                    getProductsBySearch: (state, action) => {
                        const filterProducts = state?.allProducts?.products.filter((product) => {
                            return product.name.toLowerCase().includes(action.payload.toLowerCase())
                        })
                        return {
                            ...state,
                            productsBySearch: filterProducts
                        }
                    }
                }
    }
)

const {reducer, actions} = productSlice;
export const {getProductsByAll, getProductsById, getProductsBySearch} = actions;
export default reducer;
