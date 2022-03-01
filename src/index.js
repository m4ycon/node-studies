const express = require('express')

const usersRoutes = require('./routes/users')

const HOST = '0.0.0.0'
const PORT = 3000

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', usersRoutes)

app.listen(PORT, HOST, () => console.log(`Up and running ${HOST}:${PORT}!`))
