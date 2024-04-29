import s from './CollaboratorsStyle/FindUser.module.css'
import Input from '../../../../BaseComponents/Inputs/Input'
import FoundUser from './FoundUser'
import { setAddCollaborator } from '../../../../_store/slices/viewSlice'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FindCollaborator = (props) => {

    const [users, setUser] = useState([]);
    const [searchUserInput, setUserSearchInput] = useState('');

    const searchUser = (event) => {
        const value = event.currentTarget.value

        setUserSearchInput(value)

        if (value !== '') {
            const dataSet = {
                user_name: value
            }

            const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
            fetch(`${domain}/findUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Вказати тип відправленого контенту
                },
                body: JSON.stringify(dataSet)
            })
                .then(response => response.json())
                .then(result => {
                    setUser(result)
                })
                .catch(error => console.error('Error fetching data:', error));
        } else if (value === '') {
            setUser([])
        }
    }

    const found_user = users.map((element, index) => (
        <div key={index}>
            <FoundUser user_info={element} />
        </div>
    ))


    return (
        <div className={s.wrapper}>
            <h2 className={`${s.screen_title}`}>Add new member</h2>
            <div>
                <Input input_name='User name' changeInput={searchUser}
                    value={searchUserInput} />
                <div className={s.user_list_wrapper}>
                    {found_user}
                </div>
            </div>
            <div className={s.button_wrapper}>
                <button>Cancel</button>
                <button className={s.submit_button} onClick={props.next_page}>Check new members</button>
            </div>
        </div>
    )
}

export default FindCollaborator