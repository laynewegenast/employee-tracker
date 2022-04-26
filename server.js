const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: 'employee_tracker_db'
});

connection.connect(function(){
    console.log("Employee Tracker");
    promptUser()
})
const promptUser = () => {
    inquirer.prompt([
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
                'Update an employee role',
                'Quit'
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
        if (choices === "Quit") {
            connection.end()
            process.exit(0)
        }
    });
};

viewDepartments = () => {
    console.log('Viewing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

viewRoles = () => {
    console.log('Viewing all roles...\n');
    const sql = `select a.id,a.title,a.salary,a.department_id,b.name from roles a,department b where a.department_id = b.id;`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });

};

viewEmployees = () => {
    console.log('Viewing all employees...\n');
    const sql = `select a.id,a.first_name,a.last_name,a.role_id,a.manager_id,b.title,b.salary from employee a, roles b where a.role_id=b.id;`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
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
    ]).then(response => {
        console.log('Adding new department...\n');
        const sql = "INSERT INTO department (name) VALUES(?)"
        connection.query(sql, response.newDept ,(err, rows) => {
            if (err) throw err;
            console.table(rows);
            promptUser();
        });
    })
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
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: "What is the salary of this role?",
            validate: newRoleSalary => {
                if (newRoleSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newRoleDept',
            message: "What department ID does this role belong to?",
            validate: newRoleDept => {
                if (newRoleDept) {
                    return true;
                } else {
                    console.log('Please enter a department ID');
                    return false;
                }
            }
        }
    ]).then(response => {
        console.log('Adding new role...\n');
        const sql = "INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)"
        connection.query(sql, [response.newRole, response.newRoleSalary, response.newRoleDept ],(err, rows) => {
            if (err) throw err;
            console.table(rows);
            promptUser();
        });
    })

};

addEmployee = () => {
    inquirer.prompt([
        {
          type: 'input',
          name: 'fistName',
          message: "Please enter employee's first name",
          validate: addFirst => {
            if (addFirst) {
                return true;
            } else {
                console.log('Please enter a first name');
                return false;
            }
          }
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Please enter employee's last name",
          validate: addLast => {
            if (addLast) {
                return true;
            } else {
                console.log('Please enter a last name');
                return false;
            }
          }
        }
      ])

};

updateEmpRole = () => {

};

