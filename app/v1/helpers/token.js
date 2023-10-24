const jwt = require('jsonwebtoken')
require('dotenv').config()

const { JWT_SECRET, JWT_EXP } = process.env

module.exports = (obj) => {
  const jwtOptions = {
    ...(JWT_EXP && { expiresIn: JWT_EXP }),
  }

  return jwt.sign(
    {
      user: obj,
    },
    JWT_SECRET,
    jwtOptions
  )
}
