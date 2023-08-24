import axios from "axios"

export default {
    postApi : (url,data)=>{
        return axios.post(url,data)
    },
    postApiAuth : (url,data,token)=>{
        return axios.post(url,data,{headers:{Authorization:'Bearer '+token}})
    },
    getApi : (url,token)=>{
        return axios.get(url,{headers:{Authorization:'Bearer '+token}});
    },
    putApi : (url,data,token)=>{
        return axios.put(url,data,{headers:{Authorization:'Bearer '+token}});
    },
    deleteApi :(url,token)=>{
        return axios.delete(url,{headers:{Authorization:'Bearer '+token}})
    }
}