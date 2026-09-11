import axios from "axios";



const api = axios.create({
     baseURL:"http://localhost:5000/api"

})
// interceptor howa mécanisme dakhel f requect 9bel matmchi l backend
api.interceptors.request.use(
    // config => hiya function fiha configuration dyal res lighadi trsl 
    (config)=>{
        const token=localStorage.getItem("token")
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
})
   

export default api