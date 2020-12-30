import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from "react-router-dom";





const Login = (props) => {
    const [loginText, setLoginText] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(0)
    const [status, setStatus] = useState("")
    const userActive = props.userData.status === 200;

    const onChangeHandler = e => {
        const value = e.target.value;
        const name = e.target.name;
        setLoginText({
            ...loginText,
            [name]: value,
        })
    }

    // Login user
    const loginUser = async e => {
        e.preventDefault();

        const login = await axios({
            method: 'POST',
            url: '/api/login',
            data: JSON.stringify(loginText),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                setStatus('success')
                props.setUserData(res)
                props.setAuthenticated(true)
            }
        }).catch(err => {
            setError(err.response)
        })
        setLoginText({
            email: '',
            password: ''
        })
    }

    // Login message
    const loginPromt = () => {
        if (status === 'success') {
            setTimeout(() => {
                props.history.push('/')
            }, 500)
        } else if (error.status !== 200) {
            return <div>{error.data}</div>
        } return <div></div>
    }

    return (
        <div style={{ display: userActive ? 'none' : 'block' }}>
            <h2>{userActive ? 'Sign Out' : 'Sign in'}</h2>
            <form>
                <input type="email" name="email" value={loginText.email} onChange={onChangeHandler} placeholder="Email" required />
                <input type="password" name="password" value={loginText.password} onChange={onChangeHandler} placeholder="password" required />
                <input type="submit" placeholder="Create account" className="submit" onClick={loginUser} />
                {loginPromt()}
            </form>
        </div>
    )
};

export default withRouter(Login);