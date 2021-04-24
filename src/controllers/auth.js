const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const errHandler = require('../utils/error-handler');

module.exports.register = async function (req, res) {
  const body = await req.body;

  const candidate = await User.findOne({
    email: body.email
  });

  if (candidate) {
    return res.status(409).json({
      message: 'User with provided email already registered.'
    });
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = body.password;
    
    const user = new User({
      email: body.email,
      hashedPass: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json({
        message: 'New user registered'
      })
    } catch (err) {
      errHandler(res, e);
    }
  }
}

module.exports.login = async function (req, res) {
  const body = await req.body;

  const candidate = await User.findOne({
    email: body.email
  })

  if (candidate) {
    const passResult = await bcrypt.compareSync(body.password, candidate.hashedPass);

    if (passResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, process.env.JWT, { expiresIn: 60 * 60 });

      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      res.status(401).json({
        message: 'Passwords does not matches.'
      })
    }
  } else {
    res.status(404).json({
      message: 'User with provided email is not registered.'
    });
  }
}