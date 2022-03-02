const connection = require('../db/connection')

class UsersService {
  constructor() {
    this._tableName = 'users'
  }

  async index() {
    const users = await connection(this._tableName).select('*')
    return users
  }

  async show(id) {
    const user = await connection(this._tableName)
      .select('*')
      .where({ id })
      .first()

    return user
  }

  async store(userData) {
    return await connection(this._tableName)
      .insert(userData, 'id')
      .returning('*')
      .then(user => user[0])
  }

  async update(id, userData) {
    return await connection(this._tableName)
      .where({ id })
      .update(userData)
      .returning('*')
      .then(user => user[0])
  }

  async destroy(id) {
    return await connection(this._tableName)
      .where({ id })
      .del()
      .returning('*')
      .then(user => user[0])
  }

  async login(email, password) {
    const user = await connection(this._tableName)
      .select('id')
      .where({ email, password })
      .first()

    return user
  }

  async idExists(id) {
    if (!id)
      throw new Error('You must provide an id')

    const user = await connection(this._tableName)
      .select('id')
      .where({ id })
      .first()

    return !!user
  }
}

const usersService = new UsersService()
module.exports = usersService
