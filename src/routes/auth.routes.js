const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register.controller');
const loginController = require('../controllers/login.controller');
const refreshController = require('../controllers/refresh.controller');
const logoutController = require('../controllers/logout.controller');
const {protect} = require('../middlewares/auth.middleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController);
router.post('/logout', protect, logoutController);

module.exports = router;