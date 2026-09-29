// service will be an object with all initial configurations for the requests made into the backend.
import axios from "axios"
import { supabase } from "@/lib/superBaseClient"

const service = axios.create({baseURL: `${import.meta.env.VITE_API_URL}/api`})

// here we also get the token from superbase and sent it to the backend -> the backend then verify if this token is real or valid
// in here our token does not come from our local storage anymore -> but from the superbase

service.interceptors.request.use(async (config)=> {
const {data} = await supabase.auth.getSession();

if(data.session){
const authToken = data.session.access_token;
if(authToken){
config.headers.Authorization = `Bearer ${authToken}`
}    
}
return config
})

export default service