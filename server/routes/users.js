const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.send('Login'));

// Register Page
router.get('/register',  (req, res) => res.send('Register'));

// Register User
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({
        username: username,
        password: password,
        email: email
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
