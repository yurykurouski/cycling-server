const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

module.exports.newEvent = async function (req, res) {
  const body = await req.body;

  const event = new Event({
    title: body.title,
    adress: body.adress,
    description: body.description,
    date: body.date,
    distance: body.distance,
    terrain: body.terrain,
    level: body.level,
    author: body.author,
    markerData: body.markerData
  });

  try {
    await event.save();

    res.status(201);
  } catch (err) {
    errHandler(res, e);
  }
}

module.exports.getEvents = async function (req, res) {
  const events = await Event.find({});

  res.status(201).json(events);
}

module.exports.getEventsByUser = async function (req, res) {
  const token = await req.headers.authorization;

  const deBearerized = await token.replace(/^Bearer\s/, '');

  const decoded = await jwt.verify(deBearerized, process.env.JWT);

  if (decoded) {
    const events = await Event.find({
      author: decoded.userId
    });

    if (events) {
      return await res.status(200).send(events);
    }
    return await res.status(404);
  }

  res.status(401);
}