import s from './ComponentStyles/Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
        <Link to={'/' + props.link} className={s.footer_link}>{props.text}</Link>
    )
}

export default Footer