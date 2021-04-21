const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');
const mongo = require('../mongo/mongo');
const userIdsSchema = require('../mongo/tg-user-id');

const token = process.env.TG_TOKEN;

const bot = new TelegramBot(token, { polling: true });

/* const collection = userIdsSchema.find({
  _id: 312119002
})
console.log(collection) */

const addReplyMarkup = (text) => {
  return {
    "reply_markup": {
      "resize_keyboard": true,
      "keyboard": [[text]]
    }
  }
}

bot.on('message', (msg) => {
  const msgNormalized = msg.text.toString().toLowerCase();
  const usrID = msg.chat.id;

  switch (msgNormalized) {

    case '/start':
      mongo().then(async (mongoose) => {
        try {
          await new userIdsSchema({
            _id: usrID,
            userId: usrID
          }).save();

          await bot.sendMessage(usrID, "Welcome, folk", addReplyMarkup('Unsubscribe'));
        } catch (err) {
          return console.log('User with provided ID already exists');
        }

        mongoose.connection.close();
        console.log('id saved');
      });
      break;

    case 'subscribe':
      mongo().then(async (mongoose) => {
        try {
          await userIdsSchema.findOneAndUpdate
        }
      })

      bot.sendMessage(usrID, "You have sucessfully subscribe for updates.", addReplyMarkup('Unsubscribe'));
      break;

    case 'unsubscribe':
      bot.sendMessage(usrID, "You have sucessfully unsubscribed from updates.", addReplyMarkup('Subscribe'));
      break;
  }



});

// bot.sendMessage(312119002, 'hey');

module.exports = bot