import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    type: null
}

const toastSlice = createSlice (
   {
    name: 'toast',
    initialState,
    reducers: 
        {
            getTypeToast: (state, action) => {
                state.type = action.payload
            }
        }
   }
)

const {reducer, actions} = toastSlice;
export const {getTypeToast} = actions;
export default reducer;
