const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'IuvenesDum$umus2',
        database: 'employee_tracker_db'
    }
);

const addEmployeesMenu = (showMainMenu) => {
    sql = `SELECT title FROM role;`
    db.promise()
    .query(sql)
    .then((data)=>{
        const roleData = data[0].map((role) => role.title)
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
            }
        ]).then((response) => {
            const {firstName, lastName, role} = response;
            console.log(firstName, lastName, role)
            showMainMenu();
        })
    })
};

const updateEmployeesMenu = () => {};
module.exports = {addEmployeesMenu, updateEmployeesMenu}

// employeeArr = nameData[0].map((employee) => {
//     return `${employee.first_name} ${employee.last_name}`
// })