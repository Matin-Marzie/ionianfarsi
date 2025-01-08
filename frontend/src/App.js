import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.js';
// import Login from './Login.js';
// import Register from './Register.js';
import Vocabulary from './Vocabulary/Vocabulary.js';
import Exercise from './Exercise/Exercise.js';
import Practice from './Exercise/Practice.js';
import Profile from './Profile/Profile.js';
import More from './More/More.js';
import Missing from './Missing.js';
import Home from './Home.js';
import LessonNavigate from './Vocabulary/LessonNavigator.js';

function App() {

  const BACKEND_API_HOSTNAME = 'https://ionio-back.onrender.com';
  // const BACKEND_API_HOSTNAME = 'http://localhost:8081';

  // ----------Frontend Routing----------
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Redirect '/' to 'home' */}
          <Route path="/" element={<Navigate to="home" replace />} />

          <Route path="home" element={<Home BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />} />

          {/* <Route path="login" element={<Login />} /> */}
          {/* <Route path="register" element={<Register />} /> */}

          {/* Routes wrapped in Layout */}
          <Route element={<Layout />}>

            <Route path='vocabulary'>
              <Route index element={<Vocabulary BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />} />
              <Route path='choose-lesson' element={<LessonNavigate BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />} />
            </Route>

            <Route path='exercise'>
              <Route index element={<Exercise BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />}/>
              <Route path='practice' element={<Practice BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME}/>}/>
            </Route>

            <Route path="profile" element={<Profile />} />
            <Route path="more" element={<More />} />
          </Route>

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Missing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
