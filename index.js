const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const teedy_api=require('./teedy/user');
const db = require('./queries')
const auth = require('./authorization');

const app = express();

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
app.post('/users/authenticate', auth.signin);;

//teedy api start
app.post('/teedy/users/create',teedy_api.createUser);
app.post('/teedy/users/login',teedy_api.loginUser);
app.get('/teedy',(request, response) => {
  response.json({ info: 'teedy working' })
});
//teedy api end
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});