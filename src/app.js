const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const newEventRoutes = require('./routes/new-event');

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

app.use('/api/auth', authRoutes);
app.use('/api/events', newEventRoutes);

module.exports = app;