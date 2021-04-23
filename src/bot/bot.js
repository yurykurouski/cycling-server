const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');
const mongo = require('../mongo/mongo');
const userIdsSchema = require('../mongo/schemas/tg-user-id');

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
  const usrID = msg.chat.id;

  switch (msgNormalized) {

    case '/start':
      mongo().then(async (mongoose) => {
        try {
          await new userIdsSchema({
            _id: usrID,
            userId: usrID
          }).save();

          await bot.sendMessage(usrID, 'Welcome, folk.');
          await bot.sendMessage(usrID, 'You has automatically subscribed for updates. If you want to unsubscribe - just press button bellow', addReplyMarkup('Unsubscribe'));
        } catch (err) {
          bot.sendMessage(usrID, 'Bot is already activated')
          return console.error('User with provided ID already exists');
        }

        mongoose.connection.close();
        console.log('id saved');
      });
      break;

    case 'subscribe':
      mongo().then(async (mongoose) => {
        try {
          await userIdsSchema.findOneAndUpdate({
            _id: usrID
          }, {
            subscribed: true
          })
        } catch (err) {
          return console.error('Error: ', error)
        }

        mongoose.connection.close();
        bot.sendMessage(usrID, "You have sucessfully subscribe for updates.", addReplyMarkup('Unsubscribe'));
      });
      break;

    case 'unsubscribe':
      mongo().then(async (mongoose) => {
        try {
          await userIdsSchema.findOneAndUpdate({
            _id: usrID
          }, {
            subscribed: false
          })
        } catch (err) {
          return console.error('Error: ', error)
        }

        mongoose.connection.close();
        bot.sendMessage(usrID, "You have sucessfully unsubscribed from updates.", addReplyMarkup('Subscribe'));
      });
      break;
  }
});




module.exports = bot