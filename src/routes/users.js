const { Router } = require('express')
const usersController = require('../controllers/UsersController')
const authController = require('../controllers/AuthController')

const router = Router()

router.get('/all', usersController.index)

// Create a user
router.post('/', usersController.store)

router
  .use('/', authController.verifyToken)
  .use('/', usersController.userExists)
  .route('/')
  // Get a user
  .get(usersController.show)
  // Update a user
  .put(usersController.update)
  // Delete a user
  .delete(usersController.destroy)

module.exports = router
