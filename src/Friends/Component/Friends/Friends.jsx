import FriendItem from "./FriendItem";

import s from './FriendStyle.module.css'

const Friends = (props) => {
    return (
        <div className={s.friend_wrapper}>
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
        </div>
    )
}

export default Friends;