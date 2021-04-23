const express = require('express');
const cors = require('cors')
const utils = require('./utils');
const eventSchema = require('./mongo/schemas/new-event');
const userIdsSchema = require('./mongo/schemas/tg-user-id');
const registeredUsersSchema = require('./mongo/schemas/new-user');
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

  await mongo().then(async (mongoose) => {
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
      return res.status(400).send(err.message);
    } finally {
      mongoose.connection.close();
    }
  });
});

app.post('/register',
  check('email', 'Email invalid format').isEmail(),
  check('password').notEmpty().withMessage('Password can not be empty'),
  check('repeatPass', 'Passwords must be same').notEmpty().custom((value, { req }) => value === req.body.password),
  async (req, res) => {

    const errors = validationResult(req);
    const body = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await mongo().then(async (mongoose) => {
      try {
        const isExist = await registeredUsersSchema.findOne({
          email: body.email
        }).exec();

        if (isExist) {
          throw Error('User with provided email already registered.');
        }

        await new registeredUsersSchema({
          email: body.email,
          hashedPass: body.password
        }).save();

        res.sendStatus(200);
      } catch (err) {
        return res.status(400).send(err.message)
      } finally {
        await mongoose.connection.close();
      }
    });
  });