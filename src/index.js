import express from 'express'

const HOST = 'localhost'
const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, HOST, () => console.log('Up and running 3000!'))
