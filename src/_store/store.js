import { configureStore } from "@reduxjs/toolkit"

import taskReducer from "./slices/taskSlice"
import dateReducer from "./slices/dateSlice"
import authReducer from "./slices/authSlice"
import scheduleReducer from "./slices/scheduleSlice"
import viewReducer from "./slices/viewSlice"
import freeTimeReducer from "./slices/freeTimeSlice"
import taskFormReducer from './slices/taskFormSlice'
import contextReducer from "./slices/contextSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
        schedules: scheduleReducer,
        date: dateReducer,
        view: viewReducer,
        freeTime: freeTimeReducer,
        taskForm: taskFormReducer,
        context: contextReducer
    }
})
