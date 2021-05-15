const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

  const token = await req.headers.authorization;
  const deBearerized = await token.replace(/^Bearer\s/, '');
  const decoded = await jwt.verify(deBearerized, process.env.JWT);

  try {
    const field = await User.findByIdAndUpdate(decoded.userId, {
      $set: {
        [`userInfo.${body.field}`]: body.value
      }
    }, { new: true });

    res.status(201).json(field);
  } catch (err) {
    res.status(404);
  }
}

