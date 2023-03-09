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

const addEmployee = (firstName, lastName, role, manager) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`
    const params = [firstName, lastName, role, manager]
    db.promise()
    .query(sql, params)
}
const updateEmployeeRole = (role, employee) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    params = [role, employee]
    db.promise()
    .query(sql, params)
}
const updateEmployeeManager = (manager, employee) => {
    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`
    if (employee === manager) {
        const params = [null, employee]
        db.promise()
        .query(sql, params);
    } else {
        const params = [manager, employee]
        db.promise()
        .query(sql, params)
    }
}
const deleteEmployee = (employee) => {
    const sql = `DELETE FROM employee
    WHERE id = ?`
    const params = employee
    db.promise()
    .query(sql, params)
}

module.exports = {
    addEmployee,
    updateEmployeeRole, 
    updateEmployeeManager, 
    deleteEmployee
}