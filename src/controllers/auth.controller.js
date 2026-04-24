const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try{
        const data = await authService.register(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            ...data
        });
    } catch(error){
        next(error);
    }
};

const login = async (req, res, next) => {
    try{
        const data = await authService.login(req.body);
        res.status(200).json({
            message: 'Login successful',
            ...data
        });
    } catch(error){
        next(error);
    }
};

const refresh = async (req, res, next) => {
    try{
        const data = await authService.refresh(req.body);
        res.status(200).json(data);
    } catch(error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try{
        await authService.logout(req.user.id);
        res.status(200).json({message: 'Logged out successfully'});
    } catch(error) {
        next(error);
    }
};

module.exports = {register, login, refresh, logout};