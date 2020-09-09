import React from 'react';
import Nav from '../Header/Nav';
import NewsLetter from '../Footer/NewsLetter';
import Legal from './Legal';

const Footer = (props) => {

    return (
        <div className="footer">
            <h2>Information</h2>
            <Nav />
            <NewsLetter />
            <Legal />
        </div>
    )
}

export default Footer;