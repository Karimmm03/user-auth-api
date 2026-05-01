const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {protect} = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

router.get('/me', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('name email createdAt');
    res.status(200).json({user});
}));

module.exports = router;