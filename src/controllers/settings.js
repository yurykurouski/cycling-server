const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Gear = require('../models/Gear');
const decodeToken = require("../utils/decode-token");

module.exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(201).json(user.userInfo);
  } catch (err) {
    res.status(404);
  }
}

module.exports.myProfileUpdate = async (req, res) => {
  const body = req.body;

  const decoded = await await decodeToken(req);

  try {
    const field = await User.findByIdAndUpdate(decoded.userId, {
      $set: {
        [`userInfo.${body.field}`]: body.value
      }
    }, { new: true });

    res.status(201).json(field.userInfo);
  } catch (err) {
    res.status(404);
  }
}

module.exports.addNewGear = async (req, res) => {
  const body = req.body;

  const decoded = await decodeToken(req);

  const gear = await new Gear(
    { ...body, owner: decoded.userId },
  );

  try {
    gear.save();

    res.status(201).send(gear);
  } catch (err) {
    res.status(404);
  }
}

module.exports.getMyGear = async (req, res) => {
  const decoded = await decodeToken(req);

  try {
    const gear = await Gear.find({
      owner: decoded.userId
    });

    if (!gear) {
      return res.status(404);
    }

    res.status(200).send(gear);
  } catch (err) {
    res.status(404);
  }
}

module.exports.setActiveBike = async (req, res) => {
  const body = req.body;
  const decoded = await decodeToken(req);

  try {
    await Gear.updateMany({ owner: decoded.userId }, { "$set": { "active": false } });

    const targetBike = await Gear.findById(body._id);

    const toggled = await Gear.findByIdAndUpdate(body._id, {
      "$set": { "active": !targetBike.active }
    }, { new: true });

    res.status(201).json(toggled);
  } catch (err) {
    res.status(404);
  }
}
