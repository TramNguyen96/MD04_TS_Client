import axios from "axios";

export default {
    register: async function(newUser: any){
        return await axios.post(import.meta.env.VITE_SV_HOST + "users", newUser)
    }
}