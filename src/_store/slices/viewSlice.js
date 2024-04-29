import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
    name: 'view',
    initialState: {
        busyTimeView: false,
        addCollobarator: false,
        taskInfoMode: 'Chat' //'Task info'
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
        }
    }
})

export const { busyTimeChange, setAddCollaborator, setTaskInfoMode } = viewSlice.actions;

export default viewSlice.reducer