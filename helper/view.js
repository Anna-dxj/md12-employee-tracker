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

const viewAllDepartments = (showMainMenu) => {}
const viewAllRoles = (showMainMenu) => {}
const viewAllEmployees = (showMainMenu) => {}
const viewEmployeeByManager = (showMainMenu) => {}
const viewEmployeeByDepartment  = (showMainMenu) => {}
const viewSalariesByDepartment  = (showMainMenu) => {}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    viewEmployeeByManager,
    viewEmployeeByDepartment,
    viewSalariesByDepartment
}