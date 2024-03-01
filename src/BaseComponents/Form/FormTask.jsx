import s from './CreateEditTask.module.css'

import Input from '../Inputs/Input'
import InputTime from '../Inputs/InputTime'
import SubmitButton from '../Buttons/SubmitButton'
import ChooseColor from '../Inputs/ChooseColor'

import { useState } from 'react'


const FormTask = (props) => {

    const [titleValue, setTitleValue] = useState('');
    const [titleWarning, setTitleWarning] = useState(false);

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [timeWarning, setTimeWarning] = useState(false);

    const [dateValue, setDateValue] = useState('');
    const [dateWarning, setDateWarning] = useState(false);

    const [colorValue, setColorValue] = useState('');
    const [colorWarning, setColorWarning] = useState(false)

    const currentTime = new Date();
    let currentMonth = currentTime.getMonth() + 1;
    let currentDay = currentTime.getDate();
    const currentYear = currentTime.getFullYear();
    let nowHour = currentTime.getHours();
    let nowMinute = currentTime.getMinutes();

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
                setTimeStart(value);
                break;
            case 'End time':
                setTimeEnd(value);
                break;
            case 'Date':
                setDateValue(value);
                break;
            case 'Color':
                setColorValue(value);
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

    const createTask = () => {

        if (formValidator(true)) {
            const dataSet = {
                title: titleValue,
                startTime: timeStart,
                endTime: timeEnd,
                date: dateValue,
                color: colorValue,
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
        switch (typeSubmit) {
            case 'create':
                return createTask()
            case 'edit':
                return editTask()
            default:
                console.error('Unkown type')
        }
    }


    return (
        <div action="" method='POST' style={{
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

            <SubmitButton button_text={props.button_text} click={(event) => {
                submitFormFunction(props.type)
            }} />
        </div>
    )
}

export default FormTask