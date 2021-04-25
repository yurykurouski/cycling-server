const express = require('express');
const passport = require('passport');

const controller = require('../controllers/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/', passport.authenticate('jwt', { session: false }), controller.auth);

// ! штука ниже авторизует запросы к апи с авторизацией, еще ниже
// ! пример как ее использовать в роутере. Нужно будет использовать для бота или создания событий
// passport.authenticate('jwt', { session: false })
// router.post('/register', passport.authenticate('jwt', { session: false }), controller.register);

module.exports = router;
