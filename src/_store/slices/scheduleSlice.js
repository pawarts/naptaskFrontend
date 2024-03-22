import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice(
    {
        name: "schedule",
        initialState: {
            schedules: [],
            scheduleBody: [],
            activeSchedule: {
                title: '',
                even: 0,
                scheduleBody: {
                    mon: [],
                    tue: [],
                    wed: [],
                    thu: [],
                    fri: [],
                    sat: [],
                    sun: []
                },
            },
            canAddNewSchedule: true
        },
        reducers: {
            setSchedule(state, action) {
                const payload = action.payload;

                state.schedules = payload
                state.canAddNewSchedule = payload.length < 2

                //console.log(state.schedules)
            },
            setScheduleBody(state, action) {
                const payload = action.payload;

                const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                const body = [];

                const task = {
                    mon: [],
                    tue: [],
                    wed: [],
                    thu: [],
                    fri: [],
                    sat: [],
                    sun: []
                }

                payload.map(element => {
                    return body.push(element.scheduleBody)
                })

                body.forEach(taskObject => {
                    dayKey.forEach(dayKey => {
                        taskObject[dayKey].forEach(scheduleTask => {
                            task[dayKey].push(scheduleTask)
                        })
                    })
                })

                state.scheduleBody = task
            },
            setActiveSchedule(state, action) {
                state.activeSchedule = action.payload;
            },
            changeDaySchedule(state, action) {
                console.log(state)
            }
        }
    }
)

export const { setSchedule, setScheduleBody, setActiveSchedule, changeDaySchedule } = scheduleSlice.actions

export default scheduleSlice.reducer