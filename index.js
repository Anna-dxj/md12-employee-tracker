const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const addRolesMenu = require('./helper/roles');
const {addEmployeesMenu, udpateEmployeesMenu} = require('./helper/employees')

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
        const {menu} = choice;
        console.log(menu);
        if (menu === `View all departments`){
            console.log('View all dept')
            //showAllDept()
        } else if (menu === `View all roles`){
            console.log('view all roles')
            //showAllRoles();
        } else if (menu === `View all employees`){
            //showAllEmployees();
        // } else if (menu === `View employees by managers`){
        //     showMainMenu();
        // } else if (menu === `View employees by department`){
        //     showMainMenu();
        // } else if (menu === `View combined salaries of all employees in a given department`){
        //     showMainMenu();
        } else if (menu === `Add a department`){
            addDepartmentMenu();
        }else if (menu === `Add a role`){
            addRolesMenu(showMainMenu);
        } else if (menu === `Add an employee`){
            addEmployeesMenu(showMainMenu);
        } else if (menu === `Update an employee role`){
            udpateEmployeesMenu(showMainMenu);
        // } else if (menu === `Update employee managers`){
        //     showMainMenu();
        // } else if (menu === `Delete a department`){
        //     showMainMenu();
        // } else if (menu === `Delete a role`){
        //     showMainMenu();
        // } else if (menu === `Delete an employee`){
        //     showMainMenu();
        } else{
            return;
        }
    })
};

const addDepartmentMenu = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department-name',
            message: 'What is the name of the department?'
        }
    ]).then(() => {
        //TODO: add function to add department, passing answer.trim() as a parameter
        showMainMenu();
    })
}

showMainMenu()