import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebMethodes from "../Other/WebMethodes";
import WebAPI from "../Other/WebAPI";
import { updateApList } from "../redux/appointmentList";

export default function UpdateAppointment(){
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.userDoctor.value)
    const APList = useSelector(state=>state.lsitOfApointment.value)
    const [resultMsg,setresultMsg] = useState();
    const nameBox = useRef()
    const numberBox = useRef()
    const dateBox = useRef()
    const dataForUpdate = useSelector(state=>state.updateRec.value)

    var Update = async(event)=>{
        event.preventDefault()
        const ob ={
            name:nameBox.current.value,
            appointmentdate:dateBox.current.value,
            phoneNumber:numberBox.current.value
         }
         const rspn = await WebMethodes.putApi(WebAPI.appointmentUpdate+dataForUpdate.id,ob,userData.token)
         if(rspn.data.status){
            var newAPList = APList.filter(ob=>ob.id!=rspn.data.data.id)
            var newOB = {...dataForUpdate,
                name : nameBox.current.value,
                phoneNumber:numberBox.current.value,
                appointmentdate:dateBox.current.value}
            var fullList = [newOB , ...newAPList]
            dispatch(updateApList(fullList))
         }
         setresultMsg(rspn.data.msg)
    }
    return<div>
        <section className="book_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={Update}>
            <h4>
              UPDATE-<span>APPOINTMENT</span>
            </h4>
            <div className="form-row ">
            <div className="form-group col-lg-4">
                <label>Name </label>
                <input defaultValue={dataForUpdate.name} ref={nameBox} type="text" className="form-control" placeholder="Enter Your Name"/>
              </div>
              <div className="form-group col-lg-4">
                <label for="inputPhone">Phone Number</label>
                <input defaultValue={dataForUpdate.phoneNumber} ref={numberBox} type="number" className="form-control" id="inputPhone" placeholder="XXXXXXXXXX"/>
              </div>
              <div className="form-group col-lg-4">
                <label>Date </label>
                <input defaultValue={dataForUpdate.appointmentdate} ref={dateBox} type="date" className="form-control" />
              </div>
            </div>
            <div className="btn-box">
              <button type="submit" className="btn ">update Now</button>
            </div>
            <div className="btn-box mt-3">
              <b className="text-danger">{resultMsg}</b>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
    </div>
}