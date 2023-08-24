import Header from "./Component/Header"
import Home from "./Component/Home"
import About from "./Component/About"
import Treatment from "./Component/Treatment"
import Doctors from "./Component/Doctors"
import Contact from "./Component/Contact"
import Footer from "./Component/footer"
import Login from "./Component/Login"
import Register from "./Component/Register"
import { Route, Routes } from "react-router-dom"
import DoctorProfile from "./Component/DoctorProfile"
import SaveRec from "./Reception/SaveRec"
import UpdateRec from "./Reception/UpdateRec"
import ListRec from "./Reception/ListRec"
import LoginRec from "./Reception/LoginRec"
import AddApointment from "./Patiant/AddApointment"
import ApointmentList from "./Patiant/ApointementList"
import { useSelector } from "react-redux"
import Error from "./Component/Error"
import UpdateAppointment from "./Patiant/UpdateAppointment"
import DrApointmentList from "./Reception/DrApointementList"

export default function App(){
  var userData = useSelector(state=>state.userDoctor.value);
  return <div>
    <Header/>
    <Routes>
    {userData.isActive?
    <>
    <Route path="/doctorprofile" element={<DoctorProfile/>}/>
      <Route path="/save-reception" element={<SaveRec/>}/>
      <Route path="/update-reception" element={<UpdateRec/>}/>
      <Route path="/list-reception" element={<ListRec/>}/>
      <Route path="/login-reception" element={<LoginRec/>}/>
      <Route path="/add-apointment" element={<AddApointment/>}/>
      <Route path="/Dr-list-apointment" element={<DrApointmentList/>}/>
      <Route path="/list-apointment" element={<ApointmentList/>}/>
      <Route path="/update-appointment" element={<UpdateAppointment/>}/>
    </> : 
    <>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/treatment" element={<Treatment/>}/>
      <Route path="/doctors" element={<Doctors/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </>}
    <Route path="*" element={<Error/>}/>
    </Routes>
    
    <Footer/>
  </div>
}