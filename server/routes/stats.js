// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const {getStats} = require('../controllers/stats');

console.log(getStats); 

router.get('/get', getStats);

module.exports = router;
