var jwt = require('jsonwebtoken')

const secret = 'gwenstacy'
const header = {
  typ: 'JWT',
  alg: 'HS512'
}

function generateToken(userId) {
  const data = {
    userId
  }

  return jwt.sign({ data }, secret, { expiresIn: '7d' })
}

function decodeToken(token) {
  return jwt.verify(token, secret)
}

function checkToken(token) {
  try {
    jwt.verify(token, secret)
    return true
  } catch (err) {
    return false
  }
}

module.exports = { generateToken, decodeToken, checkToken }
