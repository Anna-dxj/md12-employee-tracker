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

const addEmployee = (firstName, lastName, role, LockManager) => {}
const updateEmployeeRole = (name, role) => {}
const updateEmployeeManager = (givenName, surname, manager) => {}
const deleteEmployee = (employees) => {}

module.exports = {
    addEmployee,
    updateEmployeeRole, 
    updateEmployeeManager, 
    deleteEmployee
}