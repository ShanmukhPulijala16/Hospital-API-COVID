const express = require('express');
const router = express.Router();
const authenticateJWT = require('../config/authenticateJWT');
const doctorControllers = require('../controllers/doctorControllers');

router.post('/register', doctorControllers.register);
router.post('/login', doctorControllers.login);
router.post('/logout', authenticateJWT, doctorControllers.logout);

module.exports = router;