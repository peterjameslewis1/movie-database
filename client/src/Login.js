import React, { useState, useEffect } from 'react';
import axios from 'axios'




const Login = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })


    // To capture the target.values of each input
    const onChangeHandler = e => {
        const value = e.target.value
        setFormData({
            ...formData,
            [e.target.name]: value,
        })
        console.log(formData)
    }


    // send a POST request
    const registerUser = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/react-movie-database/login',
            body: formData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    console.log(data)
    return (
        <div className="auth">
            <div className="login">
                <h2>Login</h2>
                <form>
                    <input type="text" name="email" value={formData.firstName} onChange={onChangeHandler} placeholder="Email" required />
                    <input type="text" name="password" value={formData.lastName} onChange={onChangeHandler} placeholder="password" required />
                    <input type="submit" />
                </form>
            </div>
            <div className="registration">
                <h2>Register</h2>
                <form method="post" >
                    <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" required />
                    <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" required />
                    <input type="text" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email" />
                    <input type="text" name="password" value={formData.password} onChange={onChangeHandler} placeholder="password" />
                    <input type="submit" style={{ background: 'White' }} onChange={onChangeHandler} onClick={registerUser} />
                </form>
            </div>
        </div>
    )
}

export default Login;