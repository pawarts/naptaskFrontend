import ScheduleInfoItem from '../ScheduleInfo/ScheduleInfoItem'
import Input from '../../../BaseComponents/Inputs/Input'
import InputTime from '../../../BaseComponents/Inputs/InputTime'
import ChooseColor from '../../../BaseComponents/Inputs/ChooseColor'

import addIcon from '../../Icons/add.svg'

import s from './ScheduleForm.module.css'
import { useState } from 'react'

const DayGroup = (props) => {

    const [daySchedule, setDaySchedule] = useState([]);

    const [titleValue, setTitleValue] = useState('');
    const [titleWarning, setTitleWarning] = useState(false);

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [timeWarning, setTimeWarning] = useState(false)

    const [colorValue, setColorValue] = useState('')
    const [colorWarning, setColorWarning] = useState(false)

    const [addVisibility, setAddVisibility] = useState(false)


    const changeInput = (event, type) => {
        const value = event.target.value;

        switch (type) {
            case 'Title':
                setTitleValue(value)
                break
            case 'Start time':
                setTimeStart(value)
                break
            case 'End time':
                setTimeEnd(value);
                break
            case 'Color':
                setColorValue(value)
                break
            default:
                console.error('It is not a input')
        }
    }

    const formValidation = () => {

        if (titleValue === '' && titleValue.length < 26) {
            setTitleWarning(true)
        } else {
            setTimeWarning(false)
        }

        if (timeStart > timeEnd || (timeStart === '' && timeEnd === '')) {
            setTimeWarning(true)
        } else {
            setTimeWarning(false)
        }

        if (colorValue === '') {
            setColorWarning(true)
        } else {
            setColorWarning(false)
        }


        if (titleValue !== '' && (timeStart < timeEnd && timeStart !== '' && timeEnd !== '') && colorValue !== '') {
            props.change_day_schedule(props.day_number, {
                'title': titleValue,
                'timeStart': timeStart,
                'timeEnd': timeEnd,
                'color': colorValue
            })
        }
    }


    const openAddTask = () => {
        setAddVisibility(!addVisibility)
    }
    return (
        <div className={s.day_group_wrapper}>
            <ScheduleInfoItem info_item={props.schedule_body} day_number={props.day_number} button_wrapper_view={true}
                deleteTask={props.deleteTask} />
            <button className={s.add_button} onClick={openAddTask}>
                <p>Add task</p>
                <img src={addIcon} alt="" />
            </button>
            <div className={s.from_wrapper} style={{
                display: addVisibility ? 'block' : 'none'
            }}>
                <Input input_name="Title" value={titleValue} changeInput={changeInput} warning_text='Task title empty' visibility={titleWarning} />

                <div className={s.time_form_input}>
                    <div className={s.time_inputs}>
                        <InputTime input_title='Start time' value={timeStart}
                            changeInput={changeInput} input_type='time' />
                        <InputTime input_title='End time' value={timeEnd}
                            changeInput={changeInput} input_type='time' />
                    </div>
                    <Input type='hidden' visibility={timeWarning} warning_text="Check time inputs, maybe you want break physic" />
                </div>

                <div className={s.color_group_choose}>
                    <ChooseColor input_name="Color" color_number={0} setColorValue={changeInput} />
                    <ChooseColor input_name="Color" color_number={1} setColorValue={changeInput} />
                    <ChooseColor input_name="Color" color_number={2} setColorValue={changeInput} />
                    <ChooseColor input_name="Color" color_number={3} setColorValue={changeInput} />
                    <ChooseColor input_name="Color" color_number={4} setColorValue={changeInput} />
                </div>
                <Input type="hidden" visibility={colorWarning} warning_text="Choose task color" />

                <div className={s.submit_button_wrapper}>
                    <button className={`${s.button}`} onClick={openAddTask}>Cancel</button>
                    <button className={`${s.button} ${s.submit_button} black`} onClick={formValidation}>Add task</button>
                </div>
            </div>
        </div>
    )
}

export default DayGroup