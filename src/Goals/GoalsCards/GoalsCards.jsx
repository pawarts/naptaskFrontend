

import GoalCard from "./GoalCard"
import s from './GoalsCards.module.css'




const GoalCards = (props) => {
    return (
        <div className={s.goal_wrapper}>
            <GoalCard />
        </div>
    )
}

export default GoalCards