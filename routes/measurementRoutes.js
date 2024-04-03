const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');
const { server } = require('../config/socketConfig'); 

router.get('/latestBpm', (req, res) => {
  measurementController.sendLatestBpmToClient(server.io); 
  res.sendStatus(200);
});

module.exports = router;