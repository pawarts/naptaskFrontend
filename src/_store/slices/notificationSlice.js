import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./viewSlice";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: []
    },
    reducers: {
        setNotificationArray(state, action) {
            const { payload } = action;

            state.notification = payload;
        }
    }
})

export const { setNotificationArray } = notificationSlice.actions;

export default notificationSlice.reducer