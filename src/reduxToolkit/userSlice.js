import { createSlice } from "@reduxjs/toolkit";


const userLocalStorage = JSON.parse(localStorage.getItem('userShop'))
const initialState = {
    user: userLocalStorage || null,
    profileUser: null,
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: 
                {
                 loginUserShop: (state, action) => {
                    state.user = action.payload;
                 },
                 profileUserShop: (state, action) => {
                    state.profileUser = action.payload;
                 }
                }
    }
)

const {reducer, actions} = userSlice;
export const {loginUserShop, profileUserShop} = actions;
export default reducer;
