import s from './ContextMenu.module.css'

import ContextMenuButton from './ContextMenuButtons'
import WorkInProgress from '../../WarningWorkInProgress/WorkInProgress'

import editButton from './ContextIcon/Edit.svg'
import deleteIcon from './ContextIcon/Delete.svg'
import { useState } from 'react'

const ContextMenu = (props) => {



    const hide = props.hide;
    const id = [props.id];

    const [openChoose, setOpenChoose] = useState(false);

    const deleteTask = () => {
        const url = `https://naptask-back.onrender.com/task/delete/${id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: window.localStorage.getItem('user_id') })
        })
            .then(response => response.text(''))
            .then(() => {
                window.location.pathname = '/task'
            })
            .catch(error => console.error(error))
    }

    const openChooseDeleteTask = () => { setOpenChoose(true) }
    const closeChooseDeleteTask = () => { setOpenChoose(false) }


    return (
        <div className={`context_wrapper ${s.context_wrapper}`}
            style={{
                transform: hide ? 'scale(1)' : 'scale(0)'
            }}>
            <div className={`${s.button_wrapper}`}>
                <ContextMenuButton icon_link={editButton}
                    context_text='Edit' action={props.openEditMenu} />
                <ContextMenuButton icon_link={deleteIcon}
                    context_text='Delete' action={openChooseDeleteTask}
                    delete_choose_button='delete_choose_button'
                    style={{
                        display: openChoose ? 'none' : 'flex'
                    }} />

                <div className={`${s.delete_choose_wrapper}`} style={{
                    display: openChoose ? 'flex' : 'none'
                }}>
                    <ContextMenuButton context_text='Cancel' action={closeChooseDeleteTask} />
                    <ContextMenuButton context_text='Delete' action={deleteTask} deleteButtonClass={s.delete_button} task_font={s.task_font} />
                </div>

            </div>
        </div>
    )
}

export default ContextMenu