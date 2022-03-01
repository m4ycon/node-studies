const connection = require('../db/connection')

class UsersController {
  constructor() {
    this.tableName = 'users'
  }

  async index() {
    const users = await connection(this.tableName).select('*')
    return users
  }

  async create(userData) {
    return await connection(this.tableName)
      .insert(userData, 'id')
      .returning('*')
      .then(user => user[0])
  }
}

const usersController = new UsersController()
module.exports = usersController
