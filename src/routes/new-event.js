const express = require('express');
const passport = require('passport');

const controller = require('../controllers/new-event');

const router = express.Router();

router.post('/new-event', passport.authenticate('jwt', { session: false }), controller.newEvent);

module.exports = router;