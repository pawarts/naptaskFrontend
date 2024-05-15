import { createSlice } from "@reduxjs/toolkit";

const taskFormSlice = createSlice({
    name: 'taskForm',
    initialState: {
        timeStart: '',
        timeEnd: ''
    },
    reducers: {
        setTimeStart(state, action) {
            state.timeStart = action.payload;
        },

        setTimeEnd(state, action) {
            state.timeEnd = action.payload;
        }
    }
})

export const { setTimeStart, setTimeEnd } = taskFormSlice.actions;

export default taskFormSlice.reducer;