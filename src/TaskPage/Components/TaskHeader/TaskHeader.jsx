import TaskDateButton from "./TaskButton"
import DateText from './Date'

import to_day_button from "./TaskIcons/to_day_button.svg"
import prev_day_button from "./TaskIcons/prev_day_button.svg"
import next_day_button from "./TaskIcons/next_day_button.svg"

import { useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { nextDay, prevDay, nowDay } from '../../../_store/slices/dateSlice'

import s from './TaskStyles/TaskHeader.module.css'

const TaskHeader = (props) => {

    const date = new Date(useSelector(state => state.date.date))
    const dispatch = useDispatch()

    const handleNextDay = () => {
        dispatch(nextDay())
    };

    const handlePrevDay = () => {
        dispatch(prevDay())
    };

    const handleToday = () => {
        dispatch(nowDay())
    };



    return (
        <div className={s.date_button_wrapper}>
            <TaskDateButton icon={to_day_button} action={handleToday} />
            <TaskDateButton icon={prev_day_button}
                middle_button={true} action={handlePrevDay} />
            <TaskDateButton icon={next_day_button} action={handleNextDay} />
            <DateText number={date.getDate()} month={date.getMonth()}
                day={date.getDay()} />
        </div>
    )
}

export default TaskHeader