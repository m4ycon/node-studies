const { Router } = require('express')
const usersController = require('../controllers/UsersController')
const authController = require('../controllers/AuthController')

const router = Router()

router
  .route('/')
  // Get all users
  .get(async (req, res) => {
    try {
      const users = await usersController.index()
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  // Create a user
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body
      const userData = { name, email, password }
      const user = await usersController.store(userData)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })

router.use('/:id', authController.verifyToken)

router
  .route('/:id')
  // Get a user
  .get(async (req, res) => {
    try {
      const { id } = req.params
      const user = await usersController.show(id)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  // Update a user
  .put(async (req, res) => {
    try {
      const { id } = req.params
      const { name, email, password } = req.body
      const userData = { name, password }
      const user = await usersController.update(id, userData)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  // Delete a user
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      const user = await usersController.destroy(id)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })

module.exports = router
