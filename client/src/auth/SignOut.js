import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


const SignOut = ({ userData, logoutHandler, closeMenu }) => {
    // Sign out user
    const signOutUser = async e => {

        await axios({
            method: 'POST',
            url: '/api/logout',
            data: JSON.stringify(userData.data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => {
            throw new err
        })
    }


    return <li className="nav-link"><Link to="/" onClick={(e) => {
        signOutUser();
        logoutHandler();
        closeMenu();
    }}>Log out</Link>
    </li>

}

export default SignOut;