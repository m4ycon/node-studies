const authService = require('../services/auth')
const userService = require('../services/users')

class AuthController {
  async createToken(req, res) {
    const { email, password } = req.body

    const user = await userService.login(email, password)
    if (user) {
      const token = authService.createToken({ id: user.id })
      return res.json({ token })
    }

    res.status(401).json({ error: 'Invalid credentials' })
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

const authController = new AuthController()
module.exports = authController;
