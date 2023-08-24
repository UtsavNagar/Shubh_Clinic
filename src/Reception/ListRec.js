import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateRec } from "../redux/updateSlice";
import WebAPI from "../Other/WebAPI";
import WebMethodes from "../Other/WebMethodes";
import { updateList } from "../redux/receptionList";

export default function ListRec (){
    const userData = useSelector(state=>state.userDoctor.value)
    const recList = useSelector(state=>state.lsitOfReception.value)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var recData = useSelector(state=>state.lsitOfReception.value)
    var del = async (event)=>{
        var status = window.confirm("Are You Sure You Want Delete ?")
        if(status){
            const rspn = await WebMethodes.putApi(WebAPI.receptionDelete+event.target.value,null,userData.token)
            if(rspn.data.msg){
                const newRecList = recList.filter(ob=>ob.id!=event.target.value)
                dispatch(updateList(newRecList))
            }
        }
    }
    var update=(ob)=>{
        dispatch(updateRec(ob))
        navigate("/update-reception")
    }
    return <div>
        <table className="table table-stripped m-5">
            <thead>
                <tr>
                <th>Sr. no.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Contact</th>
                <th>password</th>
                <th>Address</th>
                <th>Doctor</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {recData.map((ob,index)=><tr>
                        <td>{index+1}</td>
                        <td>{ob.id}</td>
                        <td>{ob.name}</td>
                        <td><b>Phone No. : {ob.phoneNumber}</b><br/>
                        <i>email : {ob.email}</i></td>
                        <td>{ob.password}</td>
                        <td>{ob.raddress}</td>
                        <td>{ob.doctor==userData.id?userData.name : ob.doctor}</td>
                        <td>
                        <button onClick={del} value={ob.id} className="btn btn-sm btn-danger">Delete</button> &nbsp; &nbsp;
                        <button onClick={()=>{update(ob)}} className="btn btn-sm btn-info">Update</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}