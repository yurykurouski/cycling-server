const Event = require('../models/Event');

module.exports.newEvent = async function (req, res) {
  const body = await req.body;

  const event = new Event({
    title: body.title,
    adress: body.adress,
    description: body.description,
    date: body.date,
    terrain: body.terrain,
    level: body.level,
    author: body.author
  });

  try {
    await event.save();

    res.status(201).json({
      message: 'Created'
    })
  } catch (err) {
    errHandler(res, e);
  }
}

module.exports.getEvents = async function (req, res) {
  const events = await Event.find({});
  
  res.status(201).json(events);
}
