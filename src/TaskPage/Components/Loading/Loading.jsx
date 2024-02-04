import s from '../ComponentStyle/Loading.module.css'
import logo from './LoadingIcons/NaptaskLogo.svg'

const Loading = (props) => {
    return (
        <div className={s.loading_wrapper} style={{
            display: props.loaded ? 'none' : 'flex'
        }}>
            <img src={logo} alt="" className={s.loading_icon} />
            <p className={s.loading_text}>NAPTASK</p>
        </div>
    )
}

export default Loading