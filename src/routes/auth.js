const { Router } = require('express')

const userController = require('../controllers/UsersController')
const authController = require('../controllers/AuthController')

const router = Router()


router
  // route to test if token is valid by trying to get user data
  .get('/', authController.verifyToken, async (req, res) => {
    const id = req.userId
    const user = await userController.show(id)
    res.send(user)
  })
  // return token if credentials are valid
  .post('/', async (req, res) => {
    const { email, password } = req.body

    const user = await userController.login(email, password)
    if (user) {
      const token = authController.createToken({ id: user.id })
      return res.json({ token })
    }

    res.status(401).json({ error: 'Invalid credentials' })
  })

module.exports = router
