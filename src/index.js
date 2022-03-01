const express = require('express')
const connection = require('./db/connection')

const HOST = '0.0.0.0'
const PORT = 3000

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.route('/users')
  .get(async (req, res) => {
    try {
      const users = await connection('users').select('*')
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body
      const userData = { name, email, password }
      const user = await connection('users')
        .insert(userData, 'id')
        .returning('*')
        .then(user => user[0])
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  })

app.listen(PORT, HOST, () => console.log(`Up and running ${HOST}:${PORT}!`))
