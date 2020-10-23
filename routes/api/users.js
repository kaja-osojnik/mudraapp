const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs');
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @route POST   api/users
// @desc         Register user
// @access       Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Pleas enter a password with 6 or more characters').isLength({min:6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body

    try{
        // See if the user exists
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({ errors: [ {msg: 'User already exists'}] });
        }

        user = new User({
            name,
            email,
            password
        })

        // Encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save()


        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {expiresIn: 36000},
            (err, token) => {
                if (err) throw err;
                res.json({token})
            }
        )

        // res.send("User registered for mudra app");
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
})


// @route GET   api/users
// @desc        get all users
// @access      Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


// @route DELETE    api/users
// @desc            Delete user
// @access          Private
router.delete('/', auth, async (req, res) => {
    try{
        await User.findOneAndRemove({_id: req.user.id})
        res.json({ msg: "User deleted"});

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
 })

module.exports = router;