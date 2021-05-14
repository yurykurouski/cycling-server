const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const newEventRoutes = require('./routes/new-event');
const settingsRoutes = require('./routes/settings');

const app = express();

app.use(require('morgan')('dev'))
app.use(require('cors')());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/events', newEventRoutes);
app.use('/api/settings', settingsRoutes);

module.exports = app;