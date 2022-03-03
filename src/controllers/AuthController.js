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
}

const authController = new AuthController()
module.exports = authController;
