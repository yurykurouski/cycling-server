const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');
const mongo = require('../mongo/mongo');
const userIdSchema = require('../mongo/tg-user-id');


const token = process.env.TG_TOKEN;

const bot = new TelegramBot(token, { polling: true });



// bot.sendMessage(312119002, 'hey');

module.exports = bot