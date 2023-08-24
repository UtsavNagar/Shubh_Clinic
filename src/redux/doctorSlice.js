const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name : "doctoreInfo",
    initialState:{
        value : {
            id: undefined,
            name: undefined,
            phoneNumber: undefined,
            email: undefined,
            password: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            isActive : false,
            token:undefined,
            type : undefined
        }
    },
    reducers:{
        updateDoctor : (state,action)=>{
            var data = action.payload;
            state.value = data
        }
    }
})

export const {updateDoctor} = slice.actions
export default slice.reducer;