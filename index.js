const express = require("express");
const { default: inquirer } = require("inquirer");

const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connectin database
const db = mysql.createConnections(
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

viewAllDepartments = () => {
    Connection.query("SELECT * FROM department ORDER BY department_id ASC;" , (err,res) =>{
        if (err) throw err;
        console.table("\n", res, "\n");
        startApp();
    })
};

// created department
app.post("/createdepartment", (req,res) =>{
    let sql =
    "CREATE TABLE department(id INT PRIMARY KEY, name VARCHAR(30))";

    db.query(sql,(err) =>{
        if(err){
            throw err;
        }
        res.send("department table made")
    });
});


// create role
app.post("/createrole", (req,res) =>{
    let sql =
    "CREATE TABLE role(id INT PRIMARY KEY, title VARCHAR(30), salary DECIMAL, department_id INT)";

    db.query(sql,(err) =>{
        if(err){
            throw err;
        }
        res.send("role table made")
    });
});



// created employee
app.post("/createemployee", (req,res) =>{
    const sql = "CREATE TABLE employee(id INT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)";

    db.query(sql,(err) =>{
        if(err){
            throw err;
        }
        res.send("Employee table made")
    });
});


app.get("")
