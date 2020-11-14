const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwt = () => {
    const token = req.header('auth-token');
    if (!token) return response.status(401).send('Access Denied')

    try {
        const validToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
    } catch (err) {
        return response.status(400).send('Invalid Token')
    }
}