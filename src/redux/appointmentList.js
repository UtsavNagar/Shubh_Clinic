import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name : "apointmentList",
    initialState:{
        value : undefined
    },
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