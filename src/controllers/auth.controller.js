const authService = require('../services/auth.service');

const register = async (req, res) => {
    try{
        const user = await authService.register(req.body);
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

const login = async (req, res) => {
    try{
        const data = await authService.login(req.body);
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

const refresh = async (req, res) => {
    try{
        const data = await authService.refresh(req.body);
        res.status(200).json(data);
    } catch(error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
};

const logout = async (req, res) => {
    try{
        await authService.logout(req.user.id);
        res.status(200).json({message: 'Logged out successfully'});
    } catch(error) {
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {register, login, refresh, logout};