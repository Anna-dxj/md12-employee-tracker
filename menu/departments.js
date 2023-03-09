const inquirer = require('inquirer');
const mysql = require('mysql2');

const {addDepartment, deleteDepartment} = require('../helper/department')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker_db'
    }
);

const addDepartmentMenu = (showMainMenu) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then((response) => {
        const {department} = response;
        const newDepartment = department.trim();
        addDepartment(newDepartment)
        console.log(`${newDepartment} added!`)
        showMainMenu();
    })
}

const deleteDepartmentMenu = (showMainMenu) => {
    const sql = `SELECT id, name FROM department;`
    db.promise()
    .query(sql)
    .then((data) => {
        const departmentData = data[0].map((department) => {
            return `${department.id} ${department.name}`
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'departments',
                message: 'Which department would you like to remove?',
                choices: departmentData
            }
        ]).then((response) => {
            const {departments} = response;

            const departmentParts = departments.split(' ');
            const departmentId = departmentParts[0];
            const departmentName = departments.slice(2)
            
            deleteDepartment(departmentId)
            console.log(`${departmentName} removed.`)
            showMainMenu()
        })
    })

}

module.exports = {addDepartmentMenu, deleteDepartmentMenu}