import {  useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebAPI from "../Other/WebAPI";
import WebMethodes from "../Other/WebMethodes";
import { updateList } from "../redux/receptionList";

export default function UpdateRec (){
  var [namVal,setNameVal] = useState()
  var [val,setVal] = useState(false)
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDoctor.value)
  const recDataUpdate = useSelector(state=>state.updateRec.value)
  const recData = useSelector(state=>state.lsitOfReception.value)
    const [resultMsg,setresultMsg] = useState();
    var nmBox = useRef()
    var oldPasswordBox = useRef();
    var newPasswordBox = useRef();
    var phoneBox = useRef();

    var update = async (event) =>{
      event.preventDefault();
      var ob = {
        name:nmBox.current.value,
        password:newPasswordBox.current.value,
        oldPassword:oldPasswordBox.current.value,
        phoneNumber:phoneBox.current.value
     }
     const rspn = await WebMethodes.putApi(WebAPI.receptionUpdate+recDataUpdate.id,ob,userData.token)
     if(rspn.data.status){
        var newRecList = recData.filter(ob=>ob.id!=recDataUpdate.id)
        console.log(rspn.data.data)
        dispatch(updateList([rspn.data.data,...newRecList]))
        setresultMsg(rspn.data.msg)
        event.target.reset()
     }
     else{
      setresultMsg("Update Failed!")
     }
    }
    return <div>
       <div>
        <section className="book_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={update}>
            <h4>
              UPDATE-<span>RECEPTIONIST</span>
            </h4>
            <div className="form-row ">
              <div className="form-group col-lg-4">
                <label for="inputPatientName">Name </label>
                <input defaultValue={recDataUpdate.name}
                        type="text" 
                       ref={nmBox}
                       className="form-control"
                       placeholder="Enter Your Name"
                />
              </div>
              <div className="form-group col-lg-4">
                <label for="inputPatientName">Old Password </label>
                <input defaultValue={recDataUpdate.password} ref={oldPasswordBox} type="password" className="form-control" placeholder="Enter Your old password"/>
              </div>
              <div className="form-group col-lg-4">
                <label for="inputPatientName">New Password </label>
                <input ref={newPasswordBox} type="password" className="form-control" placeholder="Enter Your new Password"/>
              </div>
            </div>
            <div className="form-row ">
              <div className="form-group col-lg-4">
                <label for="inputPatientName">Phone Number </label>
                <input defaultValue={recDataUpdate.phoneNumber} ref={phoneBox} type="number" className="form-control" placeholder="Enter Your Phone Number"/>
              </div>
              </div>
            <div className="btn-box">
              <button className="btn ">Update Now</button>
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
    </div>
}