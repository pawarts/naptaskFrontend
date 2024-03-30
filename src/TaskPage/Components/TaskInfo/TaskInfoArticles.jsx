import s from './TaskInfoStyle/TaskInfoArticle.module.css'


const TaskInfoArticles = (props) => {
    const type = props.type

    let taskData = ''

    let task_info = JSON.parse(window.localStorage.getItem("task_info"))
    switch (type) {
        case 'details':
            taskData = {
                title: 'Task details:',
                content: [task_info.taskDescription]
            }
            break;
        case 'subtask':
            taskData = {
                title: 'Subtask:',
                content: task_info.subtask
            }
            break
        default:
            console.log('Undefined')
    }

    const content = taskData.content.map((element, index) => {

        return (
            <p key={index} className={`${s.content_text} task_font`}> {element}</p>
        )
    })
    return (
        <div className={s.wrapper} style={{
            display: !props.editMenu ? 'block' : 'none'
        }}>
            <h4 className={`settings_title ${s.title}`}>{taskData.title}</h4>
            {content}
        </div>
    )
}

export default TaskInfoArticles