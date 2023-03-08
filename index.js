const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const {addDepartmentMenu, deleteDepartmentMenu} = require('./menu/departments')
const {addRolesMenu, deleteRoleMenu} = require('./menu/roles');
const {addEmployeesMenu, updateEmployeeRolesMenu, updateEmployeeManagerMenu, deleteEmployeeMenu} = require('./menu/employees');
const {viewAllDepartments, viewAllRoles, viewAllEmployees, viewEmployeeByManager, viewEmployeeByDepartment, viewSalariesByDepartment} = require('./helper/view')


const options = [
    `View all departments`, 
    `View all roles`, 
    `View all employees`, 
//    `View employees by managers`, 
//    `View employees by department`, 
//    `View combined salaries of all employees in a given department`,
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
        if (menu === `View all departments`){
            viewAllDepartments(showMainMenu)
        } else if (menu === `View all roles`){
            viewAllRoles(showMainMenu)
        } else if (menu === `View all employees`){
            viewAllEmployees(showMainMenu)
        } else if (menu === `View employees by managers`){
            viewEmployeeByManager(showMainMenu)
        } else if (menu === `View employees by department`){
            viewEmployeeByDepartment(showMainMenu)
        } else if (menu === `View combined salaries of all employees in a given department`){
            viewSalariesByDepartment(showMainMenu)
        } else if (menu === `Add a department`){
            addDepartmentMenu(showMainMenu);
        }else if (menu === `Add a role`){
            addRolesMenu(showMainMenu);
        } else if (menu === `Add an employee`){
            addEmployeesMenu(showMainMenu);
        } else if (menu === `Update an employee role`){
            updateEmployeeRolesMenu(showMainMenu);
        } else if (menu === `Update employee managers`){
            updateEmployeeManagerMenu(showMainMenu);
        } else if (menu === `Delete a department`){
            deleteDepartmentMenu(showMainMenu);
        } else if (menu === `Delete a role`){
            deleteRoleMenu(showMainMenu);
        } else if (menu === `Delete an employee`){
            deleteEmployeeMenu(showMainMenu)
        } else if (menu === `I'm done`){
            return;
        }
    })
};

showMainMenu()