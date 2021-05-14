const User = require('../models/User');

module.exports.myProfile = async (req, res) => {
  const body = req.body;
  console.log('dsfs')
  try {
    const user = await User.findById(body._id);

     res.status(201).json(user.userInfo);
  } catch (err) {
    res.status(404);
  }
}

