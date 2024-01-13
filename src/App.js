import Login from './LoginSignup/Login';
import Signup from './LoginSignup/Signup';

import TaskPage from './TaskPage/TaskPage';
import Goal from './Goals/Goals';
import Profile from './Profile/Profile';
import CreateTask from './TaskPage/Components/CreateTask/CreateTask';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/nullystyle/fonts.css';

import FriendWrapper from './Friends/FriendWrapper';
import TaskInfo from './TaskPage/Components/TaskInfo/TaskInfo';




function App() {

  if (window.location.pathname === '/') {
    window.location.pathname = '/login'
  }

  return (
    <div>
      <Router>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/task' element={<TaskPage />} />
          <Route path='/create_task' element={<CreateTask />} />
          <Route path='/task_info' element={<TaskInfo />} />

          <Route path='/goal' element={<Goal />} />
          <Route path='/friends' element={<FriendWrapper />} />
          <Route path='/person' element={<Profile />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
