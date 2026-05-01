const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {register, login, refresh, logout, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail} = require('../controllers/auth.controller');
const {protect} = require('../middlewares/auth.middleware');
const {validate} = require('../middlewares/validate.middleware');
const {registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema, resendVerificationEmailSchema} = require('../validators/auth.validator');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: 'Too many requests, please try again later' }
});

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.post('/verify-email', validate(verifyEmailSchema), verifyEmail);
router.post('/resend-verification-email', validate(resendVerificationEmailSchema), resendVerificationEmail);

module.exports = router;