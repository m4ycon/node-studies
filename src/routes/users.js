const { Router } = require('express')
const usersController = require('../controllers/UsersController')

const router = Router()

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await usersController.index()
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body
      const userData = { name, email, password }
      const user = await usersController.create(userData)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })

module.exports = router
