const bot = require('./bot/bot')

const Utils = {
  validateRequest(body) {
    let isValid = false;

    for (let key in body) {
      if (body[key]) isValid = true
    }

    if (isValid) return isValid;

    throw new Error('Request is not valid');
  },

  sendEventToBotUsers(body, users) {
    users.forEach(user => {
      bot.sendMessage(user.userId, `Vejsnorian, new event has been created:\n${body.title}\n${body.description}\n${body.author}\n${body.link}`)
    });
  }


}

module.exports = Utils
