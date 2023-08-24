import { useRef, useState } from "react"
import WebAPI from "../Other/WebAPI";
import WebMethodes from "../Other/WebMethodes";
import { useDispatch, useSelector } from "react-redux";
import { addToApList, updateApList } from "../redux/appointmentList";

export default function AddApointment(){
  const dispatch = useDispatch()
  const APlist = useSelector(state=>state.lsitOfApointment.value)
    const userData = useSelector(state=>state.userDoctor.value)
    const [resultMsg,setresultMsg] = useState();
    const nameBox = useRef()
    const numberBox = useRef()
    const ageBox = useRef()
    const sxBox = useRef()
    const timeBox = useRef()
    const dateBox = useRef()
    var add = async (event)=>{
        event.preventDefault();
        var ob = {
            name: nameBox.current.value,
            sex:sxBox.current.value,
            age:ageBox.current.value,
            phoneNumber:numberBox.current.value,
            appointmentdate:dateBox.current.value,
            time:timeBox.current.value
         }
         const rspn = await WebMethodes.postApiAuth(WebAPI.saveApointment,ob,userData.token)
         
         if(rspn.data.status){
          var obj = {...rspn.data.data, address: {
            id: userData.id,
            name: userData.name,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            password: userData.password,
            raddress: userData.raddress,
            activeStatus: true,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            doctor: userData.doctor
        }}
            dispatch(updateApList([obj,...APlist]))
         }
         setresultMsg(rspn.data.msg)
    }
    return <div>
               <section className="book_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={add}>
            <h4>
              ADD-<span>RECEPTIONIST</span>
            </h4>
            <div className="form-row ">
            <div className="form-group col-lg-4">
                <label>Name </label>
                <input ref={nameBox} type="text" className="form-control" placeholder="Enter Name"/>
              </div>
              <div className="form-group col-lg-4">
                <label for="inputPhone">Phone Number</label>
                <input ref={numberBox} type="number" className="form-control" id="inputPhone" placeholder="XXXXXXXXXX"/>
              </div>
              <div className="form-group col-lg-4">
                <label>Age </label>
                <input ref={ageBox} type="number" className="form-control" placeholder="Enter Age"/>
              </div>
            </div>
            <div className="form-row ">
            <div className="form-group col-lg-4">
                <label for="inputDoctorName">Gender</label>
                <select ref={sxBox} className="form-control wide" id="inputDoctorName">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group col-lg-4">
                <label>Date </label>
                <input ref={dateBox} type="date" className="form-control" />
              </div>
              <div className="form-group col-lg-4">
                <label>Time </label>
                <input ref={timeBox} type="time" className="form-control" />
              </div>
            </div>
            <div className="btn-box">
              <button type="submit" className="btn ">ADD</button>
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