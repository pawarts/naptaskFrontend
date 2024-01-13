import add_icon from './icons/add.svg'
import s from './styles/GoalsHeader.module.css'

const GoalsHeader = (props) => {
    return (
        <div className={s.header_wrapper}>
            <h1 className="screen_title">Goals</h1>
            <img src={add_icon} alt="" />
        </div>
    )
}

export default GoalsHeader