const { checkToken } = require('../utils/jwt')

function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isValid = checkToken(token)
    if (isValid) {
      return next()
    }
    res.status(401).send('Not Authorized')
  } catch(err) {
    res.status(401).send('Invalid Token')
  }
}

module.exports = authMiddleware
