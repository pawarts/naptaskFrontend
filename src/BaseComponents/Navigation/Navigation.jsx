import NavigationLink from "./NavigationComponent/NavigationLink"

import home from './NavigationIcons/home.svg'
import home_active from './NavigationIcons/home-active.svg'

import goal from './NavigationIcons/goal.svg'
import goal_active from './NavigationIcons/goal-active.svg'

import friends from './NavigationIcons/friends.svg'
import friends_active from './NavigationIcons/friends-active.svg'

import person from './NavigationIcons/person.svg'
import person_active from './NavigationIcons/person-active.svg'

import s from './NavigationStyles/Navigation.module.css'


const Navigation = (props) => {


    return (
        <nav className={s.navigation_wrapper}>


            <NavigationLink icon={home} icon_active={home_active} link="/task" />

            <NavigationLink icon={goal} icon_active={goal_active} link="" /> {/*/goal*/}

            <NavigationLink icon={friends} icon_active={friends_active} link="" /> {/*/friends*/}

            <NavigationLink icon={person} icon_active={person_active} link="/person" />
        </nav >
    )
}

export default Navigation