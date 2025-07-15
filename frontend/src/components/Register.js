import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../api/api.js';
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const NAME_REGEX = /^[a-zA-Z '-]{3,35}$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Registration() {


    // When component loads, focus will be on user Input
    const nameRef = useRef();
    const usernameRef = useRef();
    // When there are errors, we will focus on them so it can be announced by a screen reader for accessibility
    const errRef = useRef();

    // const navigate = useNavigate();

    const API_HOST_NAME = process.env.REACT_APP_BACKEND_API_HOSTNAME;

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // on page load, we set focus on the name field
    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        const isValid = NAME_REGEX.test(name)
        setValidName(isValid);
    }, [name])

    useEffect(() => {
        const isValid = USERNAME_REGEX.test(username)
        setValidUsername(isValid);
    }, [username])

    useEffect(() => {
        const isValid = PASSWORD_REGEX.test(password)
        setValidPassword(isValid)
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMsg('');
    }, [name, username, password, matchPassword])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // If button enabled with JS hack
        const v1 = NAME_REGEX.test(name);
        const v2 = USERNAME_REGEX.test(username);
        const v3 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            setErrorMsg("Invalid Entry you dummy, don't try again!");
            return;
        }

        try {
            const response = await axios.post(
                `${API_HOST_NAME}/register`,
                JSON.stringify({ name: name, username: username, password: password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            if (response?.status === 201) {
                setSuccess(true);

                setName('');
                setUsername('');
                setPassword('');
                setMatchPassword('');
            }

        } catch (err) {
            // ex. we lost internet connection
            if (!err?.response) {
                setErrorMsg("No server Response");
            } else if (err.response?.status === 409) {
                setErrorMsg('Username Taken')
                usernameRef.current.focus();
            } else if (err.response?.status === 400) {
                setErrorMsg('Invalid credentials')
            } else {
                setErrorMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="bg-[url('https://itto.org/iran/image-bin/nasir-ol-molk-mosque-2024.jpg')] md:bg-[url('https://talktravelapp.com/wp-content/uploads/Shiraz-in-Iran.jpg')] bg-cover bg-center w-full flex items-center justify-center p-4">
            {success ? (
                <section className="bg-bluesea max-w-sm w-full rounded-2xl p-8 bg-opacity-85 flex flex-col justify-evenly min-h-[300px]">
                    <h1 className='text-success bg-green-100 border border-success rounded p-2 text-center'>
                        Account created successfully!
                    </h1>
                    <Link to="/login" className="io-button w-100 border w-full py-2 text-center">Sign in</Link>
                </section>
            ) : (
                <section className="bg-bluesea max-w-sm w-full rounded-2xl p-8 bg-opacity-85">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
                    <p
                        ref={errRef}
                        className={`${errorMsg ? 'text-red-600 mb-4 text-center' : 'absolute -left-[9999px]'}`}
                        aria-live="assertive">
                        {errorMsg}
                    </p>
                    <form onSubmit={handleSubmit}>

                        {/* Name */}
                        <div className="mb-3">
                            <label htmlFor="name" className="flex items-center gap-1">
                                Name:
                                <span className={validName ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validName || !name ? 'hidden' : ''}><FaTimes /></span>
                            </label>
                            <input
                                className="mt-1 block w-full rounded-md px-3 py-2"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value.toLowerCase())}
                                autoComplete="off"
                                required
                                ref={nameRef}
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby='namenote'
                                onFocus={() => setNameFocus(true)} // When user focus on the field
                                onBlur={() => setNameFocus(false)} // When user leaves the input field
                            />
                            <p id="namenote" className={nameFocus && name && !validName ? 'mt-2 text-white bg-gray-500 p-2 rounded-md shadow-lg' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                3 to 35 characters.
                                Must begin with a letter.
                                Letters, spaces, hyphens, and apostrophes allowed.
                            </p>
                        </div>

                        {/* Username */}
                        <div className="mb-3">
                            <label htmlFor="username" className="flex gap-1">
                                Username:
                                <span className={validUsername ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validUsername || !username ? 'hidden' : ''}><FaTimes /></span>
                            </label>
                            <input
                                className="mt-1 block w-full rounded-md px-3 py-2"
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                                autoComplete="off"
                                required
                                ref={usernameRef}
                                aria-invalid={validUsername ? 'false' : 'true'}
                                aria-describedby='usernamenote'
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                            />
                            <p id="usernamenote" className={usernameFocus && username && !validUsername ? 'mt-2 text-white bg-gray-500 p-2 rounded-md shadow-lg' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                4 to 24 characters.<br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="flex gap-1">
                                Password:
                                <span className={validPassword ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validPassword || !password ? 'hidden' : ''}><FaTimes /></span>
                            </label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md px-3 py-2"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete='on'
                                aria-invalid={validPassword ? 'false' : 'true'}
                                aria-describedby='passwordnote'
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p id="passwordnote" className={passwordFocus && password && !validPassword ? 'mt-2 text-white bg-gray-500 p-2 rounded-md shadow-lg' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                8 to 24 characters. <br />
                                Must include uppercase and lowercase letter,a number and one special character: <span aria-label='exclamation mark'>!</span><span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span><span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>

                            </p>
                        </div>

                        {/* Match password */}
                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="flex gap-1">
                                Confirm Password:
                                <span className={validPassword && validMatch ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validMatch || !matchPassword ? 'hidden' : ''}><FaTimes /></span>
                            </label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md px-3 py-2"
                                id="confirm-password"
                                value={matchPassword}
                                onChange={(e) => setMatchPassword(e.target.value)}
                                required
                                autoComplete='on'
                                aria-invalid={validMatch ? 'false' : 'true'}
                                aria-describedby='confirmnote'
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && matchPassword && !validMatch ? 'mt-2 text-white bg-gray-500 p-2 rounded-md shadow-lg' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                Must match the first password input field
                            </p>
                        </div>

                        <button disabled={!validName || !validUsername || !validPassword || !validMatch} type="submit" className="w-100 mt-3 border w-full py-2 io-button">Register</button>
                    </form>
                    <p className="mt-6 text-center">
                        Already have an account? {' '} <Link to="/login" className="font-medium text-blue-900 hover:text-blue-700 underline">Login</Link>
                    </p>
                </section>
            )}</div >
    );
}

export default Registration;
