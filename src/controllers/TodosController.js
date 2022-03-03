const todosService = require('../services/todos')

class TodosController {
  async index(req, res) {
    try {
      const todos = await todosService.index()
      res.send(todos)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async show(req, res) {
    try {
      const todo = await todosService.show(req.userId)
      res.send(todo)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async store(req, res) {
    try {
      const { title, completed } = req.body
      const todoData = { user_id: req.userId, title, completed }
      const todo = await todosService.store(todoData)
      res.send(todo)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { title, completed } = req.body
      const todoData = { title, completed }
      const todo = await todosService.update(id, todoData)
      res.send(todo)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params
      const todo = await todosService.destroy(id)
      res.send(todo)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

const todosController = new TodosController()
module.exports = todosController
