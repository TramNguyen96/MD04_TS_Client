import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    isLogin: boolean,
    data: any
}

const initialState: UserState = {
    isLogin: false,
    data: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginData: (state: UserState, action) => {
            return {
                isLogin: true,
                data: action.payload
            }
        },
        logOut: (state: UserState, action)=>{
            return {
                ...state, userInfor: null
            }
        }
        
    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer