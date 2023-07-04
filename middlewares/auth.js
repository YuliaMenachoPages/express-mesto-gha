const jwt = require('jsonwebtoken');
const { handleCustomError } = require('./handleCustomError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = extractBearerToken(authorization);
  let payload = {};
  try {
    payload = jwt.verify(token, 'magic-key');
  } catch (err) {
    handleCustomError(res);
  }
  req.user = payload;

  next();
};
