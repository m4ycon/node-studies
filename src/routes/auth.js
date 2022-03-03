const { Router } = require('express')

const userService = require('../services/users')
const authService = require('../services/auth')
const authController = require('../controllers/AuthController')

const router = Router()


router
  // route to test if token is valid by trying to get user data
  .get('/', authService.verifyToken, async (req, res) => {
    const id = req.userId
    const user = await userService.show(id)
    res.send(user)
  })
  // return token if credentials are valid
  .post('/', authController.createToken)

module.exports = router
