const jwt = require('jsonwebtoken');

module.exports = async (req) => {
  const token = await req.headers.authorization;
  const deBearerized = await token.replace(/^Bearer\s/, '');
  return decoded = await jwt.verify(deBearerized, process.env.JWT);
}