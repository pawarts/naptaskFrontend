import FormTask from "../../../BaseComponents/Form/FormTask"

const EditTask = (props) => {
    return (
        <FormTask title="Edit task" button_text="Edit"
            type="edit" hide={props.hide} id={props.id} />
    )
}

export default EditTask