import { useSelector } from 'react-redux'


import s from './Style/Style.module.css'
import icon from './Icon/RelaxAndWait.svg'


const SomthingWentWrong = (props) => {

    const view = useSelector(state => state.view.warningWindow)

    return (
        <div className={s.wrapper} style={{display : view ? 'flex' : 'none'}}>
            <img src={icon} alt="" />
            <h2 className={`${s.screen_title}`}>Пробачте, щось пішло не так</h2>
            <button className={`${s.try_again_button} button_text`}
                onClick={() => window.location.reload()}>Спробуйте ще раз</button>
        </div>
    )       
}

export default SomthingWentWrong