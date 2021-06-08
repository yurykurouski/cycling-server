const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const decodeToken = require("../utils/decode-token");

module.exports.newEvent = async function (req, res) {
  const body = await req.body;

  const event = new Event({ ...body });

  try {
    await event.save();

    res.status(201).json(event);
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

module.exports.userInOut = async function (req, res) {
  const body = req.body;
  const decoded = await decodeToken(req);

  try {
    const event = await Event.findById(body.eventId);
    const whosIn = event.whosIn;

    const match = whosIn.find(user => user.userId === decoded.userId);

    if (!match) {
      const userIn = {
        "userId": decoded.userId,
        "userName": body.userName
      }

      event.whosIn.push(userIn);

      event.save();

      return res.status(201).send(event);
    } else {
      event.whosIn = event.whosIn.filter(user => user.userId !== decoded.userId);

      event.save();

      res.status(201).send(event);
    }

  } catch (err) {
    res.status(500);
  }
}