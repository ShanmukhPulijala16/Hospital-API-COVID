const express = require('express');
const router = express.Router();
const statusControllers = require('../controllers/statusControllers');
const authenticateJWT = require('../config/authenticateJWT');

router.get('/:status', authenticateJWT, statusControllers.reportsBasedOnStatus);

module.exports = router;