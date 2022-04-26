const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: 'employee_tracker_db'
});

const promptUser = () => {
    inpuirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]).then((selection) => {
        const { choices } = selection;
        if (choices === "View all departments") {
            viewDepartments();
        }
        if (choices === "View all roles") {
            viewRoles();
        }
        if (choices === "View all employees") {
            viewEmployees();
        }
        if (choices === "Add a department") {
            addDepartment();
        }
        if (choices === "Add a role") {
            addRole();
        }
        if (choices === "Add an employee") {
            addEmployee();
        }
        if (choices === "Update an employee role") {
            updateEmpRole();
        }
    });
};

viewDepartments = () => {
    console.log('Viewing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

viewRoles = () => {
    console.log('Viewing all roles...\n');

    // const sql = 

};

viewEmployees = () => {
    console.log('Viewing all employees...\n')
};

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: "What department would you like to add?",
            validate: newDept => {
                if (newDept) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
};

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: "What role would you like to add?",
            validate: newRole => {
                if (newRole) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
            }
        }
    ])

};

addEmployee = () => {

};

updateEmpRole = () => {

};