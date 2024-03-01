import { useState } from 'react'
import s from './ScheduleInfo.module.css'
import ScheduleTask from './ScheduleTask'

const ScheduleInfoItem = (props) => {

    const days = ['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    props.info_item.sort((a, b) => {
        return a.timeStart > b.timeStart
    })



    const deleteTaskLocal = (index) => {

        const scheduleBody = JSON.parse(window.localStorage.getItem("scheduleBody"));
        scheduleBody.scheduleBody[dayKey[props.day_number]].splice(index, 1)

        props.deleteTask(props.day_number, scheduleBody)

        window.localStorage.setItem("scheduleBody", JSON.stringify(scheduleBody))
    }

    const task_array = props.info_item.map((element, index) => (
        <ScheduleTask key={index} element={element} index={index}
            button_wrapper_view={props.button_wrapper_view} deleteTaskLocal={deleteTaskLocal} />
    ))
    return (
        <div className={s.schedule_item}>
            <h3 className={`${s.day_title} button_text`}>{days[props.day_number]}</h3>
            {task_array}
        </div>
    )
}

export default ScheduleInfoItem