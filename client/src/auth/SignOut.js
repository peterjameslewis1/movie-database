import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


const SignOut = ({ userData }) => {
    // Sign out user
    const signOutUser = async e => {
        e.preventDefault();

        const signOut = await axios({
            method: 'POST',
            url: '/api/logout',
            data: JSON.stringify(userData.data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => {
            console.log(err)
        })
    }


    return <li className="nav-link"><Link to="/" onClick={signOutUser}>Log out</Link></li>

}

export default SignOut;