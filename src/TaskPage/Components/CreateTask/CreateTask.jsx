import s from './CreateTaskStyle.module.css'

import arrowBack from './CreateTaskIcon/ArrowBack.svg'
import Input from '../../../BaseComponents/Inputs/Input'
import InputTime from './InputTime'
import SubmitButton from '../../../BaseComponents/Buttons/SubmitButton'
import ChooseColor from './ChooseColor'
import WarningWindow from '../Warning/Warning'

import { Link } from 'react-router-dom'
import { useState } from 'react'

const CreateTask = (props) => {

    const [titleValue, setTitleValue] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [colorValue, setColorValue] = useState('');

    const [viewWarning, setViewWarning] = useState(false);

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
    const actual_time = `${nowHour}:${nowMinute}`;

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

    const createTask = (event) => {
        event.preventDefault();

        if ((timeStart < timeEnd && timeStart !== '' && timeEnd !== '')
            && (dateValue !== '' && true)
            && (titleValue.length > 0 && titleValue.length < 50)
            && (dateValue >= today_date)
            && (colorValue.length !== '')) {
            const dataSet = {
                title: titleValue,
                startTime: timeStart,
                endTime: timeEnd,
                date: dateValue,
                color: colorValue,
                user_id: localStorage.getItem('user_id')
            }

            const domain = process.env.DOMAIN_NAME || 'http://localhost:10000'
            fetch(`${domain}/task/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Вказати тип відправленого контенту
                },
                body: JSON.stringify(dataSet)
            })
                .then(response => response.json())
                .then(result => {
                    window.location.pathname = '/task'
                    //setViewWarning(false)
                })
                .catch(error => console.log(error))
        } else {
            console.log('Somthing wrong')
            console.log(actual_time)


            setViewWarning(true);
        }

    }

    const setWarningText = () => {
        if (timeStart < timeEnd || timeStart !== '' || timeEnd !== '') {
            return 'Check time inputs'
        } else if (!(titleValue.length > 0 && titleValue.length < 50)) {
            return titleValue.length > 50 ? 'You input more 50 symbols' : 'Input anything'
        } else if (dateValue === '') {
            return 'Check date input'
        } else if (colorValue.length === '') {
            return 'Choose task color'
        } else {
            return 'I do not know what is warning'
        }
    }

    if (viewWarning) {
        setInterval(() => {
            setViewWarning(false)
        }, 5000)
    }

    return (
        <div className={s.wrapper}>

            <WarningWindow view_warning={viewWarning} warning_text={setWarningText()} />

            <Link className={s.back_link} to="/task">
                <img src={arrowBack} alt="" />
            </Link>

            <div action="" method='POST'>
                <h1 className="screen_title">Create task</h1>

                <div className={s.input_title_wrapper}>
                    <Input input_name='Title' value={titleValue}
                        changeInput={changeInput} />
                </div>

                <div className={s.time_wrapper}>
                    <InputTime input_title='Start time' value={timeStart}
                        changeInput={changeInput} input_type='time' />

                    <InputTime input_title='End time' value={timeEnd}
                        changeInput={changeInput} input_type='time' min={timeStart} />
                </div>

                <div className={s.date_wrapper}>
                    <InputTime input_title='Date'
                        changeInput={changeInput} value={dateValue} input_type='date' />
                </div>

                <div className={s.color_group_choose}>
                    <ChooseColor color="#edede9" setColorValue={changeInput} />
                    <ChooseColor color="#d6ccc2" setColorValue={changeInput} />
                    <ChooseColor color="#f5ebe0" setColorValue={changeInput} />
                    <ChooseColor color="#e3d5ca" setColorValue={changeInput} />
                    <ChooseColor color="#d5bdaf" setColorValue={changeInput} />
                </div>

                <SubmitButton button_text='Create Task' click={createTask} />
            </div>

            <div></div>
        </div>
    )
}
export default CreateTask