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
    // When there are errors, we will focus on them so it can be announced by a screen reader for accessibility
    const errRef = useRef();

    // const navigate = useNavigate();

    const API_HOST_NAME = process.env.REACT_APP_BACKEND_API_HOSTNAME || 'http://localhost:3500';

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
            console.log(`${API_HOST_NAME}/register`)
            const response = await axios.post(
                `${API_HOST_NAME}/register`,
                JSON.stringify({ username: username, password: password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            console.log(response.data)
            console.log(response.accessToken)
            console.log(JSON.stringify(response))

            setSuccess(true);

            setName('');
            setUsername('');
            setPassword('');
            setMatchPassword('');

        } catch (err) {
            // ex. we lost internet connection
            if (!err?.response){
                setErrorMsg("No server Response");
            }else if(err.response?.status === 409){
                setErrorMsg('Username Taken')
            }else {
                setErrorMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="bg-[url('https://talktravelapp.com/wp-content/uploads/Shiraz-in-Iran.jpg')] bg-cover bg-center w-full h-full flex justify-center items-center">
            {success ? (
                <section className="bg-bluesea p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <h1>Success!</h1>
                    <p className="flex flex-col text-center mt-3 mb-0">
                        <Link to="/login" className="text-decoration-none">Login</Link>
                    </p>
                </section>
            ) : (
                <section className="bg-bluesea p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <p
                        ref={errRef}
                        className={`${errorMsg ? 'text-red-700' : 'absolute -left-[9999px]'}`}
                        aria-live="assertive">
                        {errorMsg}
                    </p>
                    <h1 className="text-center mb-4">Create an Account</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label flex">
                                Name:
                                <span className={validName ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validName || !name ? 'hidden' : ''}><FaTimes className={'color: red'} /></span>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="off"
                                required
                                ref={nameRef}
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby='namenote'
                                onFocus={() => setNameFocus(true)} // When user focus on the field
                                onBlur={() => setNameFocus(false)} // When user leaves the input field
                            />
                            <p id="namenote" className={nameFocus && name && !validName ? 'bg-gray-500' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                3 to 35 characters.
                                Must begin with a letter.
                                Letters, spaces, hyphens, and apostrophes allowed.
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label flex">
                                Username:
                                <span className={validUsername ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validUsername || !username ? 'hidden' : ''}><FaTimes className={'color: red'} /></span>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                required
                                aria-invalid={validUsername ? 'false' : 'true'}
                                aria-describedby='usernamenote'
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                            />
                            <p id="usernamenote" className={usernameFocus && username && !validUsername ? 'bg-gray-500' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                4 to 24 characters.<br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label flex">
                                Password:
                                <span className={validPassword ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validPassword || !password ? 'hidden' : ''}><FaTimes className={'color: red'} /></span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
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
                            <p id="passwordnote" className={passwordFocus && password && !validPassword ? 'bg-gray-500' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                8 to 24 characters. <br />
                                Must include uppercase and lowercase letter,a number and one special character: <span aria-label='exclamation mark'>!</span><span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span><span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>

                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="form-label flex">
                                Confirm Password:
                                <span className={validPassword && validMatch ? '' : 'hidden'}><FaCheck className={'color: green'} /></span>
                                <span className={validMatch || !matchPassword ? 'hidden' : ''}><FaTimes className={'color: red'} /></span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
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
                            <p id="confirmnote" className={matchFocus && matchPassword && !validMatch ? 'bg-gray-500' : 'absolute -left-[9999px]'}>
                                <FaInfoCircle />
                                Must match the first password input field
                            </p>
                        </div>

                        <button disabled={!validName || !validUsername || !validPassword || !validMatch} type="submit" className="w-100 mt-3 border px-6 py-2">Register</button>
                    </form>
                    <p className="flex flex-col text-center mt-3 mb-0">
                        Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
                    </p>
                </section>
            )}</div >
    );
}

export default Registration;
