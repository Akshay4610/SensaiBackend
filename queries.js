const config = require("./config/auth.config");

const bcrypt = require("bcryptjs");

const Pool = require('pg').Pool
const pool = new Pool({
    user: config.pg_user,
    host: config.pg_host,
    database: config.pg_database,
    password: config.pg_password,
    port: config.pg_port
  });

const getUsers =  (request, response) => {
    pool.query('SELECT * FROM users_users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users_users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { password,email, isActive, isAdmin, isStaff, fullName  } = request.body
    const now = new Date();
    let hash = bcrypt.hashSync(password, 10);
    pool.query('INSERT INTO users_users (password, last_login, email, is_active, is_admin, is_staff, full_name) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [hash, now, email, isActive, isAdmin, isStaff, fullName], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User addded with ID: ${results.id}`)
    })
}

// const updateUser = (request, response) => {
//     const id = parseInt(request.params.id);
//     const {name, email} = request.body;

//     pool.query(
//         'UPDATE users_users SET name = $1, email = $2 WHERE id = $3',
//         [name, email, id],
//         (error, results) => {
//             if(error) {
//                 throw error;
//             }
//             response.status(200).send(`User modified with IDL ${id}`)
//         }
//     )
// }

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id);

//     pool.query('DELETE FROM users_users WHERE id = $1', [id], (error, results) => {
//         if(error) {
//             throw error;
//         }
//         response.status(200).send(`User deleted with ID: ${id}`);
//     })
// }

module.exports = {
     getUsers,
    getUserById,
    createUser,
    // updateUser,
    // deleteUser
}