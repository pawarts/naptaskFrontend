import { useState } from 'react'
import Input from '../../../BaseComponents/Inputs/Input'
import SubmitButton from '../../../BaseComponents/Buttons/SubmitButton'
import DayGroup from './DayGroup'

import arrowBack from '../ScheduleInfo/Icon/ArrowBack.svg'

import s from './ScheduleForm.module.css'

const ScheduleForm = (props) => {

    const [scheduleName, setScheduleName] = useState('');
    const [scheduleNameInputWarning, setScheduleNameInputWarning] = useState('');

    const propsSchedule = JSON.parse(window.localStorage.getItem('scheduleBody'))

    const [schedule, setSchedule] = useState(props.createPage ? {
        title: scheduleName,
        scheduleBody: {
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: []
        },
        user_id: localStorage.getItem('user_id')
    } : propsSchedule)

    const changeInput = (event, type) => {

        const value = event.target.value;

        switch (type) {
            case 'Schedule name':
                setScheduleName(value)

                schedule.title = value

                setSchedule({ ...schedule, schedule })
                break;
            default:
                console.log('Type is undefined')
        }
    }

    const sendSchema = {
        title: scheduleName,
        scheduleBody: {
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: []
        }
    }

    const daysArray = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

    const changeDaySchedule = (day, newValue) => {
        const objectKey = daysArray[day];
        let dayArray = schedule.scheduleBody[objectKey];
        dayArray.push(newValue);
        setSchedule({ ...schedule, schedule })
    }

    const submitCreateSchedule = () => {
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        const url = '/schedules/add'
        fetch(`${domain}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Вказати тип відправленого контенту
            },
            body: JSON.stringify(schedule)
        })
            .then(response => response.json())
            .then(() => props.openCreateSchedule())
            .catch(error => console.log(error))
    }

    const submitEditSchedule = () => {
        const id = props.id
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000';
        const url = `/schedule/edit/${id}`;

        fetch(`${domain}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Вказати тип відправленого контенту
            },
            body: JSON.stringify(schedule)
        })
            .then(response => response.json())
            .then(() => {
                window.localStorage.setItem("scheduleBody", JSON.stringify(props.schedule_body))
                props.scheduleBody(schedule)
                props.openEditWindow()
            })
            .catch(error => console.log(error))
    }
    const deleteTask = (day, value) => {
        setSchedule(value);
        schedule.scheduleBody = value.scheduleBody
        setSchedule({ ...schedule, schedule })
    }
    const submitForm = (edit) => {

        if (schedule.schedule) {
            delete schedule.schedule
        }

        console.log('schedule')
        if (props.editSchedule || edit) {
            submitEditSchedule()
        } else {
            submitCreateSchedule()
        }
    }

    const schedule_body = schedule.scheduleBody || schedule;

    return (
        <div className={s.wrapper} style={{
            display: props.createSchedule ? 'block' : 'none'
        }}>
            <div className={s.header}
                style={{
                    display: props.editSchedule ? 'none' : 'block'
                }}>
                <img src={arrowBack} alt="" onClick={props.openCreateSchedule} />
            </div>
            <h1 className='screen_title'>Schedule name</h1>
            <div className={s.form_wrapper}>
                <Input input_name='Schedule name' value={scheduleName}
                    changeInput={changeInput} maxLength={20}
                    warning_text="Please check your login" visibility={scheduleNameInputWarning} />
                <div className={s.day_group}>
                    <DayGroup schedule_body={schedule_body.mon}
                        change_day_schedule={changeDaySchedule} day_number={0} deleteTask={deleteTask} />
                    <DayGroup schedule_body={schedule_body.tue}
                        change_day_schedule={changeDaySchedule} day_number={1} deleteTask={deleteTask} />
                    <DayGroup schedule_body={schedule_body.wed}
                        change_day_schedule={changeDaySchedule} day_number={2} deleteTask={deleteTask} />
                    <DayGroup schedule_body={schedule_body.thu}
                        change_day_schedule={changeDaySchedule} day_number={3} deleteTask={deleteTask} />
                    <DayGroup schedule_body={schedule_body.fri}
                        change_day_schedule={changeDaySchedule} day_number={4} deleteTask={deleteTask} />
                    <DayGroup schedule_body={schedule_body.sat}
                        change_day_schedule={changeDaySchedule} day_number={5} deleteTask={deleteTask} />
                    <DayGroup schedule_body={schedule_body.sun}
                        change_day_schedule={changeDaySchedule} day_number={6} deleteTask={deleteTask} />
                </div>
                <div className={s.wrapper_button}>
                    <SubmitButton button_text="Submit" click={submitForm} />
                </div>

            </div>
        </div>
    )
}

export default ScheduleForm