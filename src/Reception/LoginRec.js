import { useRef, useState } from "react";
import WebAPI from "../Other/WebAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctor } from "../redux/doctorSlice";
import WebMethodes from "../Other/WebMethodes";

export default function Login(){
  const userDoctor = useSelector(state => state.userDoctor.value)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [resultMsg,setresultMsg] = useState();
    var emailBox = useRef();
    var passwordBox = useRef();
    var add= async (event)=>{
      event.preventDefault();
        var ob={
          email:emailBox.current.value,password:passwordBox.current.value
      }
        const rspn = await WebMethodes.postApi(WebAPI.loginAPI,ob);
        if(rspn.data.status){
          setresultMsg(rspn.data.message)
          dispatch(updateDoctor({...rspn.data.data,isActive:true,token:rspn.data.msg,type:rspn.data.type}))
          navigate("/doctorprofile")
        }
        else{
          setresultMsg("Log-in Failed !")
        }
    }
    return <div>
        <section className="book_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={add}>
            <h4>
              LOG-<span>IN</span>
            </h4>
            <div className="form-row ">
              <div className="form-group col-lg-4">
                <label for="inputPatientName">Email </label>
                <input ref={emailBox} type="email" className="form-control" placeholder="Enter Your Email"/>
              </div>
              <div className="form-group col-lg-4">
                <label for="inputPatientName">Password </label>
                <input ref={passwordBox} type="password" className="form-control" placeholder="Enter Your password"/>
              </div>
            </div>
            <div className="btn-box">
              <button className="btn ">Submit Now</button>
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