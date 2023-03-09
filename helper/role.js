const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker_db'
    }
);

const addRoles = (roleName, salary, department) => {
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?);`
    const params = [roleName, salary, department]
    db.promise()
    .query(sql, params)
}

const deleteRole = (roleName) => {
    const sql = `DELETE FROM role
    WHERE id = ?;`
    const params = roleName
    db.promise()
    .query(sql, params)
}

module.exports = {addRoles, deleteRole}