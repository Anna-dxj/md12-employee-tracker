const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker_db'
    }
);

const addRolesMenu = (showMainMenu) => {
    sql = `SELECT name FROM department;`
    db.promise()
    .query(sql)
    .then((data) => {
        const departmentData = data[0].map((department) => department.name)
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName', 
                message: 'What is the name of the role?'
            },{
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },{
                type: 'list',
                name: 'departmentList',
                message: 'To what department does this role belong?',
                choices: departmentData,
            }
        ]).then((response) => {
            const {roleName, salary, departmentList} = response;
            console.log(roleName, salary, departmentList);
            showMainMenu();
        })
    })
}

module.exports = addRolesMenu