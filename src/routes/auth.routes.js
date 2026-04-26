const express = require('express');
const router = express.Router();
const {register, login, refresh, logout, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail} = require('../controllers/auth.controller');
const {protect} = require('../middlewares/auth.middleware');
const {validate} = require('../middlewares/validate.middleware');
const {registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema, resendVerificationEmailSchema} = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.post('/verify-email', validate(verifyEmailSchema), verifyEmail);
router.post('/resend-verification-email', validate(resendVerificationEmailSchema), resendVerificationEmail);

module.exports = router;