const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');

router.get('/bpm', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const intervalId = setInterval(() => {
    measurementController.sendLatestBpmToClient(req, res);
  }, 1000);

  req.on('close', () => {
      clearInterval(intervalId);
      res.end();
  });
});
module.exports = router;