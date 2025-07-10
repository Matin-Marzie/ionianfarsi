import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider.js'
import axios from '../api/api.js'

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {

  const { setAuth } = useContext(AuthContext);

  // When component loads, focus will be on username Input
  const usernameRef = useRef();
  // When there are errors, we will focus on them so it can be announced by a screen reader for accessibility
  const errRef = useRef();

  const API_HOST_NAME = process.env.REACT_APP_BACKEND_API_HOSTNAME || 'http://localhost:8081';

  const navigator = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  // on page load, we set focus on the name field
  useEffect(() => {
    usernameRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMsg('');
  }, [username, password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USERNAME_REGEX.test(username);
    if (!v1) {
      setErrorMsg('Username Invalid!')
      return;
    }
    const v2 = PASSWORD_REGEX.test(password);
    if (!v2) {
      setErrorMsg('Password Invalid!')
      return;
    }

    try {
      const response = await axios.post(
        `${API_HOST_NAME}/auth`,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.accessToken;
      setAuth({ username, password, accessToken })
      setUsername('')
      setPassword('')
      setErrorMsg('')

      navigator('/practice')
    } catch (err) {
      if (!err?.response) {
        setErrorMsg('No server response')
      } else if (err.response?.status === 400) {
        setErrorMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrorMsg('Unauthorized')
      } else {
        setErrorMsg('Login Failed')
      }

      errRef.current.focus();
    }

  };


  return (
    <section className="bg-[url('https://talktravelapp.com/wp-content/uploads/Shiraz-in-Iran.jpg')] bg-cover bg-center w-full h-full flex justify-center items-center">
      <div className="bg-bluesea p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <p
          ref={errRef}
          className={`${errorMsg ? 'text-red-700' : 'absolute -left-[9999px]'}`}
          aria-live="assertive">
          {errorMsg}
        </p>

        <h1 className="text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit}>

          {/* username Input */}
          <div className="mb-3">
            <label htmlFor="username" className="flex">
              Username:
            </label>
            <input
              type="text"
              id="username"
              required
              autoComplete='on'
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="flex">Password</label>
            <input
              type="password"
              id="password"
              required
              autoComplete='on'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <button type="submit" className={`w-100 mt-3 border px-6 py-2`}>Login</button>
        </form>
        <p className='flex flex-col'>
          Don't have an accound?
          <Link to="/register" className="">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
