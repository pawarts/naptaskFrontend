import { createSlice } from "@reduxjs/toolkit"

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        howManyTaskToday: 0,
        howManyTaskTodayDone: 0
    },
    reducers: {
        addTask(state, action) {

            const payload = action.payload;

            const tasks = payload.tasks;

            state.tasks = tasks;

            const currentTime = new Date();
            let currentMonth = currentTime.getMonth() + 1;
            let currentDay = currentTime.getDate();


            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth;
            }
            if (currentDay < 10) {
                currentDay = '0' + currentDay;
            }
            state.howManyTaskToday = tasks.filter(item => item.date === payload.date).length;
            state.howManyTaskTodayDone = tasks.filter(item => item.date === payload.date && item.done).length;
        }
    }
})

export const { addTask } = taskSlice.actions

export default taskSlice.reducer