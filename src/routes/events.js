const express = require('express');
const passport = require('passport');

const controller = require('../controllers/events');

const router = express.Router();

router.post('/new-event', passport.authenticate('jwt', { session: false }), controller.newEvent);
router.get('/events-all', controller.getEvents);
router.get('/by-user', passport.authenticate('jwt', { session: false }), controller.getEventsByUser);
router.put('/update-event', passport.authenticate('jwt', { session: false }), controller.upateEventById);
router.delete('/delete-event', passport.authenticate('jwt', { session: false }), controller.deleteEventById);
router.patch('/im-in', passport.authenticate('jwt', { session: false }), controller.userIn);

module.exports = router;