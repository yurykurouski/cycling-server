const Gear = require('../models/Gear');
const User = require('../models/User');
const objectToArray = require('../utils/object-to-array');

module.exports.getGearByUser = async (req, res) => {
  const query = req.query;

  try {
    const response = await Gear.findOne({
      owner: query.id,
      active: true,
    });

    const arrayed = objectToArray(response);

    res.status(200).json(arrayed);
  } catch (err) {
    res.status(404);
  }
}

module.exports.getUserById = async (req, res) => {
  const { id } = req.query;

  try {
    const { userInfo, email } = await User.findById(id);

    res.status(200).json({ userInfo, email });
  } catch (err) {
    res.status(404);
  }
}