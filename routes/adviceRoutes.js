const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/adviceController');

router.post('/advice',adviceController.registeradvice);
module.exports = router;