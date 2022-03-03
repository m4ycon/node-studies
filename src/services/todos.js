const connection = require('../db/connection')

class TodosService {
  constructor() {
    this._tableName = 'todos'
  }

  async index() {
    const todos = await connection(this._tableName).select('*')
    return todos
  }

  async show(user_id) {
    // return all todos related to a user
    const todos = await connection(this._tableName)
      .select('*')
      .where({ user_id })

    return todos
  }

  async store(todoData) {
    return await connection(this._tableName)
      .insert(todoData, 'id')
      .returning('*')
      .then(todo => todo[0])
  }

  async update(id, todoData) {
    return await connection(this._tableName)
      .where({ id })
      .update(todoData)
      .returning('*')
      .then(todo => todo[0])
  }

  async destroy(id) {
    return await connection(this._tableName)
      .where({ id })
      .del()
      .returning('*')
      .then(todo => todo[0])
  }
}

const todosService = new TodosService()
module.exports = todosService;
