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

const viewAllDepartments = (showMainMenu) => {
    const sql = `SELECT * FROM department;`
    db.promise()
    .query(sql)
    .then((data) => {
        const departmentData = data[0]
        console.log('All Departments:')
        console.table(departmentData)
        showMainMenu()
    })
}
const viewAllRoles = (showMainMenu) => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role 
    JOIN department ON role.department_id = department.id;`
    db.promise()
    .query(sql)
    .then((data) => {
        const roleData = data[0]
        console.log('All Roles:')
        console.table(roleData)
        showMainMenu()
    })
}
const viewAllEmployees = (showMainMenu) => {
    const sql = `SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) AS employee, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, role.salary, department.name AS department
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`    
    db.promise()
    .query(sql)
    .then((data) => {
        const employeeData = data[0]
        console.log('All Employees')
        console.table(employeeData)
        showMainMenu()
    })
}
const viewEmployeeByManager = (showMainMenu) => {
    const sql = `SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) AS employee, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ORDER BY employee.manager_id;`
    db.promise()
    .query(sql)
    .then((data) => {
        const employeeData = data[0]
        console.log('Employees by Manager')
        console.table(employeeData)
        showMainMenu()
    })
}
const viewEmployeeByDepartment  = (showMainMenu) => {
    const sql = `SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) AS employee, department.name as department
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY department_id;`
    db.promise()
    .query(sql)
    .then((data) => {
        const employeeData = data[0]
        console.log('Employees by Department')
        console.table(employeeData)
        showMainMenu()
    })
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    viewEmployeeByManager,
    viewEmployeeByDepartment,
}