const jwt = require('jsonwebtoken')

class AuthService {
  createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
  }

  verifyToken(req, res, next) {
    // works as a middleware
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ error: 'No token provided' })

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' }).end()

      req.userId = decoded.id
      next()
    })
  }
}

const authService = new AuthService()
module.exports = authService;
