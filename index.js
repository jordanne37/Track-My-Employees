const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const cTable = require("console.table");
const PORT = process.env.PORT || 3306;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connection database
const db = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "Jimmy2021!",
    database: "trackerdb",
},
    console.log("connected to the database")
);

db.connect((err) => {
    if (err) throw err;
    startApp();
});
// starts application with a list of choices to pick from
startApp = () => {
    inquirer.prompt([
        {
            name: "getStarted",
            type: "rawlist",
            message: "Welcome to the employee tracker program. What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit program"]
        }
    ]).then((response) => {
        switch(response.getStarted) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all employees":
                viewAllEmployees();
                break;
            case 'Add a department':
                addADepartment();
                break;
            case 'Add a role':
                addARole();
                break;
            case 'Add an employee':
                addAnEmployee();
                break;
            case 'Update employee\'s role':
                updateEmployeeRole();
                break;
            case "Exit program":
                Connection.ends();
                console.log("\n Program has ended. Thanks for using! \n");
                return;
            default:
                break;
        }
    })
}
// shows all departments when prompted
viewAllDepartments = () => {
    db.query("SELECT * FROM department ORDER BY id ASC;" , (err,res) =>{
        if (err) throw err;
        console.table("\n", res, "\n");
        startApp();
    })
};
// shows all roles when prompted
viewAllRoles = () => {
    db.query(`SELECT * FROM role ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        startApp();
    })
};
// shows all employees when prompted

viewAllEmployees = () => {
    db.query(`SELECT * FROM employee ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        startApp();
    })
};

// can add department, roles, employees when prompted
addADepartment = () => {
    inquirer.prompt([
        {
        name: 'newDept',
        type: 'input',
        message: 'What is the name of the department you are adding?'   
        }
    ]).then((response) => {
        db.query(`INSERT INTO department SET ?`, 
        {
            department_name: response.newDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.newDept} successfully added! \n`);
            startApp();
        })
    })
};

addARole = () => {
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.department_name, value: department.department_id }));
        inquirer.prompt([
            {
            name: 'title',
            type: 'input',
            message: 'What is the name of the role you want to add?'   
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of this role?'   
            },
            {
            name: 'deptName',
            type: 'list',
            message: 'Which department do you want to add the new role to?',
            choices: departments
            },
        ]).then((response) => {
            db.query(`INSERT INTO role SET ?`, 
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${response.title} successfully added! \n`);
                startApp();
            })
        })
    })
};

addAnEmployee = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => (role.title));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => (employee.first_name + ' ' + employee.last_name));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the new employee\'s first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the new employee\'s last name?'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'What is the new employee\'s title?',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: 'Who is the new employee\'s manager?',
                    choices: employees
                }
            ]).then((response) => {
                db.query(`INSERT INTO employee SET ?`, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                }, 
                (err, res) => {
                    if (err) throw err;
                })
                db.query(`INSERT INTO role SET ?`, 
                {
                    department_id: response.dept,
                }, 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n ${response.firstName} ${response.lastName} successfully added! \n`);
                    startApp();
                })
            })
        })
    })
};

// can update a current employees information
updateEmployeeRole = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'rawlist',
                    message: 'What should the employee\'s new role be?',
                    choices: roles
                },
            ]).then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        employee_id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n Successfully updated! \n`);
                    startApp();
                })
            })
        })
    })
}


