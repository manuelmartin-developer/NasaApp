const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

const generateToken = (res, id, nickname) => {
  const expiration = 86400;
  const token = jwt.sign({
        id, nickname
    }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration),
    secure: false,
    httpOnly: true,
  });
};
module.exports = generateToken