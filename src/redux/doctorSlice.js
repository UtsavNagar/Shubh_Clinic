
const { createSlice } = require("@reduxjs/toolkit");
const dataFromLS = JSON.parse(localStorage.getItem('loginInShubhClinic')) || {}
const initialState={
    value : {
        id: dataFromLS.id || undefined,
        name: dataFromLS.name || undefined,
        phoneNumber: dataFromLS.phoneNumber || undefined,
        email: dataFromLS.email || undefined,
        isActive : dataFromLS.isActive || false,
        token: dataFromLS.token ||undefined,
        type : dataFromLS.type || undefined
    }
}

const slice = createSlice({
    name : "doctorInfo",
    initialState,
    reducers:{
        updateDoctor : (state,action)=>{
            const data = action.payload;
            state.value = data
        }
    }
})

export const {updateDoctor} = slice.actions
export default slice.reducer;