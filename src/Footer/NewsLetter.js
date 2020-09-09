import React, { useState } from 'react';

const NewsLetter = props => {
    const [key, setKey] = useState(false)

    const keyPress = event => {
        if (event.key === "Enter") {
            setTimeout(() => {
                setKey(true)
            }, 1500)
        }
    }

    return (
        <div className="footer-newsletter">
            <h4 className={key ? 'show' : 'hide'}>Email confirmed. You will recieve our weekly newsletter</h4>
            <a id="form-<%: Model.Form.FormGuid %>"></a>
            <form onKeyPress={keyPress} action="#form-<%: Model.Form.FormGuid %>">
                <input type="email" placeholder="Your Email Address" />
            </form>

            <p>Enter your email and receive the latest news, updates and special offers from us.</p>
        </div>
    )
}


export default NewsLetter;