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

export default store