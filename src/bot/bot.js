const TelegramBot = require('node-telegram-bot-api');
const TGUser = require('../models/TG-User');

const token = process.env.TG_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const addReplyMarkup = (text) => {
  return {
    'reply_markup': {
      'resize_keyboard': true,
      'keyboard': [[text]]
    },
  };
}

bot.on('message', async (msg) => {
  const msgNormalized = msg.text.toString().toLowerCase();
  const usrID = msg.chat.id;

  switch (msgNormalized) {
    case '/start':
      try {
        const user = await new TGUser({
          _id: usrID,
        });

        user.save();

        bot.sendMessage(usrID, 'Welcome, folk.');
        bot.sendMessage(usrID, 'You has automatically subscribed for updates. If you want to unsubscribe - just press button bellow', addReplyMarkup('Unsubscribe'));
      } catch (err) {
        bot.sendMessage(usrID, 'Bot is already activated');
        return console.error('User with provided ID already exists');
      }
      break;

    case 'subscribe':
      try {
        const user1 = await TGUser.findOneAndUpdate({
          _id: usrID
        }, {
          subscribed: true,
        });

        user1.save();

        bot.sendMessage(usrID, 'You have sucessfully subscribe for updates.', addReplyMarkup('Unsubscribe'));
      } catch (err) {
        console.log('Something went wrong');
      }
      break;

    case 'unsubscribe':
      try {
        const user2 = await TGUser.findOneAndUpdate({
          _id: usrID,
        }, {
          subscribed: false,
        });

        user2.save();

        bot.sendMessage(usrID, 'You have sucessfully unsubscribed from updates.', addReplyMarkup('Subscribe'));
      } catch (err) {
        console.log('Something went wrong');
      }
      break;
  }
});

module.exports = bot;
