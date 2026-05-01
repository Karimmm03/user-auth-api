const authService = require('../services/auth.service');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const data = await authService.register(req.body);
    res.status(201).json({
        message: 'User registered successfully',
        ...data
    });
});

const login = asyncHandler(async (req, res) => {
    const data = await authService.login(req.body);
    res.status(200).json({
        message: 'Login successful',
        ...data
    });
});

const refresh = asyncHandler(async (req, res) => {
    const data = await authService.refresh(req.body);
    res.status(200).json(data);
});

const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id);
    res.status(200).json({message: 'Logged out successfully'});
});

const forgotPassword = asyncHandler(async (req, res) => {
    await authService.forgotPassword(req.body);
    res.status(200).json({message: 'If that email is registered, a reset link has been sent'});
});

const resetPassword = asyncHandler(async (req, res) => {
    await authService.resetPassword(req.body);
    res.status(200).json({message: 'Password reset successfully. Please log in with your new password.'});
});

const verifyEmail = asyncHandler(async (req, res) => {
    const data = await authService.verifyEmail(req.body);
    res.status(200).json({
        message: 'Email verified successfully',
        ...data
    });
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const {message} = await authService.resendVerificationEmail(req.body);
    res.status(200).json({message});
});

module.exports = {register, login, refresh, logout, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail};