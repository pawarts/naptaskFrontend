import { useState } from 'react'
import s from './TaskInfoStyle/Edit.module.css'

import Input from '../../../BaseComponents/Inputs/Input'
import InputTime from '../CreateTask/InputTime'
import SubmitButton from '../../../BaseComponents/Buttons/SubmitButton'
import ChooseColor from '../CreateTask/ChooseColor'

const EditTask = (props) => {

    const [titleValue, setTitle] = useState('')
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [dateValue, setDate] = useState('');
    const [colorValue, setColorValue] = useState('');

    console.log(colorValue)

    const changeInput = (event, type) => {
        const value = event.target.value;

        switch (type) {
            case 'Title':
                setTitle(value);
                break;
            case 'Start time':
                setTimeStart(value);
                break;
            case 'End time':
                setTimeEnd(value);
                break;
            case 'Date':
                setDate(value);
                break;
            case 'Color':
                setColorValue(value);
                break;
            default:
                console.error('Type is not unlocated');
                break
        }
    }


    const editTask = () => {
        let task_info = JSON.parse(window.localStorage.getItem("task_info"))

        if (timeStart === '') {
            setTimeStart(task_info.startTime)
        }
        if (timeEnd === '') {
            setTimeEnd(task_info.endTime)
        }
        console.log(colorValue)
        if (timeStart < timeEnd || (timeStart === '' || timeEnd === '')) {

            const dataSet = {
                title: titleValue ? titleValue : task_info.title,
                startTime: timeStart ? timeStart : task_info.startTime,
                endTime: timeEnd ? timeEnd : task_info.endTime,
                date: dateValue ? dateValue : task_info.date,
                color: colorValue ? `#${colorValue}` : task_info.color,
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


    return (
        <div className={s.edit_wrapper} style={{
            display: props.hide ? 'block' : 'none'
        }}>
            <h1 className="screen_title">Edit task</h1>

            <div className={s.input_title_wrapper}>
                <Input input_name='Title' value={titleValue}
                    changeInput={changeInput} maxLength={50} />
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
                <ChooseColor input_name="Color" color_number={0} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={1} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={2} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={3} setColorValue={changeInput} />
                <ChooseColor input_name="Color" color_number={4} setColorValue={changeInput} />
            </div>

            <SubmitButton button_text='Edit Task' click={editTask} />
        </div>
    )
}

export default EditTask