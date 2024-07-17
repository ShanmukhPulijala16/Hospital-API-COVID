const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { res.status(200).json({ message: "I am here" }) });

router.use('/doctors', require('./doctors'));
router.use('/patients', require('./patients'));
router.use('/reports', require('./reports'));

module.exports = router;