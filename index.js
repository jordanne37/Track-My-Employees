const express = require("express");

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



// app.get("/creatdb", (req,res) =>{
//     let sql = "Create database";

//     db.query(sql,(err) =>{
//         if(err){
//             throw err;
//         }
//         res.send("Database created");
//     });
// });


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
