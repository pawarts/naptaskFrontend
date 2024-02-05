import s from './ContextMenu.module.css'
import ContextMenuButton from './ContextMenuButtons'

import editButton from './ContextIcon/Edit.svg'
import deleteIcon from './ContextIcon/Delete.svg'

const ContextMenu = (props) => {



    const hide = props.hide;
    const id = props.id;

    const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
    const url = `${domain}/task/delete/${id}`

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
                window.location.pathname = '/task'
            })
            .catch(error => console.log(error))
    }


    return (
        <div className={`context_wrapper ${s.context_wrapper}`}
            style={{
                transform: hide ? 'scale(1' : 'scale(0)'
            }}>
            <ContextMenuButton icon_link={editButton}
                context_text='Edit' action={props.openEditMenu} />
            <ContextMenuButton icon_link={deleteIcon}
                context_text='Delete' action={deleteTask} />
        </div>
    )
}

export default ContextMenu