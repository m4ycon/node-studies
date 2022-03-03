const express = require('express')
require('dotenv').config()

const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const todosRoutes = require('./routes/todos')

const HOST = '0.0.0.0'
const PORT = 3000

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', usersRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todosRoutes)

app.listen(PORT, HOST, () => console.log(`Up and running ${HOST}:${PORT}!`))
