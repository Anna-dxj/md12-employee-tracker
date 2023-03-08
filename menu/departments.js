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
        //TODO: add function to add department, passing answer.trim() as a parameter
        console.log(`${newDepartment} added!`)
        showMainMenu();
    })
}

const deleteDepartmentMenu = (showMainMenu) => {
    const sql = `SELECT name FROM department;`
    db.promise()
    .query(sql)
    .then((data) => {
        const departmentData = data[0].map((department) => department.name)
        inquirer.prompt([
            {
                type: 'list',
                name: 'departments',
                message: 'Which department would you like to remove?',
                choices: departmentData
            }
        ]).then((response) => {
            const {departments} = response;
            deleteDepartment(departments)
            console.log(`${departments} removed.`)
            showMainMenu()
        })
    })

}

module.exports = {addDepartmentMenu, deleteDepartmentMenu}