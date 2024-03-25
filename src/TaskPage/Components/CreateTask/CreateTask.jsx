import s from './CreateTaskStyle.module.css'

import FormTask from '../../../BaseComponents/Form/FormTask'

import arrowBack from './CreateTaskIcon/ArrowBack.svg'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCheckNewSchedule } from '../../../_store/slices/scheduleSlice'

const CreateTask = (props) => {
    const dispatch = useDispatch();
    const back = () => {
        dispatch(setCheckNewSchedule(false))
    }
    return (
        <div className={s.wrapper}>
            <Link className={s.back_link} to="/task" onClick={back}>
                <img src={arrowBack} alt="" />
            </Link>

            <FormTask title="Create Task" button_text="Create task"
                type="create" hide={true} />

            <div></div>
        </div>
    )
}
export default CreateTask