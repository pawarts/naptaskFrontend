import { setSelectedUser, deleteSelectedUser } from "../../../../_store/slices/foundUserSlice";

import { useDispatch, useSelector } from "react-redux";

import s from './CollaboratorsStyle/FoundUser.module.css'

const FoundUser = (props) => {
    const { login } = props.user_info;

    const dispatch = useDispatch();
    const foundUserSlice = useSelector(state => state.foundUser.selectedUser);
    const some = useSelector(state => state.foundUser.some);


    const userSelected = foundUserSlice.filter(element => element.login === login).length > 0;

    const selectUser = () => {
        dispatch(setSelectedUser(props.user_info))
    };

    const deleteUser = () => {
        dispatch(deleteSelectedUser(login))
    }

    return (
        <div onClick={() => userSelected ? deleteUser() : selectUser()}
            style={{ background: userSelected ? '#e0e2fd' : 'transparent' }} //{ background: userSelected ? '#e0e2fd' : 'transparent' }
            className={s.wrapper}>
            <img src={props.user_icon} alt="" />
            <div className="">
                <h3 className="button_text">{login}</h3>
                <p className="page_subtitle">I like play computer games</p>
            </div>
        </div>
    )
}

export default FoundUser