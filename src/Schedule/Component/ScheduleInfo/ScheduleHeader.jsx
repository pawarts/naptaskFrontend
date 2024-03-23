import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import backIcon from './Icon/ArrowBack.svg'
import editIcon from './Icon/Edit.svg'
import contextMenu from './Icon/ContextMenu.svg'

import s from './ScheduleInfo.module.css'
import { setActiveSchedule } from '../../../_store/slices/scheduleSlice'
import ContextMenu from '../../../BaseComponents/ContextMenu/ContextMenu'
import { setContextMenu } from '../../../_store/slices/contextSlice'

const ScheduleHeader = (props) => {

    const dispatch = useDispatch();
    const hide = useSelector(state => state.context.viewContext)



    const openContextMenu = () => {
        dispatch(setContextMenu(!hide))
    }

    const returnToLastPage = () => {
        dispatch(setActiveSchedule({
            title: '',
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
        }))
    }

    return (
        <header className={s.schedule_header}>
            <Link to="/schedule" onClick={returnToLastPage}><img src={backIcon} alt="" /></Link>
            <button onClick={openContextMenu}>
                <img src={contextMenu} alt="" />
            </button>
            <ContextMenu />
        </header>
    )
}

export default ScheduleHeader