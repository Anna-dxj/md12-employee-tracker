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
    sql = [`SELECT id, title FROM role;`, `SELECT id, first_name, last_name FROM employee;`]
    db.promise()
    .query(sql[0])
    .then((roleData)=>{
        const rolesData = roleData[0].map((role) => {
            return `${role.id} ${role.title}`
        })
        return rolesData;
    }).then((roleData) => {
        db.promise()
        .query(sql[1])
        .then((managerData) => {
            const managersData = managerData[0].map((manager) => {
                return `${manager.id} ${manager.first_name} ${manager.last_name}`
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

                const roleParts = role.split(' ');
                const roleId = roleParts[0];
                const roleName = roleParts[1];

                const managerParts = manager.split(' ');
                const managerId = managerParts[0]

                const givenName = firstName.trim();
                const surname = lastName.trim();
                addEmployee(givenName, surname, roleId, managerId);
                console.log(`${givenName} ${surname} added as ${roleName}`)
                showMainMenu();
            })
        })
    })
};

const updateEmployeeRolesMenu = (showMainMenu) => {
    const sql = [`SELECT id, first_name, last_name FROM employee;`, `SELECT id, title FROM role;`]
    db.promise()
    .query(sql[0])
    .then((nameData) => {
        const employeeData = nameData[0].map((employee) => {
            return `${employee.id} ${employee.first_name} ${employee.last_name}`
        })
        db.promise()
        .query(sql[1])
        .then((roleData) => {
            const rolesData = roleData[0].map((role) => {
                return `${role.id} ${role.title}`
            })
            inquirer.prompt([
                {
                    type: 'list', 
                    name: 'name',
                    message: `Which employee's role would you like to update?`,
                    choices: employeeData
                }, {
                    type: 'list',
                    name: 'role',
                    message: `What is this employee's new role?`,
                    choices: rolesData
                }
            ]).then((response) => {
                const {name, role} = response;
                const employeeData = name.split(' ')
                const employeeId = employeeData[0]
                const employeeName= name.slice(2)

                const roleData = role.split(' ')
                const roleId = roleData[0]
                const roleName = role.slice(2)

                updateEmployeeRole(roleId, employeeId)
                console.log(`Updated ${employeeName} as ${roleName}`);
                showMainMenu()
            })
        })
    })
};

const updateEmployeeManagerMenu = (showMainMenu) => {
    const sql = `SELECT id, first_name, last_name FROM employee;`
    db.promise()
    .query(sql)
    .then((data) => {
        const employeeData = data[0].map((employee) => {
            return `${employee.id} ${employee.first_name} ${employee.last_name}`
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
            const employeeData = employees.split(' ')
            const [employeeId, givenName, surname] = employeeData

            const sql2 = `SELECT id, first_name, last_name FROM employee;`

            db.promise()
            .query(sql2)
            .then((data) => {
                const managerData = data[0].map((manager) => {
                    return `${manager.id} ${manager.first_name} ${manager.last_name}`
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
                    const managerArr = managers.split(' ')
                    const managerId = managerArr[0]
                    const managerName = managers.slice(2)

                    const employee = `${givenName} ${surname}`;

                    updateEmployeeManager(managerId, employeeId)
                    console.log(`Updated ${employee}'s manager to ${managerName}.`)
                    
                    showMainMenu()
                })
            })
        })
    })
}

const deleteEmployeeMenu = (showMainMenu) => {
    const sql = `SELECT id, first_name, last_name FROM employee;`
    db.promise()
    .query(sql)
    .then((data) => {
        const employeeData = data[0].map((employee) => {
            return `${employee.id} ${employee.first_name} ${employee.last_name}`
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
            const employeeData = employees.split(' ')
            const employeeId = employeeData[0];
            const employeeName = employees.slice(2)
            deleteEmployee(employeeId)
            console.log(`${employeeName} removed.`);
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