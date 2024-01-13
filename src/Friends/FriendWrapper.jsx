import Navigation from '../BaseComponents/Navigation/Navigation'
import Input from './Component/Input/Input'
import Groups from './Component/Group/Groups'
import Friends from './Component/Friends/Friends'

import s from './Friend.module.css'

const FriendWrapper = (props) => {
    return (
        <div className={`wrapper ${s.wrapper}`}>
            <Input />
            <Groups />
            <Friends />
            <Navigation />
        </div>
    )
}

export default FriendWrapper