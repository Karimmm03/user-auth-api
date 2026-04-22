const User = require('../models/user.model');

const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken: null});
};

module.exports = logout;