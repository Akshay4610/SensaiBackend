const config = require("./config/auth.config");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: config.pg_user,
  host: config.pg_host,
  database: config.pg_database,
  password: config.pg_password,
  port: config.pg_port
});


const jwt = require("jsonwebtoken");
const db = require("./queries");
const bcrypt = require("bcryptjs");

const signin = (request, response) => {
  pool.query("SELECT * FROM users_users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    //response.status(200).json(results.rows)

    const users = results.rows.filter(us => {
      return us.email == request.body.username;
    });
    const user = users[0];

    if (!user) {
      return response.status(404).send({
        message: "User not found"
      });
    }

    //let passwordIsValid = request.body.password === user.password;
    var passwordIsValid = bcrypt.compareSync(
        request.body.password,
        user.password
      );

    if (!passwordIsValid) {
      return response.status(401).send({
        accessToken: null,
        message: "Invalid password"
      });
    }

    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 //24 hours
    });

    response.status(200).send({
      id: user.id,
      email: user.email,
      isActive: user.is_active,
      isAdmin: user.is_admin,
      isStaff: user.is_staff,
      fullName: user.full_name,
      token: token
    });
    //})
  });
  // response.status(200).send({
  //       message: 'Api called'
  //     });
};

module.exports = {
  signin
};
