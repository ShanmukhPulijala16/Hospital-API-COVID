const express = require('express');
const router = express.Router();
const authenticateJWT = require('../config/authenticateJWT');
const patientControllers = require('../controllers/patientControllers');

router.post('/register', authenticateJWT, patientControllers.register);
router.get('/:id/create_report', authenticateJWT, patientControllers.createReport);
router.get('/:id/all_reports', authenticateJWT, patientControllers.allReports);

module.exports = router;