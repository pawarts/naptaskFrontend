import s from './CreateTaskStyle.module.css'

import FormTask from '../../../BaseComponents/Form/FormTask'

import arrowBack from './CreateTaskIcon/ArrowBack.svg'

import { Link } from 'react-router-dom'

const CreateTask = (props) => {
    return (
        <div className={s.wrapper}>
            <Link className={s.back_link} to="/task">
                <img src={arrowBack} alt="" />
            </Link>

            <FormTask title="Create Task" button_text="Create task"
                type="create" hide={true} />

            <div></div>
        </div>
    )
}
export default CreateTask