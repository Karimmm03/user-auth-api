const express = require('express');
const router = express.Router();
const {register, login, refresh, logout, forgotPassword, resetPassword} = require('../controllers/auth.controller');
const {protect} = require('../middlewares/auth.middleware');
const {validate} = require('../middlewares/validate.middleware');
const {registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema} = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

module.exports = router;