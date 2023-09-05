import { ActionCreatorWithoutPayload, createSlice } from "@reduxjs/toolkit";

export interface CommonStateType {
    count: number
}

const initialState: CommonStateType = {
    count: 0
}

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        increment: function(state) {
            state.count++;
        }
    }
})

export interface CommonActionType {
    increment: ActionCreatorWithoutPayload<"common/increment">;
}

export const commonAction = {
    ...commonSlice.actions
}

export const commonReducer = commonSlice.reducer