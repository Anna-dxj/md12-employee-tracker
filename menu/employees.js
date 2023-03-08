const inquirer = require('inquirer');
const mysql = require('mysql2');

const {addEmployee, updateEmployeeRole, updateEmployeeManager, deleteEmployee} = require('../helper/employee')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker_db'
    }
);

const addEmployeesMenu = (showMainMenu) => {
    sql = [`SELECT title FROM role;`, `SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;`]
    db.promise()
    .query(sql[0])
    .then((roleData)=>{
        const rolesData = roleData[0].map((role) => role.title)
        return rolesData;
    }).then((roleData) => {
        db.promise()
        .query(sql[1])
        .then((managerData) => {
            const managersData = managerData[0].map((manager) => {
                return `${manager.first_name} ${manager.last_name}`
            })
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: `What is the employee's first name?`
                },{
                    type: 'input',
                    name: 'lastName',
                    message: `What is the employee's last name?`
                },{
                    type: 'list',
                    name: 'role',
                    message: `What is the employee's role?`,
                    choices: roleData
                },{
                    type: 'list',
                    name: 'manager',
                    message: `Who is the employee's manager?`,
                    choices: managersData
                }
            ]).then((response) => {
                const {firstName, lastName, role, manager} = response;
                const givenName = firstName.trim();
                const surname = lastName.trim();
                addEmployee(givenName, surname, role, manager);
                console.log(`${firstName} ${lastName} added as ${role}`)
                showMainMenu();
            })
        })
    })
};

const updateEmployeeRolesMenu = (showMainMenu) => {
    const sql = [`SELECT first_name, last_name FROM employee;`, `SELECT title FROM role;`]
    db.promise()
    .query(sql[0])
    .then((nameData) => {
        const employeeData = nameData[0].map((employee) => {
            return `${employee.first_name} ${employee.last_name}`
        })
        return employeeData;
    }).then((employeeData) => {
        db.promise()
        .query(sql[1])
        .then((roleData) => {
            const rolesData = roleData[0].map((role) => role.title)
            inquirer.prompt([
                {
                    type: 'list', 
                    name: 'name',
                    message: `Which employee's role would you like to update?`,
                    choices: rolesData
                }, {
                    type: 'list',
                    name: 'role',
                    message: `What is this employee's new role?`,
                    choices: employeeData
                }
            ]).then((response) => {
                const {name, role} = response;
                updateEmployeeRole(name, role)
                console.log(`Updated ${name} as ${role}`);
                showMainMenu()
            })
        })
    })
};

const updateEmployeeManagerMenu = (showMainMenu) => {
    const sql = `SELECT first_name, last_name FROM employee;`
    db.promise()
    .query(sql)
    .then((data) => {
        const employeeData = data[0].map((employee) => {
            return `${employee.first_name} ${employee.last_name}`
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employees',
                message: `Which employee's manager would you like to update?`,
                choices: employeeData
            }
        ]).then((data) =>{
            const {employees} = data
            const employeeName = employees.split(' ')
            const [givenName, surname] = employeeName;
            return [givenName, surname]
        }).then((data) => {
            const [givenName, surname] = data;
            const sql2 = `SELECT first_name, last_name FROM employee WHERE manager_id IS NULL AND first_name <> '${givenName}' AND last_name <> '${surname}';`
            db.promise()
            .query(sql2)
            .then((data) => {
                const managerData = data[0].map((manager) => {
                    return `${manager.first_name} ${manager.last_name}`
                })
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'managers',
                        message: `Who is this employee's new manager?`,
                        choices: managerData
                    }
                ]).then((data)=>{
                    const {managers} = data;
                    const employee = `${givenName} ${surname}`;
                    console.log(employee)
                    updateEmployeeManager(employee, managers)
                    console.log(`Updated ${employee}'s manager to ${managers}.`)
                    showMainMenu()
                })
            })
        })
    })
}

const deleteEmployeeMenu = (showMainMenu) => {
    const sql = `SELECT first_name, last_name FROM employee;`
    db.promise()
    .query(sql)
    .then((data) => {
        const employeeData = data[0].map((employee) => {
            return `${employee.first_name} ${employee.last_name}`
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employees',
                message: `Which employee would you like to delete?`,
                choices: employeeData
            }
        ]).then((response) => {
            const {employees} = response
            deleteEmployee(employees)
            console.log(`${employees} removed.`);
            showMainMenu()
        })
    })
} 

module.exports = {
    addEmployeesMenu, 
    updateEmployeeRolesMenu, 
    updateEmployeeManagerMenu, 
    deleteEmployeeMenu
}