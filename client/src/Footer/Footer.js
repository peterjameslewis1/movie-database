import React, { useState } from 'react';
import Nav from '../Header/Nav';
import NewsLetter from '../Footer/NewsLetter';
import Legal from './Legal';


const Footer = ({ userData }) => {
    const [footerMenu, setFooterMenu] = useState(false)


    const footerClickHandler = () => {
        setFooterMenu(!footerMenu)
    }

    return (
        <div className="footer">
            <h2>Information</h2>
            <Nav userData={userData} footerMenu={footerClickHandler} state={footerMenu} />
            <NewsLetter />
            <Legal />
        </div>
    )
}

export default Footer;