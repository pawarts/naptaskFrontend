import { Link } from 'react-router-dom'

import Navigation from '../BaseComponents/Navigation/Navigation'
import ScheduleLink from './Component/ScheduleLink/ScheduleLink'
import s from './Schedule.module.css'

import addIcon from './Icons/add.svg'
import ScheduleForm from './Component/ScheduleForm/ScheduleForm'
import { useState, useEffect } from 'react'

const Schedule = (props) => {

    const [createSchedule, setCreateSchedule] = useState(false)
    const [schedule, setSchedule] = useState([])
    const [scheduleLength, setScheduleLength] = useState(schedule.length)
    const [rerender, setRerender] = useState(false)

    let scheduleBody = {
        title: "Week 1",
        scheduleBody: {
            mon: [
                {
                    title: "Math",
                    timeStart: "12:15",
                    timeEnd: "14:00",
                    color: "F0EAD2"
                },
                {
                    title: "Englsih",
                    timeStart: "14:15",
                    timeEnd: "15:55",
                    color: "FFD6FF"
                }
            ],
            tue: [
                {
                    title: "Math",
                    timeStart: "12:15",
                    timeEnd: "14:00",
                    color: "F0EAD2"
                },
                {
                    title: "Math",
                    timeStart: "14:15",
                    timeEnd: "15:55",
                    color: "FFD6FF"
                }
            ],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: []
        }
    }

    useEffect(() => {
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        fetch(`${domain}/schedule?id=${localStorage.getItem('user_id')}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                setSchedule(result.schedules)
            })
            .catch(error => console.error(error))
        setScheduleLength(schedule.length > 3)
    }, [rerender])

    const scheduleLink = schedule.map((element, index) => (
        <ScheduleLink key={index} schedule_title={element.title}
            schedule_body={element} />))



    const openCreateSchedule = () => {
        setCreateSchedule(!createSchedule)
    }
    return (
        <div className={`wrapper ${s.wrapper}`}>
            <h1 className={`${s.screen_title} screen_title`}>Week schedules</h1>
            <div className={s.schedule_link_wrapper}>
                {scheduleLink}
                <Link className={s.scheduleLink} to='' onClick={openCreateSchedule}
                    style={{ display: scheduleLength ? 'none' : 'flex' }}>
                    <p className='button_text'>Create schedule</p>
                    <img src={addIcon} alt="" />
                </Link>
            </div>



            <Navigation />

            <ScheduleForm createSchedule={createSchedule} createPage={true}
                openCreateSchedule={openCreateSchedule} />
        </div>
    )
}
/* 
<ScheduleForm createSchedule={createSchedule} createPage={true}
                openCreateSchedule={openCreateSchedule} />
                */
export default Schedule