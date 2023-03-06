const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const options = [
    `View all departments`, 
    `View all roles`, 
    `View all employees`, 
    `View employees by managers`, 
    `View employees by department`, 
    `View combined salaries of all employees in a given department`,
    `Add a department`,
    `Add a role`, 
    `Add an employee`, 
    `Update an employee role`, 
    `Update employee managers`, 
    `Delete a department`, 
    `Delete a role`, 
    `Delete an employee`, 
    `I'm done`,
];

const showMainMenu = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'menu', 
        message: 'What would you like to do?',
        choices: options,
    }]).then((choice) => {
        if (choice === `View all departments`){
            console.log('View all dept')
        } else if (choice === `View all roles`){
            console.log('view all roles')
        } else if (choice === `View all employees`){
        // } else if (choice === `View employees by managers`){
        //     showMainMenu();
        // } else if (choice === `View employees by department`){
        //     showMainMenu();
        // } else if (choice === `View combined salaries of all employees in a given department`){
        //     showMainMenu();
        } else if (choice === `Add a department`){
        }else if (choice === `Add a role`){
        } else if (choice === `Add an employee`){
        } else if (choice === `Update an employee role`){
        // } else if (choice === `Update employee managers`){
        //     showMainMenu();
        // } else if (choice === `Delete a department`){
        //     showMainMenu();
        // } else if (choice === `Delete a role`){
        //     showMainMenu();
        // } else if (choice === `Delete an employee`){
        //     showMainMenu();
        } else {
            console.log('Program ending')
        }
    })
};

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker'
    }
)

showMainMenu();