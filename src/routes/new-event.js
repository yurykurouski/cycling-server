const express = require('express');
const controller = require('../controllers/new-event');
const router = express.Router();

router.post('/new-event', controller.newEvent);

module.exports = router;