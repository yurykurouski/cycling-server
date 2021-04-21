const express = require('express');
const coBody = require('co-body');
const utils = require('./utils');
const eventSchema = require('./mongo/new-event');
const mongo = require("./mongo/mongo");
require('./bot/bot');

const app = express();
const port = 3012;

app.listen(port, () => {
  console.log(`Express listening at //localhost:${port}`)
});

app.post('/new-event', async (req, res) => {
  const body = await coBody.json(req);

  mongo().then(async (mongoose) => {
    try {
      utils.validateRequest(body);

      await new eventSchema({
        title: body.title,
        description: body.description,
        author: body.author,
        link: body.link
      }).save();

      // здесь написать функцию, принимающую боди и отправляющую сообщение в бот

      await console.log('New event is saved to DB')
    } catch (err) {
      return console.log(err)
    }
  })


  


})

