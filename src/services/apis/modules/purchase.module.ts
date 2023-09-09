import axios from "axios";

export default {
    createGuestReceipt: async function(newGuestReceipt: any, guestReceiptDetailList: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "purchases", {
            newGuestReceipt,
            guestReceiptDetailList
        })
    },

}