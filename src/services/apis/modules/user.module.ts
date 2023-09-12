import data from "@/i18n/translations/en";
import axios from "axios";

export default {
    register: async function(newUser: any){
        return await axios.post(import.meta.env.VITE_SV_HOST + "users", newUser)
    },

    login: async function(data: any){
        return await axios.post(import.meta.env.VITE_SV_HOST + "users/login", data)
    },

    authentication: async function(data: any){
        return await axios.get(import.meta.env.VITE_SV_HOST + "auth", data)
    }, 

    findMany: async function(){
        return await axios.get(import.meta.env.VITE_SV_HOST + "users" )
    },

    infoById: async function(userId: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}users/` + userId)
    },
}