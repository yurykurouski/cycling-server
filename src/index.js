const express = require('express');
const cors = require('cors')
// const coBody = require('co-body');
const utils = require('./utils');
const eventSchema = require('./mongo/schemas/new-event');
const userIdsSchema = require('./mongo/schemas/tg-user-id');
const { body, check, validationResult } = require('express-validator');
const mongo = require("./mongo/mongo");
require('./bot/bot');

const app = express();
const port = 3012;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Express listening at //localhost:${port}`);
});

app.post('/new-event', async (req, res) => {
  const body = await req.body
  // const body = await coBody.json(req);

  mongo().then(async (mongoose) => {
    try {
      utils.validateRequest(body);

      await new eventSchema({
        title: body.title,
        description: body.description,
        author: body.author,
        link: body.link
      }).save();

      const usersIds = await userIdsSchema.find({
        subscribed: true
      });

      await utils.sendEventToBotUsers(body, usersIds);
      await res.sendStatus(200);
      await console.log('New event is saved to DB');
    } catch (err) {
      res.sendStatus(400);
      return console.log('Error: ', err);
    }
    mongoose.connection.close();
  });

});

app.post('/register',
  check('email').isEmail(),
  check('password').notEmpty(),
  check('repeatPass').notEmpty().custom((value, { req }) => value === req.body.password),
  async (req, res) => {
    // const body = await coBody.json(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await res.sendStatus(200)
    await console.log(req.body)
  })