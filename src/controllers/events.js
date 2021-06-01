const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

module.exports.newEvent = async function (req, res) {
  const body = await req.body;

  const event = new Event({ ...body });

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
  const query = req.query;

  try {
    const events = await Event.find({
      author: query.id
    });

    res.status(200).send(events);
  } catch (err) {
    res.status(404);
  }
}

module.exports.upateEventById = async function (req, res) {
  const body = await req.body;

  try {
    if (body._id) {
      const event = await Event.findByIdAndUpdate(body._id, {
        ...body
      }, { new: true });

      await res.status(201).json(event);
    }
  } catch (err) {
    res.status(404);
  }
}

module.exports.deleteEventById = async function (req, res) {
  const query = req.query;

  try {
    const deleted = await Event.findByIdAndDelete(query.id);

    res.status(200).json(deleted);
  } catch (err) {
    res.status(404);
  }
}