const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Timer = require("../../models/Timer");
const {check, validationResult} = require("express-validator/check");

// @route GET   api/posts
// @desc        route
// @access      Public
router.post('/',[auth, [
    check("timer", "Timer value is required").not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try{
        const user = await User.findById(req.user.id).select("-password");

        const newTimer = new Timer({
            timer: req.body.timer,
            user: req.user.id,
            name: user.name,
            countdown: req.body.countdown
        })

        const timer = await newTimer.save();

        res.json(timer);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;