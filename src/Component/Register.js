import axios from "axios";
import { useRef, useState } from "react";
import WebAPI from "../Other/WebAPI";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate = useNavigate();
    const [resultMsg,setresultMsg] = useState();
    const nameBox = useRef()
    const numberBox = useRef()
    const emailBox = useRef()
    const passwordBox = useRef()

    var add= async (event)=>{
        event.preventDefault();
        var ob ={ 
          name: nameBox.current.value,
          phoneNumber: numberBox.current.value,
          email: emailBox.current.value,
          password: passwordBox.current.value
        }
        const rspn = await axios.post(WebAPI.registerAPI,ob)
        console.log(rspn)
        if(rspn.data.status){
            setresultMsg(rspn.data.message)
          }
          navigate("/login")
          setresultMsg(rspn.data.message)
    }
    return <div>
       <section className="book_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={add}>
            <h4>
              SIGN <span>UP</span>
            </h4>
            <div className="form-row ">
            <div className="form-group col-lg-4">
                <label for="inputPatientName">Name </label>
                <input ref={nameBox} type="text" className="form-control" placeholder="Enter Your Name"/>
              </div>
              <div className="form-group col-lg-4">
                <label for="inputPhone">Phone Number</label>
                <input ref={numberBox} type="number" className="form-control" id="inputPhone" placeholder="XXXXXXXXXX"/>
              </div>
              <div className="form-group col-lg-4">
                <label for="inputPatientName">Email </label>
                <input ref={emailBox} type="email" className="form-control" placeholder="Enter Your Email"/>
              </div>
            </div>
            <div className="form-row ">
              <div className="form-group col-lg-4">
                <label for="inputSymptoms">Password</label>
                <input  ref={passwordBox} type="password" className="form-control"  placeholder="Enter Your Password"/>
              </div>
            </div>
            <div className="btn-box">
              <button type="submit" className="btn ">Submit Now</button>
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