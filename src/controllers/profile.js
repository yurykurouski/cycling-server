const User = require('../models/User');
const Gear = require('../models/Gear');
const decodeToken = require("../utils/decode-token");

module.exports.getGearByUser = async (req, res) => {
  const query = req.query;

  try {
    const response = await Gear.find({
      owner: query.id,
      active: true
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(404);
  }
}