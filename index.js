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
    `Add a role`, 
    `Add an employee`, 
    `Update an employee role`, 
    `Update employee managers`, 
    `Delete a department`, 
    `Delete a role`, 
    `Delete an employee`, 
    `I'm done`,
];

const showMenu = () => {inquirer
    .prompt({
        type: 'list',
        name: 'menu', 
        message: 'What would you like to do?',
        choices: options,
    }).then((choice) => {
        if (choice === `View all departments`){
            showMenu();
        } else if (choice === `View all roles`){
            showMenu();
        } else if (choice === `View all employees`){
            showMenu();
        } else if (choice === `View employees by managers`){
            showMenu();
        } else if (choice === `View employees by department`){
            showMenu();
        } else if (choice === `View combined salaries of all employees in a given department`){
            showMenu();
        } else if (choice === `Add a role`){
            showMenu();
        } else if (choice === `Add an employee`){
            showMenu();
        } else if (choice === `Update an employee role`){
            showMenu();
        } else if (choice === `Update employee managers`){
            showMenu();
        } else if (choice === `Delete a department`){
            showMenu();
        } else if (choice === `Delete a role`){
            showMenu();
        } else if (choice === `Delete an employee`){
            showMenu();
        } else {
            console.log('Program ending')
        }
    })
}

showMenu()