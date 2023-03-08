const inquirer = require('inquirer');
const mysql = require('mysql2');

const {addRoles, deleteRole} = require('../helper/role')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker_db'
    }
);

const addRolesMenu = (showMainMenu) => {
    const sql = `SELECT name FROM department;`
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
            const newRole = roleName.trim();
            const newSalary = salary.trim();
            addRoles(newRole, newSalary, departmentList)
            console.log(`${roleName} added to ${departmentList}`);
            showMainMenu();
        })
    })
}

const deleteRoleMenu = (showMainMenu) => {
    const sql = `SELECT title FROM role;`
    db.promise()
    .query(sql)
    .then((data)=>{
        const roleData = data[0].map((role) => role.title)
        inquirer.prompt([
            {
                type: 'list',
                name: 'roles',
                message: `Which role would you like to delete?`,
                choices: roleData
            }
        ]).then((response) => {
            const {roles} = response; 
            deleteRole(roles);
            console.log(`${roles} removed.`)
            showMainMenu()
        })
    })
}

module.exports = {addRolesMenu, deleteRoleMenu}