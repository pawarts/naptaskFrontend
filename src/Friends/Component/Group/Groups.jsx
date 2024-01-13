import Group from './Group'

import s from './Groups.module.css'

const Groups = (props) => {

    return (
        <div className={s.group_wrapper}>
            <Group group_name="All" />
            <Group group_name="Family" />
            <Group group_name="Work" />
        </div>
    )
}

export default Groups