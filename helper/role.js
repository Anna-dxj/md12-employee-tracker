const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker_db'
    }
);

const addRoles = (roleName, salary, department) => {}
const deleteRole = (roleName) => {}

module.exports = {addRoles, deleteRole}