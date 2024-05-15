import s from './ContextMenu.module.css'
import ContextMenuButton from './ContextMenuButtons'

import editButton from './ContextIcon/Edit.svg'
import deleteIcon from './ContextIcon/Delete.svg'
import { setFormSchedule } from '../../_store/slices/scheduleSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setContextMenu } from '../../_store/slices/contextSlice'

const ContextMenu = (props) => {



    const dispatch = useDispatch();

    const activeSchedule = useSelector(state => state.schedules.activeSchedule)

    const hide = useSelector(state => state.context.viewContext);
    const viewSchedule = useSelector(state => state.schedules.scheduleFormView)
    const id = activeSchedule._id;

    const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
    const url = `${domain}/schedule/delete/${id}`

    const deleteTask = () => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Вказати тип відправленого контенту
            },
            body: JSON.stringify({ user_id: window.localStorage.getItem('user_id') })
        })
            .then(response => response.text(''))
            .then(() => {
                window.location.pathname = '/schedule'
            })
            .catch(error => console.log(error))
    }

    const openEditMenu = () => {

        dispatch(setContextMenu(false))
        dispatch(setFormSchedule(!viewSchedule))
    };

    return (
        <div className={`context_wrapper ${s.context_wrapper}`}
            style={{
                transform: hide ? 'scale(1)' : 'scale(0)'
            }}>
            <ContextMenuButton icon_link={editButton}
                context_text='Edit' action={openEditMenu} />
            <ContextMenuButton icon_link={deleteIcon}
                context_text='Delete' action={deleteTask} />
        </div>
    )
}

export default ContextMenu