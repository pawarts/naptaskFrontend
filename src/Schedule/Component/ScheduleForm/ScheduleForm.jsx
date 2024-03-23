import { useState } from 'react'
import Input from '../../../BaseComponents/Inputs/Input'
import SubmitButton from '../../../BaseComponents/Buttons/SubmitButton'
import DayGroup from './DayGroup'

import arrowBack from '../ScheduleInfo/Icon/ArrowBack.svg'

import s from './ScheduleForm.module.css'
import selectStyle from './SelectStyle.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSchedule, setFormSchedule } from '../../../_store/slices/scheduleSlice'

const ScheduleForm = (props) => {

    const [scheduleName, setScheduleName] = useState('');
    const [scheduleNameInputWarning, setScheduleNameInputWarning] = useState('');

    const dispatch = useDispatch()
    const propsSchedule = useSelector(state => state.schedules.activeSchedule)

    const [schedule, setSchedule] = useState(props.createPage ? {
        title: scheduleName,
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
        user_id: localStorage.getItem('user_id')
    } : propsSchedule)

    const changeInput = (event, type) => {

        const value = event.target.value;

        const copySchedule = JSON.parse(JSON.stringify(schedule))

        switch (type) {
            case 'Schedule name':
                setScheduleName(value)
                copySchedule.title = value
                setSchedule(copySchedule)
                dispatch(setActiveSchedule(copySchedule))
                break;
            case 'choose_week':
                copySchedule.even = Number(value)
                setSchedule(copySchedule)
                dispatch(setActiveSchedule(copySchedule))
                break;
            default:
                console.log('Type is undefined')
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
            body: JSON.stringify(propsSchedule)
        })
            .then(response => response.json())
            .then(() => {
                props.openCreateSchedule()
            })
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
            body: JSON.stringify(propsSchedule)
        })
            .then(response => response.json())
            .then(() => {

                dispatch(setActiveSchedule(schedule))
                props.openEditWindow()
            })
            .catch(error => console.log(error))
    }
    const deleteTask = (day, value) => {
        setSchedule(value);
        schedule.scheduleBody = value.scheduleBody
        setSchedule({ ...schedule, schedule })
    }
    const submitForm = () => {

        if (schedule.schedule) {
            delete schedule.schedule
        }

        console.log('schedule')
        if (props.editSchedule) {
            submitEditSchedule()
        } else {
            console.log(propsSchedule)
            submitCreateSchedule()
        }

        dispatch(setFormSchedule(false))
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
                <div className={selectStyle.select_wrapper}>
                    <h3 className='input_title'>Choose week</h3>
                    <div className={selectStyle.select_input}>
                        <label htmlFor="week1_button">Week 1</label>
                        <div className={selectStyle.radio_input_wrapper}>
                            <input className={selectStyle.radio_input} type="radio" value="0"
                                id="week1_button" name="choose_week" onChange={event => {
                                    changeInput(event, "choose_week")
                                }} />
                            <p className={selectStyle.radio_input_background}></p>
                        </div>
                    </div>
                    <div className={selectStyle.select_input}>
                        <label className='' htmlFor="week2_button">Week 2</label>
                        <div className={selectStyle.radio_input_wrapper}>
                            <input className={selectStyle.radio_input} type="radio"
                                value="1" id="week2_button" name="choose_week" onChange={event => {
                                    changeInput(event, "choose_week")
                                }} />
                            <p className={selectStyle.radio_input_background}></p>
                        </div>

                    </div>
                </div>
                <div className={s.wrapper_button}>
                    <SubmitButton button_text="Submit" click={submitForm} />
                </div>

            </div>
        </div>
    )
}

export default ScheduleForm