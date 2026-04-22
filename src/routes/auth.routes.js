const express = require('express');
const router = express.Router();
const { register, login, refresh, logout } = require('../controllers/auth.controller');
const {protect} = require('../middlewares/auth.middleware');
const {validate} = require('../middlewares/validate.middleware');
const {registerSchema, loginSchema} = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);

module.exports = router;