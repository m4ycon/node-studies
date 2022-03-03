const jwt = require('jsonwebtoken')

class AuthService {
  createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
  }
}

const authService = new AuthService()
module.exports = authService;
