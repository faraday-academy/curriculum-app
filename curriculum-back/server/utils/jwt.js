import jwt from 'jsonwebtoken'

const secret = 'gwenstacy'
// TODO: What should I do with this?
// const header = {
//   typ: 'JWT',
//   alg: 'HS512'
// }

export function generateToken(userId) {
  const data = {
    userId
  }

  return jwt.sign({ data }, secret, { expiresIn: '7d' })
}

export function decodeToken(token) {
  return jwt.verify(token, secret)
}

export function checkToken(token) {
  try {
    jwt.verify(token, secret)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export default { generateToken, decodeToken, checkToken }
