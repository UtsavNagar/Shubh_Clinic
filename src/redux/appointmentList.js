import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem('appintlistSC')) || []
const initialState = {
    value : data
}
const slice = createSlice({
    name : "apointmentList",
    initialState,
    reducers:{
        addToApList : (state,action)=>{
            state.value = [action.payload,...state.value]
        },
        updateApList : (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {updateApList,addToApList} = slice.actions
export default slice.reducer;