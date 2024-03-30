import s from './CreateEditTask.module.css'
import addIcon from './formIcons/add.svg'

import Input from '../Inputs/Input'
import InputTime from '../Inputs/InputTime'
import SubmitButton from '../Buttons/SubmitButton'
import ChooseColor from '../Inputs/ChooseColor'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { busyTimeChange } from '../../_store/slices/viewSlice'
import { setFreeTime, setTimeGap } from '../../_store/slices/freeTimeSlice'
import BusyTime from './BusyTime'
import { setTimeEnd, setTimeStart } from '../../_store/slices/taskFormSlice'

import { getWeek } from 'date-fns';
import { testFun } from '../../_store/slices/dateSlice'


const FormTask = (props) => {

    const [titleValue, setTitleValue] = useState('');
    const [titleWarning, setTitleWarning] = useState(false);

    const timeStart = useSelector(state => state.taskForm.timeStart);
    const timeEnd = useSelector(state => state.taskForm.timeEnd);
    const [timeWarning, setTimeWarning] = useState(false);

    const [dateValue, setDateValue] = useState('');
    const [dateWarning, setDateWarning] = useState(false);

    const [colorValue, setColorValue] = useState('');
    const [colorWarning, setColorWarning] = useState(false)

    const [taskDescription, setTaskDesciption] = useState('')

    const [subTaskView, setSubTaskView] = useState(false);
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskInput, setSubtaskInput] = useState('')

    const currentTime = new Date();
    let currentMonth = currentTime.getMonth() + 1;
    let currentDay = currentTime.getDate();
    const currentYear = currentTime.getFullYear();
    let nowHour = currentTime.getHours();
    let nowMinute = currentTime.getMinutes();

    const dispatch = useDispatch();

    const schedules = useSelector(state => state.schedules.scheduleBody);
    const tasks = useSelector(state => state.tasks.tasks);


    const day = useSelector(state => state.date.day);

    const dayKey = useSelector(state => state.date.dayShortForm);

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;
    }
    if (currentDay < 10) {
        currentDay = '0' + currentDay;
    }

    if (nowHour < 10) {
        nowHour = '0' + nowHour;
    }
    if (nowMinute < 10) {
        nowMinute = '0' + nowMinute;
    }

    const today_date = `${currentYear}-${currentMonth}-${currentDay}`;

    const changeInput = (event, type) => {
        const value = event.target.value;

        switch (type) {
            case 'Title':
                setTitleValue(value);
                break;
            case 'Start time':
                dispatch(setTimeStart(value));
                break;
            case 'End time':
                dispatch(setTimeEnd(value));
                break;
            case 'Date':
                setDateValue(value);
                break;
            case 'Color':
                setColorValue(value);
                break;
            case 'taskDescription':
                setTaskDesciption(value)
                break;
            case 'Subtask title':
                setSubtaskInput(value);
                break;
            default:
                console.log('Type undefined')
                break;
        }
    }

    const formValidator = (isCreate) => {
        if (titleValue === '' && isCreate) {
            setTitleWarning(true)
        } else {
            setTitleWarning(false)
        }

        if (timeStart > timeEnd || ((timeEnd === '' || timeStart === '') && isCreate)) {
            setTimeWarning(true)
        } else {
            setTimeWarning(false)
        }

        if ((dateValue < today_date && isCreate) || (dateValue === '' && isCreate)) {
            setDateWarning(true)
        } else {
            setDateWarning(false)
        }

        if (colorValue === '' && isCreate) {
            setColorWarning(true)
        } else {
            setColorWarning(false)
        }

        const formValid = (titleValue !== '' || !isCreate)
            && (timeStart < timeEnd && ((timeEnd !== '' && timeStart !== '') || !isCreate))
            && ((dateValue >= today_date || !isCreate) && (dateValue !== '' || !isCreate))
            && (colorValue !== '' || !isCreate);

        return formValid
    }

    const filterArray = (element, timeStart, timeEnd) => {
        //console.log(`${element.timeStart} - ${element.timeEnd}`)

        const requestStart = timeStart || '11:20'
        const requestEnd = timeEnd || '19:40'

        const timeTaskStart = element.timeStart || element.startTime
        const timeTaskEnd = element.timeEnd || element.endTime

        console.log(requestStart)

        return (requestStart > timeTaskStart || requestEnd > timeTaskStart) && (requestStart < timeTaskEnd || timeTaskEnd > requestEnd)
    }


    const freeTime = () => {
        let task_info = JSON.parse(window.localStorage.getItem("task_info"))

        const requestStart = timeStart || task_info.startTime
        const requestEnd = timeEnd || task_info.endTime
        const today = dateValue || task_info.date;

        const day = new Date(today).getDay()
        console.log(day)
        let sort = '[]'
        if (schedules[dayKey[day]]) {
            sort = schedules[dayKey[day]].filter(element => filterArray(element, requestStart, requestEnd))
        }
        const taskFilter = tasks.filter(element => {
            return element.date === today && filterArray(element, requestStart, requestEnd)
        })
        console.log(schedules[dayKey[day]])
        if ((sort.length === 0 || schedules[dayKey[day]].length === 0) && (taskFilter.length === 0 || tasks.length > 0)) {
            console.log('Free time')
            return true
        } else {
            console.log("i'm busy at that time please, check my schedule")

            const date = dateValue
            const day = new Date(date).getDay()

            const dateStart = new Date(`2024-03-11T${requestStart}`)
            const dateEnd = new Date(`2024-03-11T${requestEnd}`)

            const requestGap = (dateEnd - dateStart) / 60000;

            dispatch(setTimeGap(requestGap))

            const todayTask = tasks.filter(element => element.date === date);
            if (schedules != [] && schedules[dayKey[day]] !== undefined) {
                schedules[dayKey[day]].forEach(element => {
                    todayTask.push(element)
                });

                todayTask.sort((a, b) => {
                    const timeStartA = a.startTime || a.timeStart
                    const timeStartB = b.startTime || b.timeStart

                    if (timeStartA > timeStartB) {
                        return 1
                    } else if (timeStartA < timeStartB) {
                        return 0
                    } else {
                        return -1
                    }
                })

                //console.log(todayTask)

                const todayTaskMap = todayTask.map((element, index) => {
                    const prevTask = index > 0 ? todayTask[index - 1] : element;

                    if (index > 0 && index !== todayTask.length - 1) {
                        if (date === element.date || element.date === undefined) {
                            return {
                                timeStart: prevTask.timeEnd || prevTask.endTime,
                                timeEnd: element.timeStart || element.startTime
                            }
                        } else {
                            return null
                        }
                    } else if (index === 0) {
                        return {
                            timeStart: '07:00',
                            timeEnd: element.timeStart || element.startTime
                        }
                    } else if (index === todayTask.length - 1) {
                        return [
                            {
                                timeStart: prevTask.timeEnd || prevTask.endTime,
                                timeEnd: element.timeStart || element.startTime
                            },
                            {
                                timeStart: element.timeEnd || element.endTime,
                                timeEnd: '22:00'
                            }
                        ]
                    }

                    return null

                }).flat().filter(element => {
                    const timeStart = new Date(`2024-03-12T${element.timeStart}`);
                    const timeEnd = new Date(`2024-03-12T${element.timeEnd}`);

                    const timeGap = (timeEnd - timeStart) / 60000

                    return element !== null && timeGap >= requestGap
                })

                dispatch(setFreeTime(todayTaskMap))
            }
            dispatch(busyTimeChange(true))

            return false
        }
    }

    const createTask = () => {

        if (formValidator(true)) {
            const dataSet = {
                title: titleValue,
                startTime: timeStart,
                endTime: timeEnd,
                date: dateValue,
                color: colorValue,
                taskDescription: taskDescription,
                subtask: subtasks,
                user_id: localStorage.getItem('user_id')
            }

            const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
            const url = '/task/add'
            fetch(`${domain}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Вказати тип відправленого контенту
                },
                body: JSON.stringify(dataSet)
            })
                .then(response => response.json())
                .then(result => {
                    window.location.pathname = '/task'
                })
                .catch(error => console.log(error))
        }

    }

    const editTask = () => {
        if (formValidator(false)) {
            let task_info = JSON.parse(window.localStorage.getItem("task_info"))
            const dataSet = {
                title: titleValue ? titleValue : task_info.title,
                startTime: timeStart ? timeStart : task_info.startTime,
                endTime: timeEnd ? timeEnd : task_info.endTime,
                date: dateValue ? dateValue : task_info.date,
                taskDescription: taskDescription || task_info.taskDescription,
                color: colorValue ? colorValue : task_info.color,
                user_id: localStorage.getItem('user_id')
            }


            const id = props.id;
            const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
            const URL = `${domain}/task/edit/${id}`

            fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Вказати тип відправленого контенту
                },
                body: JSON.stringify(dataSet)
            })
                .then(response => response.json())
                .then(result => window.location.pathname = '/task')
                .catch(error => console.log(error))
        } else {
            console.log('Time is not valid')
        }
    }


    const submitFormFunction = (typeSubmit) => {

        //freeTime()

        if (freeTime()) {
            switch (typeSubmit) {
                case 'create':
                    return createTask()
                case 'edit':
                    return editTask()
                default:
                    console.error('Unkown type')
            }
        }
    }

    const subtasksElement = subtasks.map((element, index) => (
        <p key={index}>{element}</p>
    ))

    return (
        <div className={s.wrapper} action="" method='POST' style={{
            display: props.hide ? 'block' : 'none'
        }}>
            <h1 className="screen_title">{props.title}</h1>


            <div className={s.input_title_wrapper}>
                <Input input_name='Title' value={titleValue}
                    changeInput={changeInput} maxLength={50}
                    warning_text="This input can't be empty" visibility={titleWarning} />
            </div>

            <div className={s.time_inputs}>
                <div className={s.time_wrapper}>
                    <InputTime input_title='Start time' value={timeStart}
                        changeInput={changeInput} input_type='time' />

                    <InputTime input_title='End time' value={timeEnd}
                        changeInput={changeInput} input_type='time' min={timeStart} />
                </div>
                <Input type='hidden' visibility={timeWarning} warning_text="Check time inputs, maybe you want break physic" />
            </div>

            <div className={s.date_wrapper}>
                <InputTime input_title='Date'
                    changeInput={changeInput} value={dateValue} input_type='date' />
                <Input type='hidden' warning_text="We can't to change our past"
                    visibility={dateWarning} />
            </div>

            <div className={s.color_group_choose}>
                <ChooseColor input_name="Color" color_number={0} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={1} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={2} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={3} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={4} setColorValue={changeInput} />
            </div>
            <Input type="hidden" visibility={colorWarning} warning_text="Choose task color" />

            <div className={s.taskDescriptionWrapper}>
                <h3 className={s.input_title}>Task description</h3>
                <textarea className={s.taskDescription} name="taskDescription" id="" value={taskDescription}
                    onChange={event => changeInput(event, 'taskDescription')}
                    maxLength="209"></textarea>
            </div>

            <div className={s.taskDescriptionWrapper}>
                <h3 className={s.input_title}>Add subtask</h3>
                {subtasksElement}
                <button className={s.add_subtask_button} onClick={() => setSubTaskView(!subTaskView)}>
                    <p>Add task</p>
                    <img src={addIcon} alt="" />
                </button>

                <div className={s.form_task_wrapper} style={{
                    display: subTaskView ? 'flex' : 'none'
                }}>
                    <Input input_name="Subtask title" value={subtaskInput} changeInput={changeInput} warning_text='Task title empty' visibility={titleWarning} />

                    <div className={s.submit_button_wrapper}>
                        <button className={`${s.button}`} onClick={() => setSubTaskView(false)}>Cancel</button>
                        <button className={`${s.button} ${s.submit_button} black`} onClick={() => setSubtasks([...subtasks, subtaskInput])}>Add task</button>
                    </div>
                </div>
            </div>

            <SubmitButton button_text={props.button_text} click={(event) => {
                submitFormFunction(props.type)
            }} />

            <BusyTime />
        </div>
    )
}

export default FormTask