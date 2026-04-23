const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

router.get('/me', protect, async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id).select('name email createdAt');
        res.status(200).json({user});
    } catch(error){
        next(error);
    }
});

module.exports = router;