const loginService = require('../services/login.service');

const login = async (req, res) => {
    try{
        const data = await loginService(req.body);
        res.status(200).json({
            message: 'Login successful',
            ...data
        });
    } catch(error){
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = login;