import TaskDateButton from "./TaskButton"
import DateText from './Date'

import to_day_button from "./TaskIcons/to_day_button.svg"
import prev_day_button from "./TaskIcons/prev_day_button.svg"
import next_day_button from "./TaskIcons/next_day_button.svg"

import { useState } from "react"

import s from './TaskStyles/TaskHeader.module.css'

const TaskHeader = (props) => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleNextDay = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDay);
        props.change_date(nextDay)
    };

    const handlePrevDay = () => {
        const prevDay = new Date(selectedDate);
        prevDay.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prevDay);
        props.change_date(prevDay);
    };

    const handleToday = () => {
        const today = new Date();
        today.setDate(today.getDate());
        setSelectedDate(today);
        props.change_date(today);
    };


    return (
        <div className={s.date_button_wrapper}>
            <TaskDateButton icon={to_day_button} action={handleToday} />
            <TaskDateButton icon={prev_day_button}
                middle_button={true} action={handlePrevDay} />
            <TaskDateButton icon={next_day_button} action={handleNextDay} />
            <DateText number={selectedDate.getDate()} month={selectedDate.getMonth()}
                day={selectedDate.getDay()} />
        </div>
    )
}

export default TaskHeader