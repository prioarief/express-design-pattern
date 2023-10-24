const jwt = require('jsonwebtoken')
const response = require('../../v1/helpers/response')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'] || req.headers['Authorization']
  if (!token || token === null || token === '') {
    return response(res, 401, 'Unauthorize')
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    try {
      if (err) {
        let message = err.message

        if (err.name === 'TokenExpiredError') {
          message = 'Your login session ended, please login again!'
        }

        return response(res, 401, message)
      }

      req.user = user.user

      return next()
    } catch (error) {
      return response(res, 500, `Sorry, Something Went Wrong: ${error.message}`, null, null)
    }
  })
}
