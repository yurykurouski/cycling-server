const decodeToken = require("../utils/decode-token");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Gear = require('../models/Gear');

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
        [`userInfo.${ body.field }`]: body.value
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

module.exports.setActiveGear = async (req, res) => {
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

module.exports.deleteGear = async (req, res) => {
  try {
    const deleted = await Gear.findByIdAndDelete(req.query.id);

    res.status(200).json(deleted);
  } catch (err) {
    res.status(404);
  }
}

module.exports.editGear = async (req, res) => {
  const body = req.body;

  try {
    const updated = await Gear.findByIdAndUpdate(body.id, {
      ...body.data
    }, { new: true });

    res.status(200).json(updated);
  } catch (err) {
    res.status(404);
  }
}

module.exports.changeEmail = async function (req, res) {
  const body = req.body;
  const token = req.headers.authorization;
  const deBearerized = token.replace(/^Bearer\s/, '');

  const decoded = jwt.verify(deBearerized, process.env.JWT);

  if (decoded) {
    try {
      const candidate = await User.findById(decoded.userId);

      const passResult = await bcrypt.compareSync(body.password, candidate.hashedPass);

      if (passResult) {
        candidate.email = body.email;

        candidate.save();

        res.status(200).json(candidate.email);
      } else {
        res.status(401).json({
          message: 'Invalid password.'
        });
      }
    } catch (err) {
      res.status(404);
    }
  }
}