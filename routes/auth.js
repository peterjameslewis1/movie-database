const router = require('express').Router();
const User = require('../model/model')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation');





// Route Middleware
router.post('/register', async (req, res) => {
    // Validation
    const { error } = await registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check if email already exists
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email already exists')

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save();
        return res.json(savedUser)
    } catch (err) {
        return res.status(400).send(err);
    }
})


// LOGIN
router.post('/login', async (req, res) => {
    // Validation
    const { error } = await loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check if email already exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is wrong')

    const correctPass = await bcrypt.compare(req.body.password, user.password)
    if (!correctPass) return res.status(400).send('Invalid password')

    // Creating JWT
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // Adding token to DB
    const addToken = await User.updateOne({ token: token })

    // Fetching updated user data
    const updatedUser = await User.findOne({ email: req.body.email })
    return res.header('auth-token', token).status(200).json(updatedUser)

})


// LOGOUT
router.post('/logout', async (req, res) => {
    // Check if token already exists
    const user = await User.findOne({ token: req.body.token })
    if (!user) return res.status(400).send('An error occured')

    // Removing JWT from DB
    const removeToken = await User.updateOne({ token: '' });
    return res.status(200)
})

module.exports = router;