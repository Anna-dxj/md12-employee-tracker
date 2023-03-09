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

const addDepartment = (department) =>{
    const sql = `INSERT INTO department (name)
    VALUES (?)`
    const params = department
    db.promise()
    .query(sql, params)
}
const deleteDepartment = (department) => {
    const sql = `DELETE FROM department
    WHERE id = ?`
    const params = department
    db.promise()
    .query(sql, params)
}

module.exports = {addDepartment, deleteDepartment}