import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheck, FaTimes } from "react-icons/fa";

function Registration() {
    const NAME_REGEX = /^[a-zA-Z ,.'-]{3,35}$/;

    const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    // When component loads, focus will be on user Input
    const nameRef = useRef();
    // When there are errors, we will focus on them so it can be announced by a screen reader for accessibility
    const errRef = useRef();

    const navigate = useNavigate();

    const API_HOST_NAME = 'http://localhost:8081';

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

    const [error, setError] = useState('');


    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        const isValid = NAME_REGEX.test(name)
        console.log(isValid)
        setValidName(isValid);
    }, [name])

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setError('');
    }, [name, username, password, matchPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_HOST_NAME}/register`, { name, username, password })
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/login');
                } else {
                    alert('Error');
                }
            });

        setName('');
        setUsername('');
        setPassword('');
        setMatchPassword('');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name:
                            <span>{validName ? <FaCheck className={'color: green'}/> : <FaTimes className={'color: red'}/>}</span>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="on"
                            required
                            ref={nameRef}
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}

                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="on"
                            required
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="on"
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="match-password" className="form-label">Confirm Password:</label>
                        <input
                            type="match-password"
                            className="form-control"
                            id="password"
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            autoComplete="on"
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
                </form>
                <p className="text-center mt-3 mb-0">
                    Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Registration;
