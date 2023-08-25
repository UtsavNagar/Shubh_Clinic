const { createSlice } = require("@reduxjs/toolkit");
const data = JSON.parse(localStorage.getItem('reclistSC')) || []
const initialState = {
    value : data
}
const slice = createSlice({
    name : "receptionList",
    initialState,
    reducers:{
        addToList : (state,action)=>{
            state.value = [action.payload,...state.value]
        },
        updateList : (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {updateList,addToList} = slice.actions
export default slice.reducer;