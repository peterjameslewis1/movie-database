import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Register = (props) => {
    const [error, setError] = useState('')
    const [status, setStatus] = useState("")
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    console.log()

    // To capture the target.values of each input
    const onChangeHandler = e => {
        const value = e.target.value
        setNewUser({
            ...newUser,
            [e.target.name]: value,
        })
    }

    // Register new user
    const registerUser = async e => {
        e.preventDefault();
        const login = await axios({
            method: 'POST',
            url: '/api/register',
            data: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                setStatus('created')
            }
            return;
        }).catch(err => {
            console.log(err.response)
            setError(err.response)
        })
        setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    }

    const signInPromt = () => {
        if (status === "created") {
            return <div>Account created!</div>
        } else if (error.status !== 200) {
            return <div>{error.data}</div>
        }
    }

    useEffect(() => {
        signInPromt()
    }, [status])

    return (
        <div className="auth">
            <h2>Sign up</h2>
            <form >
                <input type="text" name="firstName" value={newUser.firstName} onChange={onChangeHandler} placeholder="First Name" required />
                <input type="text" name="lastName" value={newUser.lastName} onChange={onChangeHandler} placeholder="Last Name" required />
                <input type="email" name="email" value={newUser.email} onChange={onChangeHandler} placeholder="Email" required />
                <input type="password" name="password" value={newUser.password} onChange={onChangeHandler} placeholder="password" required />
                <input type="submit" style={{ background: 'White' }} onClick={registerUser} className="submit" />
                {signInPromt()}
            </form>
        </div>
    )
}

export default Register;