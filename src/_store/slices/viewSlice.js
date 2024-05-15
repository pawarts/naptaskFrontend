import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
    name: 'view',
    initialState: {
        busyTimeView: false,
        addCollobarator: false,
        notificationWindow: false,
        taskInfoMode: 'Task info', //'Chat',
        warningWindow: false
    },
    reducers: {
        busyTimeChange(state, action) {
            const payload = action.payload;

            state.busyTimeView = payload
        },

        setAddCollaborator(state, action) {
            const payload = action.payload;

            state.addCollobarator = payload
        },

        setTaskInfoMode(state, action) {
            const payload = action.payload;

            state.taskInfoMode = payload
        },

        setNotification(state, action) {
            const { payload } = action;

            state.notificationWindow = payload
        },

        setWarningWindow(state, action) {
            const { payload } = action;

            state.warningWindow = payload
        }
    }
})

export const { busyTimeChange, setAddCollaborator, setTaskInfoMode, setNotification, setWarningWindow } = viewSlice.actions;

export default viewSlice.reducer