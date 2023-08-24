const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name : "updaterecpetion",
    initialState:{
        value : undefined
    },
    reducers:{
        updateRec : (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {updateRec} = slice.actions
export default slice.reducer;