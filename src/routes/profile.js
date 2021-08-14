const express = require('express');
const passport = require('passport');

const controller = require('../controllers/profile');

const router = express.Router();

router.get('/my-gear', passport.authenticate('jwt', { session: false }), controller.getGearByUser);
router.get('/user-info', controller.getUserById);

module.exports = router;