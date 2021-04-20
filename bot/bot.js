const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');
const mongo = require('../mongo/mongo');
const userIdsSchema = require('../mongo/tg-user-id');

const token = process.env.TG_TOKEN;

const bot = new TelegramBot(token, { polling: true });

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

  switch (msgNormalized) {

    case '/start':
      mongo().then(async (mongoose) => {
        try {
          bot.sendMessage(msg.chat.id, "Welcome, folk", addReplyMarkup('Unsubscribe'));
          
          await new userIdsSchema({
            _id: msg.chat.id,
            userId: msg.chat.id
          }).save();
        } catch (err) {
          return console.log('User with provided ID already exists');
        }

        mongoose.connection.close();
        console.log('id saved');
      });
      break;

    case 'subscribe':
      bot.sendMessage(msg.chat.id, "You have sucessfully subscribe for updates.", addReplyMarkup('Unsubscribe'));
      break;
    
    case 'unsubscribe':
      bot.sendMessage(msg.chat.id, "You have sucessfully unsubscribed from updates.", addReplyMarkup('Subscribe'));
      break;
  }



});

// bot.sendMessage(312119002, 'hey');

module.exports = bot