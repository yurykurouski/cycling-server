const express = require('express');
const bot = require("./bot/bot");
const mongo = require('./mongo/mongo');
const userIdsSchema = require('./mongo/tg-user-id');
require('./bot/bot');

const app = express();
const port = 3012;

app.listen(port);

bot.on('message', (msg) => {
  const msgNormalized = msg.text.toString().toLowerCase();

  switch (msgNormalized) {
    case '/start':
      mongo().then(async () => {
        try {
          await new userIdsSchema({
            _id: msg.chat.id,
            userId: msg.chat.id
          }).save()
        } catch (err) {
          return console.log('User with provided ID already exists');
        }
        console.log('id saved');
      });
      
      break;
  }


})

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

