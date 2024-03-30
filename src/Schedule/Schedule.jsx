import { Link } from 'react-router-dom'

import Navigation from '../BaseComponents/Navigation/Navigation'
import ScheduleLink from './Component/ScheduleLink/ScheduleLink'
import s from './Schedule.module.css'

import addIcon from './Icons/add.svg'
import ScheduleForm from './Component/ScheduleForm/ScheduleForm'

import { useState, useEffect, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSchedule, setScheduleBody } from '../_store/slices/scheduleSlice'

const Schedule = (props) => {

    const [createSchedule, setCreateSchedule] = useState(false)
    const [rerender, setRerender] = useState(false)

    const schedules = useSelector(state => state.schedules.schedules)
    const canAddNewSchedule = useSelector(state => state.schedules.canAddNewSchedule)
    const scheduleTask = useSelector(state => state.schedules.scheduleBody)
    const dispatch = useDispatch()

    useEffect(() => {
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        fetch(`${domain}/schedule?id=${localStorage.getItem('user_id')}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                dispatch(setSchedule(result.schedules))
                dispatch(setScheduleBody(result.schedules))
            })
            .catch(error => console.error(error))
    }, [rerender])

    const scheduleLink = schedules.map((element, index) => (
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
                    style={{ display: scheduleLink.length < 2 ? 'flex' : 'none' }}>
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