import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
    name: 'date',
    initialState: {
        date: new Date().toISOString(),
        day: `${new Date().getDay()}`,
        dayShortForm: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        monthShortForm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    },
    reducers: {
        nextDay(state, action) {
            const date = new Date(state.date)
            const newDate = new Date(date.getTime() + (1000 * 60 * 60 * 24))

            state.date = newDate.toISOString()
            state.day = `${newDate.getDay()}`
        },
        prevDay(state, action) {
            const date = new Date(state.date)
            const newDate = new Date(date.getTime() - (1000 * 60 * 60 * 24))

            state.date = newDate.toISOString()
            state.day = `${newDate.getDay()}`
        },
        nowDay(state, action) {
            const newDate = new Date()
            state.date = newDate.toISOString()
            state.day = `${newDate.getDay()}`
        }
    }
})

export const { nextDay, prevDay, nowDay } = dateSlice.actions;

export default dateSlice.reducer