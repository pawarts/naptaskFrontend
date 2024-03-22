import { createSlice } from "@reduxjs/toolkit";

const freeTimeSlice = createSlice({
    name: 'freeTime',
    initialState: {
        freeTimeArray: [],
        timeGap: 0,
        choosedTime: {
            timeStart: '',
            timeEnd: ''
        }
    },
    reducers: {
        setFreeTime(state, action) {
            state.freeTimeArray = action.payload
        },
        setTimeGap(state, action) {
            state.timeGap = action.payload
        },
        setChoosedTime(state, action) {
            const payload = action.payload;

            state.choosedTime.timeStart = payload.timeStart
            state.choosedTime.timeEnd = payload.timeEnd
        }
    }
})

export const { setFreeTime, setTimeGap, setChoosedTime } = freeTimeSlice.actions

export default freeTimeSlice.reducer