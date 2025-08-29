import ReelsFeed from './ReelsFeed.js';                     // tmp
import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout.js';
import RequireAuth from './components/RequireAuth.js'
import PersisLogin from './components/PersistLogin.js';

import Home from './components/Home.js';
import Register from './components/Register.js'
import Login from './components/Login.js';

import Learn from './components/Learn/Learn.js';
import Sections from './components/Learn/Main/Practice/Sections.js';
import Lesson from './components/Learn/Main/Practice/Lesson/Lesson.js'

import Reels from './components/Reels/Reels.js'
import Create from './components/Create/Create.js'
import Practice from './components/Practice/Practice.js';
import Profile from './components/Profile/Profile.js';
import Missing from './components/Missing.js';

function App() {

  // ----------Frontend Routing----------
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PersisLogin />}>

              {/* ||--------------------PUBLIC ROUTES--------------------|| */}
              {/*         Redirect '/' to 'practice'         */}
              <Route path="/" element={<Navigate to="learn" replace />} />
              {/* tmp */}
              <Route path='test' element={<ReelsFeed />} />

              <Route path="home" element={<Home />} />

              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />


              <Route path='learn'>
                <Route index element={<Learn />} />
                <Route path='sections' element={<Sections />} />

                <Route path="lesson/:id" element={<Lesson />} />
              </Route>

              <Route path='reels'>
                <Route index element={<Reels />} />
              </Route>

              <Route path='practice'>
                <Route index element={<Practice />} />
              </Route>

              {/* Protected Route */}
              <Route element={<RequireAuth />}>
                <Route path='create' element={<Create />} />
              </Route>

              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
