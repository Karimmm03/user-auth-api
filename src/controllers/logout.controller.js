const logoutService = require('../services/logout.service');

const logout = async (req, res) => {
    try{
        await logoutService(req.user.id);
        res.status(200).json({message: 'Logged out successfully'});
    } catch(error) {
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = logout;