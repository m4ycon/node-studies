const connection = require('../db/connection')

class UsersController {
  constructor() {
    this.tableName = 'users'
  }

  async index() {
    const users = await connection(this.tableName).select('*')
    return users
  }

  async show(id) {
    return await connection(this.tableName)
      .select('*')
      .where({ id })
      .first()
  }

  async store(userData) {
    return await connection(this.tableName)
      .insert(userData, 'id')
      .returning('*')
      .then(user => user[0])
  }

  async update(id, userData) {
    return await connection(this.tableName)
      .where({ id })
      .update(userData)
      .returning('*')
      .then(user => user[0])
  }

  async destroy(id) {
    return await connection(this.tableName)
      .where({ id })
      .del()
      .returning('*')
      .then(user => user[0])
  }

  async login(email, password) {
    const user = await connection(this.tableName)
      .select('id')
      .where({ email, password })
      .first()

    return user
  }
}

const usersController = new UsersController()
module.exports = usersController
