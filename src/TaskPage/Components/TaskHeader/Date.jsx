import s from './TaskStyles/DateFont.module.css'

const DateText = (props) => {

    const number = props.number;
    const month = props.month;
    const day = props.day;

    const week_array = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];





    return (<p className={`task_font grey ${s.task_font}`}>
        {week_array[day]}, {month_array[month]} {number}
    </p>)
}

export default DateText