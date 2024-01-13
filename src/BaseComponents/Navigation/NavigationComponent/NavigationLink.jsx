
import { Link } from 'react-router-dom'

import active_background from '../NavigationIcons/active_background.svg'

import s from '../NavigationStyles/NavigationLink.module.css'


const NavigationLink = (props) => {

    const location = window.location.pathname;
    const link_location_checker = props.link === location;

    return (
        <Link to={props.link} className={`${s.link_item}`}>


            <img className={link_location_checker ? s.active_background : s.disactive_background}
                src={active_background}
                alt="" />


            <img className={`${s.link}`}
                src={link_location_checker ? props.icon_active : props.icon}
                alt="" />


        </Link>
    )

}

export default NavigationLink



