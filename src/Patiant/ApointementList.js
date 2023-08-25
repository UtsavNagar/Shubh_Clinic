import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import WebMethodes from "../Other/WebMethodes"
import WebAPI from "../Other/WebAPI"
import { updateApList } from "../redux/appointmentList"
import { updateRec } from "../redux/updateSlice"
import { useNavigate } from "react-router-dom"

export default function ApointmentList(){
  var searchData = useRef({value:""})
  const [Value,setValue] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const APlist = useSelector(state=>state.lsitOfApointment.value)
  const userData = useSelector(state=>state.userDoctor.value)
  const [currentStatus,setStatus] = useState(false)
    const apointmentData = useSelector(state=>state.lsitOfApointment.value)
    
    var undo = async (id)=>{
      const rspn = await WebMethodes.putApi(WebAPI.apointmentUndo+id,null,userData.token)
      if(rspn.data.status){
        var list = APlist.filter(ob=>ob.id!=rspn.data.data.id)
        dispatch(updateApList([rspn.data.data,...list]))
      }
    }
    var del = async (id)=>{
      var status = window.confirm("Are You Sure You Want To delete This Data ? ")
      if(status){
        const rspn = await WebMethodes.deleteApi(WebAPI.appointmentDelete+id,userData.token)
        if(rspn.data.status){
          var list = APlist.filter(ob=>ob.id!=rspn.data.data.id)
          dispatch(updateApList(list))
        }
      }
    }
    var update=(ob)=>{
      dispatch(updateRec(ob))
      navigate("/update-appointment")
    }

    
    var checkDate=(ob)=>{
      var snm = searchData.current.value
      if(snm=="") return true
      var onm = ob.appointmentdate.slice(0,snm.length)
      if(snm.toLowerCase()==onm.toLowerCase()) return true
      if(snm.toLowerCase()==ob.name.slice(0,snm.length).toLowerCase()) return true
      if(snm == ob.id.toString().slice(0,snm.length)) return true;
      if(snm == ob.phoneNumber.toString().slice(0,snm.length)) return true;
      return false
    }
    
    var changing = (event)=>{
      event.preventDefault();
      setValue(!Value)
    }
    return <div>
      <div className="container mt-5"> 
      <div className="row mb-3 text-center">
        <div className="col-6">
          <input type="text" onChange={changing} ref={searchData} className="form-control text-center" placeholder="Search By Id/Name/Phone Number/date(yyyy-mm-dd)"/>
        </div>
      
        <div className="col-3 ">
          <button onClick={()=>setStatus(true)} className="btn btn-primary">Incomplete Appointments</button>
        </div>
        <div className="col-3">
          <button  onClick={()=>setStatus(false)}  className="btn btn-warning">Completed Appointments</button>
        </div>
      </div>
      <h5 className="mt-3 text-center">Total Patients : {apointmentData.reduce((count,ob)=>ob.address.id==userData.id && ob.activeStatus==currentStatus && checkDate(ob)?count+=1:count,0)}</h5>
      </div>
      {apointmentData.filter(ob=>ob.address.id==userData.id && (ob.activeStatus==currentStatus && checkDate(ob))).map(ob=><section className="book_section layout_padding">
    <div style={{border:"0px solid black",padding:"25px",borderRadius:"10px",boxShadow:"0px 0px 15px lightgrey"}} className="container">
      <div className="row">
        <div className="col">
          <div>
            <h4>
              SHUBH <span>CLINIC</span>
            </h4>
            <div className="form-row ">
              <div className="form-group col-lg-3">
                <label>Patient ID :</label><b> {ob.id}</b>
              </div>
              <div className="form-group col-lg-3">
              <label>Patient Name :</label><b> {ob.name}</b>
              </div>
                <div className="form-group col-lg-3">
                <label>Gender :</label><b> {ob.sex}</b>
                </div>
                <div className="form-group col-lg-3">
                <label>Patient Age :</label><b> {ob.age}</b>
                </div>
            </div>
            <hr></hr>
            <div className="form-row ">
              <div className="form-group col-lg-3">
                <label>Patient Contect :</label><b> {ob.phoneNumber}</b>
              </div>
              <div className="form-group col-lg-3">
              <label>Doctor ID:</label><b> {ob.doctor_name}</b>
              </div>
                <div className="form-group col-lg-3">
                <label>Address :</label><b> {ob.raddress}</b>
                </div>
                <div className="form-group col-lg-3">
                </div>
            </div>
            <hr/>
            <div className="form-row ">
              <div className="form-group col-lg-6">
                <label>Daignosis :</label><b> {ob.daignosis}</b>
              </div>
              <div className="form-group col-lg-6">
              <label>Appointment : </label><br/>
              <b>Date : {ob.appointmentdate}</b><br/>
              <b>Time : {ob.time}</b>
              </div>
            </div>
            <div className="btn-box"><hr/><hr/>
            <div className="form-row ">
              <div className="form-group col-lg-3">
                <label>Receptionist ID :</label><b> {ob.address.id}</b>
              </div>
              <div className="form-group col-lg-3">
              <label>Receptionist Name : </label><b> {ob.address.name}</b>
              </div>
              <div className="form-group col-lg-3">
                <label><b>Contact</b></label><br/>
                <>Phone Number : {ob.address.phoneNumber}</><br/>
                <i>Email : {ob.address.email}</i>
              </div>
              <div className="form-group col-lg-3">
              <label>Reception Address : </label><b> {ob.address.raddress}</b>
              </div>
            </div><hr/>

            <div className="form-row text-center">
            <div className="form-group col-lg-4">
                <button onClick={()=>update(ob)} className="btn btn-info">UPDATE</button>
              </div>
              <div className="form-group col-lg-4">
              {currentStatus?
                ''
              : 
                <button onClick={()=>undo(ob.id)} className="btn btn-warning">UNDO</button>
              }
              </div>
              
              <div className="form-group col-lg-4">
                <button onClick={()=>del(ob.id)} className="btn btn-danger">DELETE</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>)}
    </div>
}