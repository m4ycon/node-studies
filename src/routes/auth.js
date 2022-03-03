const { Router } = require('express')

const userService = require('../services/users')
const authController = require('../controllers/AuthController')

const router = Router()


router
  // route to test if token is valid by trying to get user data
  .get('/', authController.verifyToken, async (req, res) => {
    const id = req.userId
    const user = await userService.show(id)
    res.send(user)
  })
  // return token if credentials are valid
  .post('/', authController.createToken)

module.exports = router
