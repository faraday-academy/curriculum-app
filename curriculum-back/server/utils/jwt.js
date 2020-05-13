const JWT = require('simple-jwt')

const secret = 'gwenstacy'
const header = {
  typ: 'JWT',
  alg: 'HS512'
}

function generateToken(userId) {
  const payload = {
    userId,
    exp: new Date().getTime() + 86400000
  }  
  const token = JWT.getToken(header, payload, secret)

  return token
}

function checkToken(token) {
  return JWT.verifyToken(token, secret)
}

module.exports = { generateToken, checkToken }
