import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./doctorSlice";
import receptionList from "./receptionList";
import updateSlice from "./updateSlice";
import appointmentList from "./appointmentList";

const store = configureStore(
    {
        reducer:{
            userDoctor:doctorSlice,
            lsitOfReception : receptionList,
            updateRec : updateSlice,
            lsitOfApointment : appointmentList
        }
    }
)

store.subscribe(()=>{
    const { id,name,phoneNumber,email,isActive,token,type } = store.getState().userDoctor.value
    const userDATA = JSON.stringify({ id,name,phoneNumber,email,isActive,token,type })
    localStorage.setItem('loginInShubhClinic',userDATA)
    localStorage.setItem('appintlistSC',JSON.stringify(store.getState().lsitOfApointment.value))
    localStorage.setItem('reclistSC',JSON.stringify(store.getState().lsitOfReception.value))
})

export default store