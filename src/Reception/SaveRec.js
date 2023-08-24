import { useRef, useState } from "react";
import WebMethodes from "../Other/WebMethodes";
import WebAPI from "../Other/WebAPI";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "../redux/receptionList";

export default function SaveRec (){
  const dispatch = useDispatch();
    const doctorData = useSelector(state=>state.userDoctor.value)
    const [resultMsg,setresultMsg] = useState();
    const nameBox = useRef()
    const numberBox = useRef()
    const emailBox = useRef()
    const passwordBox = useRef()
    const addressBox = useRef()

    var add= async (event)=>{
        event.preventDefault();
        var ob ={ 
          name: nameBox.current.value,
          phoneNumber: numberBox.current.value,
          email: emailBox.current.value,
          password: passwordBox.current.value,
          raddress: addressBox.current.value
        }
        const rspn = await WebMethodes.postApiAuth(WebAPI.newRecAdd,ob,doctorData.token)
        console.log(ob,rspn)
        if(rspn.data.status){
          setresultMsg("Data Saved")
            dispatch(addToList(rspn.data.data))
            event.target.reset()
          }
          else{
            setresultMsg("data save Failed !")
          }
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
              <div className="form-group col-lg-4">
                <label for="inputSymptoms">Address</label>
                <textarea  ref={addressBox} type="text" className="form-control"  placeholder="Enter Your Address"/>
              </div>
            </div>
            <div className="btn-box">
              <button type="submit" className="btn ">Add</button>
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