const registerService = require('../services/register.service');

const register = async (req, res) => {
    try{
        const user = await registerService(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch(error){
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = register;