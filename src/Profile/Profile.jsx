import { Link } from 'react-router-dom'
import Navigation from '../BaseComponents/Navigation/Navigation'

const Profile = (props) => {

    const exitFucntion = (event) => {
        event.preventDefault();

        window.localStorage.removeItem("user_id");
        window.location.pathname = '/login';
    }

    return (
        <div className='wrapper'>
            <Link to="/login" onClick={exitFucntion}>Exit</Link>
            <Navigation />
        </div>
    )
}

export default Profile