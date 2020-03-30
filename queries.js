const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sensai',
    password: 'pULSAR@220',
    port: 5432
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users_users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('SELECT * FROM users_users WHERE id = $1', [id], (error, response) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

const createUser = (request, response) => {
    const { password,email, isActive, isAdmin, isStaff, fullName  } = request.body
    const now = new Date();
    pool.query('INSERT INTO users_users (password, last_login, email, is_active, is_admin, is_staff, full_name) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [password, now, email, isActive, isAdmin, isStaff, fullName], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User addded with ID: ${results.insertId}`)
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
    // getUserById,
    createUser,
    // updateUser,
    // deleteUser
}