const { Router } = require('express')

const authController = require('../controllers/AuthController')
const todosController = require('../controllers/TodosController')

const router = Router()

router.get('/all', todosController.index)

router
  .use('/', authController.verifyToken)
  .route('/')
  // Read a todo
  .get(todosController.show)
  // Create a todo
  .post(todosController.store)

router
  .use('/:id', authController.verifyToken)
  .route('/:id')
  // Update a todo
  .put(todosController.update)
  // Delete a todo
  .delete(todosController.destroy)

module.exports = router
