import s from '../ComponentStyle/TimeTable.module.css'


const TimeTable = (props) => {

    function getCoordiantion(event) {
        //console.log(event.target.getBoundingClientRect())
    }

    const time = props.time;

    let hourNow = time.getHours()

    const timeArray = [];

    for (let index = 0; index < 25; index++) {
        if (hourNow + index > 23) {
            hourNow = -index;
        }

        timeArray.push(
            <span key={index} className={s.time_text} onClick={event => getCoordiantion(event)}
            >
                {index > 12 ? index - 12 : index}&nbsp;<p key={index - 1}>
                    {index >= 12 ? 'pm' : 'am'}
                </p>
            </span>
        )
    }


    return (
        <div className={s.time_wrapper}>
            {timeArray}
        </div>
    )


}

export default TimeTable