import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
    name: 'view',
    initialState: {
        busyTimeView: false
    },
    reducers: {
        busyTimeChange(state, action) {
            const payload = action.payload;

            state.busyTimeView = payload
        }
    }
})

export const { busyTimeChange } = viewSlice.actions;

export default viewSlice.reducer