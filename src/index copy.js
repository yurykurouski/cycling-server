require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const authRoutes = require('./mongo/routes/auth');
const cors = require('cors');
const utils = require('./utils');
const eventSchema = require('./mongo/models/new-event');
const userIdsSchema = require('./mongo/models/tg-user-id');
const User = require('./mongo/models/user');
const { body, check, validationResult } = require('express-validator');
const mongo = require("./mongo/mongo");
require('./bot/bot');

const app = express();
const port = 3012;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

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

/* app.post('/register',
  check('email', 'Email invalid format').isEmail(),
  check('password').notEmpty().withMessage('Password can not be empty'),
  check('repeatPass', 'Passwords must be same').notEmpty().custom((value, { req }) => value === req.body.password),
  async (req, res) => {

    const errors = validationResult(req);
    const body = await req.body;
    console.log(await body)

    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }

    await mongo().then(async (mongoose) => {
      try {
        const isExist = await User.findOne({
          email: body.email
        }).exec();

        if (isExist) {
          return res.status(409).json({
            message: 'User with provided email already registered.'
          });
        }

        const salt = bcrypt.genSaltSync(10);
        const password = body.password

        await new User({
          email: body.email,
          hashedPass: bcrypt.hashSync(password, salt)
        }).save();

        await res.send(201);
      } catch (err) {
        return res.status(400).send(err.message)
      } finally {
        await mongoose.connection.close();
      }
    });
  }); */