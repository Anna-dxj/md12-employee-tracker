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
    const sql = `SELECT id, name FROM department;`
    db.promise()
    .query(sql)
    .then((data) => {
        const departmentData = data[0].map((department) => {
            return `${department.id} ${department.name}`
        })
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
                name: 'department',
                message: 'To what department does this role belong?',
                choices: departmentData,
            }
        ]).then((response) => {
            console.log(response);
            const {roleName, salary, department} = response;

            const departmentParts = department.split(' ');
            const departmentId = departmentParts[0];
            const departmentName = department.slice(2);

            const newRole = roleName.trim();
            const newSalary = salary.trim();

            addRoles(newRole, newSalary, departmentId)
            console.log(`${roleName} added to ${departmentName}`);
            showMainMenu();
        })
    })
}

const deleteRoleMenu = (showMainMenu) => {
    const sql = `SELECT id, title FROM role;`
    db.promise()
    .query(sql)
    .then((data)=>{
        const roleData = data[0].map((role) => {
            return `${role.id} ${role.title}`
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'roles',
                message: `Which role would you like to delete?`,
                choices: roleData
            }
        ]).then((response) => {
            const {roles} = response; 
            const roleParts = roles.split(' ');
            const roleId = roleParts[0]; 
            const roleName = roles.split(2);
            deleteRole(roleId);
            console.log(`${roleName} removed.`)
            showMainMenu()
        })
    })
}

module.exports = {addRolesMenu, deleteRoleMenu}