import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.js';
import Home from './components/Home.js';
import LessonNavigate from './components/Vocabulary/LessonNavigator.js';
import Register from './components/Register.js'
import Login from './components/Login.js';
import PersisLogin from './components/PersistLogin.js';

// tmp
import ReelsFeed from './ReelsFeed.js'
import RequireAuth from './components/RequireAuth.js'

import Vocabulary from './components/Vocabulary/Vocabulary.js';

import Practice from './components/Practice/Practice.js';
import Sections from './components/Practice/Sections.js';
import Lesson from './components/Practice/Lesson/Lesson.js';

import Exercise from './components/Exercise/Exercise.js';
import ExercisePractice from './components/Exercise/Practice.js';

import Profile from './components/Profile/Profile.js';
import More from './components/More/More.js';
import Missing from './components/Missing.js';

function App() {
  console.log('render')

  const BACKEND_API_HOSTNAME = process.env.REACT_APP_BACKEND_API_HOSTNAME;

  // ----------Frontend Routing----------
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

            {/* ||--------------------PUBLIC ROUTES--------------------|| */}
            {/*         Redirect '/' to 'practice'         */}
            <Route path="/" element={<Navigate to="practice" replace />} />

            <Route path="home" element={<Home />} />

            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path='test' element={<ReelsFeed />} />

            <Route path='practice'>
              <Route index element={<Practice />} />
              <Route path='sections' element={<Sections />} />
              {/* Protected Route */}
              <Route element={<PersisLogin />}>
                <Route element={<RequireAuth />}>
                  <Route path="lesson/:id" element={<Lesson />} />
                </Route>
              </Route>
            </Route>

            {/* -----Protected-Routes----- */}
            <Route element={<PersisLogin />}>
              <Route element={<RequireAuth />}>
                <Route path='vocabulary'>
                  <Route index element={<Vocabulary BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />} />
                  <Route path='choose-lesson' element={<LessonNavigate BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />} />
                </Route>

                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>

            <Route path='exercise'>
              <Route index element={<Exercise BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />} />

              {/* Protected Route */}
              <Route element={<PersisLogin />}>
                <Route element={<RequireAuth />}>
                  <Route path='practice' element={<ExercisePractice BACKEND_API_HOSTNAME={BACKEND_API_HOSTNAME} />} />
                </Route>
              </Route>
            </Route>

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
