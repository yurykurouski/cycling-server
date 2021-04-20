const bot = require("./bot/bot");
const express = require('express');
const mongo = require('./mongo/mongo');
require('./bot/bot');

const app = express();
const port = 3012;

app.listen(port);




// bot.sendMessage(312119002, 'hey');

/* mongo().then(async (mongoose) => {
  try {
    console.log('Connected to MongoDB');

     bot.on('message', (msg) => {
      const msgNormalized = msg.text.toString().toLowerCase();

      switch (msgNormalized) {
        case '/start':
          new userIdSchema({
            userId: msg.chat.id
          })
      }
    })


  } catch (err) {
    console.log('Not connected: ', err);
  } finally {
    mongoose.connection.close();
  }
}) */

