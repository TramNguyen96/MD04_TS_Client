import axios from "axios";

export default {
    findMany: async function() {
        return await axios.get(import.meta.env.VITE_SV_HOST + "categories")
    },

    findByCategotyId: async function(id: string) {
        return await axios.get(import.meta.env.VITE_SV_HOST + "categories" + id)
    },
}