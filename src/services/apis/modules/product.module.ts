import axios from "axios";

export default {
    create: async function(formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "products", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    findMany: async function() {
        return await axios.get(import.meta.env.VITE_SV_HOST + "products")
    },

    findById: async function(productId: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}products/` + productId)
    },
}