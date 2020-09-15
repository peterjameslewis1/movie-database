import React from 'react';


const Nav = (props) => {
    const navArray = ['About', 'Genre', 'Plans', 'Blog', 'Contact'];

    return (
        <ul>
            <li><a href="/react-movie-database/">Home</a></li>
            {
                navArray.map((link, index) => {
                    return (
                        <li key={index}><a href="#">{link}</a></li>
                    )
                })
            }
        </ul>
    )
}

export default Nav;