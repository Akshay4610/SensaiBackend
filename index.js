const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

const db = require('./queries')
const auth = require('./authorization')



// const port = 3000
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
app.post('/users/authenticate', auth.signin);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})