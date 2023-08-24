import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import WebMethodes from "../Other/WebMethodes"
import WebAPI from "../Other/WebAPI"
import { updateList } from "../redux/receptionList"
import { updateApList } from "../redux/appointmentList"

export default function DoctorProfile(){
  var userData = useSelector(state=>state.userDoctor.value)
  const dispatch = useDispatch()
  var loadList= async()=>{
    const rspn = await WebMethodes.getApi(WebAPI.receptionList,userData.token)
    if(rspn.data.status){
      dispatch(updateList(rspn.data.data))
    }
    const Alrspn = await WebMethodes.getApi(WebAPI.apointmentList,userData.token);
    if(Alrspn.data.status){
      dispatch(updateApList(Alrspn.data.data))
    }
}
useEffect(()=>{
    loadList()
},[])
    const userDoctor = useSelector(state=>state.userDoctor.value)
    return <div>
        <section className="book_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col">
          <form>
            <h4>
              PROFILE<span></span>
            </h4>
            <div className="form-row ">
              <div className="form-group col-lg-4">
                <label style={{color:"#00c6a9",fontWeight:"bolder",fontSize:"18px"}} for="inputPatientName">ID </label>
                <input value={userDoctor.id}  className="form-control" />
              </div>
              <div className="form-group col-lg-4">
                <label style={{color:"#00c6a9",fontWeight:"bolder",fontSize:"18px"}} for="inputPatientName">Name </label>
                <input value={userDoctor.name} className="form-control" />
              </div>
              <div className="form-group col-lg-4">
                <label style={{color:"#00c6a9",fontWeight:"bolder",fontSize:"18px"}} for="inputPatientName">Phone Number </label>
                <input  value={userDoctor.phoneNumber} className="form-control" />
              </div>
            </div>
            <div className="form-row ">
              <div className="form-group col-lg-4">
                <label style={{color:"#00c6a9",fontWeight:"bolder",fontSize:"18px"}} for="inputPatientName">Email </label>
                <input value={userDoctor.email}  className="form-control" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
    </div>
}