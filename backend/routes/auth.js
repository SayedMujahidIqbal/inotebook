const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/createUser - No login required"
router.post('/createUser', [
    body('name', 'Name should be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Enter a valied email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // If errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Check whether this email exists already
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ error: 'Email already registered' })
        }
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.status(200).json({ Message: `User created successfully` });
    
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured");
    }

})

module.exports = router
