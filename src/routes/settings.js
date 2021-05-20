const express = require('express');
const passport = require('passport');

const controller = require('../controllers/settings');

const router = express.Router();

router.get('/my-profile', passport.authenticate('jwt', { session: false }), controller.myProfile);
router.put('/my-profile', passport.authenticate('jwt', { session: false }), controller.myProfileUpdate);

router.post('/my-gear', passport.authenticate('jwt', { session: false }), controller.addNewGear);
router.get('/my-gear', passport.authenticate('jwt', { session: false }), controller.getMyGear);
router.put('/my-gear', passport.authenticate('jwt', { session: false }), controller.setActiveGear);
router.delete('/my-gear', passport.authenticate('jwt', { session: false }), controller.deleteGear);

module.exports = router;