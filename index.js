const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "trapperKeeper_db",
    },
    console.log("It works and you're connected somehow!")
  );

  db.connect(function(err) {
    if (err) throw err
    console.log("MySQL is connected")
    startApp();
});


const startApp = () => {
    return inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'Make your choice. Choose wisely.',
        choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
    }]).then(function(val) {
        switch (val.action) {
            case "View Departments":
                console.log(val.action);
                viewDepartments();
                break;

            case "View Roles":
                viewRoles();
                break;

            case "View Employees":
                viewEmployees();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployee();
        }
    });
}

const viewDepartments = () => {
    (function(err, res) {
        if (err) {
            console.log('You screwed up...');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT * FROM departments`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startApp()
        })
};

const viewRoles = () => {
    (function(err, res) {
        if (err) {
            console.log('You screwed up AGAIN...');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT roles.id, roles.title, roles.salary, roles.department_id FROM roles`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startApp()
        })
};

const viewEmployees = () => {
    (function(err, res) {
        if (err) {
            console.log('You are bad at this...');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT employees.id, employees.first_name, employees.last_name, departments.name, roles.title, roles.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id;`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startApp()
        })
};

const addDepartment = () => {
    (function(err, res) {
        if (err) {
            console.log('Seriously. Quite bad...');
            console.dir(err);
            return;
        }
        console.log(res)
    })