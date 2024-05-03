const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');

router.get('/bpm', (req, res) => {
  // Définir les en-têtes nécessaires pour SSE(service sent event)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  measurementController(req, res);
});
module.exports = router;