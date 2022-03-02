const connection = require('../db/connection')
const usersService = require('../services/users')

class UsersController {
  async index(req, res) {
    try {
      const users = await usersService.index()
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const user = await usersService.show(id)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async store(req, res) {
    try {
      const { name, email, password } = req.body
      const userData = { name, email, password }
      const user = await usersService.store(userData)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { name, password } = req.body
      const userData = { name, password }
      const user = await usersService.update(id, userData)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params
      const user = await usersService.destroy(id)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async userExists(req, res, next) {
    const { id } = req.params

    if (!id)
      res.status(400).send('You must provide an id').end()

    const idExists = await usersService.idExists(id)
    if (!idExists)
      res.status(404).send('User not found').end()

    next()
  }
}

const usersController = new UsersController()
module.exports = usersController
