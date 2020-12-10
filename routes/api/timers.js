const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Timer = require("../../models/Timer");
const {check, validationResult} = require("express-validator/check");

// @route POST   api/timers
// @desc        Create a timer
// @access      Private
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

// @route        GET api/timers
// @desc         Get all posts
// @access       Private
router.get('/', auth, async(req, res) => {
    try{
        const timers = await Timer.find().sort({ date: -1})
        res.json(timers);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route        GET api/timers
// @desc         Get all posts
// @access       Private
router.get('/me', auth, async(req, res) => {
    try{
        const timers = await Timer.find({user: req.user.id}).sort({ date: 1})
        res.json(timers);

        if (!timers) {
            return res.status(400).json({ msg: 'There is no timers for this user' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route        DELETE api/timers/:id
// @desc         Delete a timer
// @access       Private
router.delete('/:id', auth, async(req, res) => {
    try{
        const timer = await Timer.findById(req.params.id);

        if(!timer){
            return res.status(401).json({mgs: "Timer not found"});
        }

        // Check user so only user who ownes the post can delete it
        if(timer.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorised"})
        }

        await timer.remove();

        res.json({ msg: "Timer removed"});

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({mgs: "Timer not found"});
        }
        res.status(500).send('Server Error');
    }
})



module.exports = router;