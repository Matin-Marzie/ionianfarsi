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
  const passwordRef = useRef();
  // When there are errors, we will focus on them so it can be announced by a screen reader for accessibility
  const errRef = useRef();

  const API_HOST_NAME = process.env.REACT_APP_BACKEND_API_HOSTNAME;

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
      setErrorMsg('Username Invalid.')
      return;
    }
    const v2 = PASSWORD_REGEX.test(password);
    if (!v2) {
      setErrorMsg('Password Invalid.')
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
      } else if (err.response?.status === 404) {
        setErrorMsg("Username doesn't exist")
        usernameRef.current.focus()
      } else if(err.response?.status === 401){
        setErrorMsg('Invalid Password.')
        passwordRef.current.focus()
      } else {
        setErrorMsg('Login Failed.')
      }

      errRef.current.focus();
    }

  };


  return (
    <section className="bg-[url('https://itto.org/iran/image-bin/nasir-ol-molk-mosque-2024.jpg')] md:bg-[url('https://talktravelapp.com/wp-content/uploads/Shiraz-in-Iran.jpg')] bg-cover bg-center w-full flex items-center justify-center p-4">
      <div className="bg-bluesea max-w-sm w-full rounded-2xl p-8 bg-opacity-85">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign in</h1>

        <p
          ref={errRef}
          className={`${errorMsg ? 'text-red-600 mb-4 text-center' : 'absolute -left-[9999px]'}`}
          aria-live="assertive">
          {errorMsg}
        </p>

        <form onSubmit={handleSubmit} className='space-y-5'>

          {/* username Input */}
          <div>
            <label htmlFor="username">
              Username:
            </label>
            <input
              className='mt-1 block w-full rounded-md px-3 py-2'
              type="text"
              id="username"
              required
              autoComplete='on'
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              className='mt-1 block w-full rounded-md px-3 py-2'
              type="password"
              id="password"
              required
              autoComplete='on'
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <button type="submit" disabled={!username || !password } className={`w-100 mt-3 border w-full py-2 io-button`}>Login</button>
        </form>
        <p className='mt-6 text-center'>
          Don't have an accound?{' '}
          <Link to="/register" className="font-medium text-blue-900 hover:text-blue-700 underline">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
