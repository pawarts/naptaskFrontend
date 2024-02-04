import LoadedPage from "./LoadedPage"
import Loading from "./Components/Loading/Loading"

import { useState } from "react"


const TaskPage = (props) => {
    const [loaded, setLoaded] = useState(false);

    const loading = (status) => {
        setLoaded(status)
    }

    console.log(loaded)

    return (
        <div>
            <LoadedPage loaded={loading} />
            <Loading loaded={loaded} />
        </div>
    )
}

export default TaskPage