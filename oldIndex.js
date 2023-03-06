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

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker.db'
    }
)

const showMainMenu = () => {inquirer
    .prompt([{
        type: 'list',
        name: 'menu', 
        message: 'What would you like to do?',
        choices: options,
    }]).then((choice) => {
        if (choice === `View all departments`){
            viewDepartments();
            showMainMenu();
        } else if (choice === `View all roles`){
            viewRoles();
            showMainMenu();
        } else if (choice === `View all employees`){
            viewEmployees();
            showMainMenu();
        // } else if (choice === `View employees by managers`){
        //     showMainMenu();
        // } else if (choice === `View employees by department`){
        //     showMainMenu();
        // } else if (choice === `View combined salaries of all employees in a given department`){
        //     showMainMenu();
        } else if (choice === `Add a department`){
            addDepartmentMenu();
        }else if (choice === `Add a role`){
            addRoleMenu();
        } else if (choice === `Add an employee`){
            addEmployeeMenu();
        } else if (choice === `Update an employee role`){
            updateRoleMenu();
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

const addDepartmentMenu = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department-name',
            message: 'What is the name of the department?'
        }
    ]).then(() => {
        showMainMenu()

    })
};

const addRoleMenu = () => {
    const query = 'SELECT title FROM role;'
    db.promise()
    .query(query)
    .then((err, data) => {
        if (err){
            console.error(err)
        } else if (data) {
            console.log
            return;
            const departments = data
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role-name',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'To what department does this role belong?',
                    choices: departments
                }
            ]).then(()=>{
                showMainMenu()

            })
        }
    })
};
const addEmployeeMenu = () => {
    const query = 'SELECT title FROM role;'
    db.query(query, (err, data) => {
        if (err){
            console.error(err)
        } else if (data){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first-name',
                    message: `What is the employee's first name?`
                },
                {
                    type: 'input',
                    name: 'last-name',
                    mesage: `What is the employee's last name?`
                },
                {
                    type: 'list', 
                    name: 'role', 
                    message: `What is the new employee's role?`,
                    choices: roles
                }
            ]).then(() => {
                showMainMenu()
            })
        }
    })
};
const updateRoleMenu = () => {
    const employeeQuery = 'SELECT fist_name, last_name FROM employee;' 
    const roleQuery = 'SELECT title FROM role;'
    db.query (employeeQuery, (employeeErr, employeeData) => {
        if (employeeErr){
            console.error (employeeErr)
        } 
        const employees = ''
        db.query(roleQuery, (roleErr, roleData) => {
            if (roleErr){
                console.log(roleErr)
            }
            const roles = roleData
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee-name',
                    message: `Which employee's role would you like to update?`,
                    choices: employees
                },{
                    type: 'list', 
                    name: 'role', 
                    message: `What is this employee's role?`,
                    choices: roles
                }
            ]).then(() => {
                showMainMenu()
            })
        })
    });
};

const updateManagerMenu = () => {};
const deleteDepartmentMenu = () => {};
const deleteRoleMenu = () => {};
const deleteEmployeeMenu = () => {};

const test = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'test',
            message: 'test?'
        }
    ]).then((response) => {console.log(response)})
};

test()