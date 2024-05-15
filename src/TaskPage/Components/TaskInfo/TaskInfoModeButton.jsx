import { useSelector, useDispatch } from 'react-redux';

import s from './TaskInfoStyle/TaskInfoModeButton.module.css';
import { setTaskInfoMode } from '../../../_store/slices/viewSlice';

const TaskInfoModeButton = (props) => {
    const dispatch = useDispatch();
    const active_mode = useSelector(state => state.view.taskInfoMode)
    const button_text = props.button_text;

    const activeStyle = {
        boxShadow: '0 2px 2.4px rgba(0, 0, 0, 0.25)',
        color: '#1C1B1F',
        fontWeight: 500,
    };
    const noneActiveStyle = {
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        color: '#4444',
        fontWeight: 400,
    }

    const changeActiveMode = (mode) => {
        dispatch(setTaskInfoMode(mode))
    }

    return (
        <button
            className={s.wrapper}
            style={button_text === active_mode ? activeStyle : noneActiveStyle}
            onClick={() => changeActiveMode(button_text)}
        >
            {button_text}
        </button>
    )
}

export default TaskInfoModeButton