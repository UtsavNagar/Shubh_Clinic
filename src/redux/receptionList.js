const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name : "receptionList",
    initialState:{
        value : undefined
    },
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