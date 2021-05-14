const User = require('../models/User');

module.exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

     res.status(201).json(user.userInfo);
  } catch (err) {
    res.status(404);
  }
}

