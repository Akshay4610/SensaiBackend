const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");

const db = require('./queries')
const auth = require('./authorization')

const app = express()

const port = 3000

app.use(cors({
  origin: "http://localhost:4200"
}))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
app.post('/users/authenticate', auth.signin);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})