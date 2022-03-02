const { Router } = require('express')
const usersController = require('../controllers/UsersController')
const authController = require('../controllers/AuthController')

const router = Router()

router
  .route('/')
  // Get all users
  .get(usersController.index)
  // Create a user
  .post(usersController.store)

router.use('/:id', authController.verifyToken)
router
  .route('/:id')
  // Get a user
  .get(usersController.show)
  // Update a user
  .put(usersController.update)
  // Delete a user
  .delete(usersController.destroy)

module.exports = router
