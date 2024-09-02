const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'Muji is a good boy';

// Route 1: Create a User using: POST "/api/auth/createUser - No login required"
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
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.status(200).json({ authToken });
    
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})

// Route 2: AUthenticate a user using : POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valied email').isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    let success = false;
    // If errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email })

        if(!user){

            return res.status(400).json({ success, error: 'Please try to login with correct credentials' }); 
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
        }

        const payload = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})

// Route 3: Get LoggedIn User details  : POST "/api/auth/getuser. Login Required"
router.post('/getuser', fetchUser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})

module.exports = router
