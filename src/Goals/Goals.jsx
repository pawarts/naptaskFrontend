import Navigation from "../BaseComponents/Navigation/Navigation"
import GoalsHeader from "./GoalsHeader/GoalsHeader"

import s from "./Goals.module.css"
import GoalCards from "./GoalsCards/GoalsCards"


const Goal = (props) => {
    return (
        <div className={s.wrapper}>
            <GoalsHeader />
            <GoalCards />
            <Navigation />
        </div>
    )
}

export default Goal