import { useState } from "react"
import ScheduleForm from "../ScheduleForm/ScheduleForm"
import ScheduleHeader from "./ScheduleHeader"

import s from './ScheduleInfo.module.css'
import ScheduleInfoItem from "./ScheduleInfoItem"

const ScheduleInfo = (props) => {

    const schedule_body = JSON.parse(window.localStorage.getItem('scheduleBody'))

    const [schedule, setScheduleBody] = useState(schedule_body);
    const [createSchedule, setCreateSchedule] = useState(false);


    const openEditWindow = () => {
        setCreateSchedule(!createSchedule)
    }

    const scheduleBody = (newValue) => {
        setScheduleBody(newValue)
    }

    const id = schedule._id

    return (
        <div className={s.wrapper}>
            <ScheduleHeader openEditWindow={openEditWindow} />

            <h1 className="screen_title">{schedule.title}</h1>

            <div>
                <ScheduleInfoItem info_item={schedule.scheduleBody.mon} day_number={0} />
                <ScheduleInfoItem info_item={schedule.scheduleBody.tue} day_number={1} />
                <ScheduleInfoItem info_item={schedule.scheduleBody.wed} day_number={2} />
                <ScheduleInfoItem info_item={schedule.scheduleBody.thu} day_number={3} />
                <ScheduleInfoItem info_item={schedule.scheduleBody.fri} day_number={4} />
                <ScheduleInfoItem info_item={schedule.scheduleBody.sat} day_number={5} />
                <ScheduleInfoItem info_item={schedule.scheduleBody.sun} day_number={6} />
            </div>

            <div>
                <ScheduleForm createSchedule={createSchedule} editSchedule={true}
                    schedule_body={schedule_body} id={id} openEditWindow={openEditWindow}
                    scheduleBody={scheduleBody} />
            </div>
        </div>
    )
}

export default ScheduleInfo