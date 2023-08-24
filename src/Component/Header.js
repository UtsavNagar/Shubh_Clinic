import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateDoctor } from "../redux/doctorSlice";

export default function Header(){
  const navigate = useNavigate()
  const userData = useSelector(state=>state.userDoctor.value)
  const dispatch =useDispatch()
  var logout=()=>{
    dispatch(updateDoctor({...userData,isActive:false}))
    navigate("/login")
  }
    return <div>
        
    <header className="header_section">
      
      <div className="header_bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to={"/"}>
              <b style={{color:"#00c6a9",fontSize:"35px"}}>Shubh Clinic</b>
            </Link>


            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className=""> </span>
            </button>   
            <div className="collapse navbar-collapse" id="navbarSupportedContent">         

              {userData.isActive? userData.type=="doctor"?
              <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav  ">
                <li className="nav-item active">
                  <Link className="nav-link" to={"/save-reception"}>Add Receptionist <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/list-reception"} >reception list</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Dr-list-apointment"}>Apointment List</Link>
                </li>
                
              </ul>
                <div className="quote_btn-container">
                <Link to={"/doctorprofile"}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span>
                    Profile
                  </span>
                </Link>
                <button onClick={logout} className="btn btn-danger">
                  Log Out
                </button>
                </div>
                </div>
                :
                <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav  ">
                <li className="nav-item">
                  <Link className="nav-link" to={"/add-apointment"}>Add Apointment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/list-apointment"}>Apointment List</Link>
                </li>
              </ul>
                <div className="quote_btn-container">
                <Link to={"/doctorprofile"}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span>
                    Profile
                  </span>
                </Link>
                <button onClick={logout} className="btn btn-danger">
                  Log Out
                </button>
                </div>
                </div>

                :
                <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav  ">
                <li className="nav-item active">
                  <Link className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/about"}> about</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/treatment"} >treatments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/doctors"}>doctor</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to={"/contact"}>contact</Link>
                </li>
              </ul>
                
                <div className="quote_btn-container">
                <Link to={"/login"}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span>
                    Login
                  </span>
                </Link>
                <Link to={"/register"}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span>
                    Sign Up
                  </span>
                </Link>
              </div>
              </div>
              }
              </div>
          </nav>
        </div>
      </div>
    </header>
    </div>
}