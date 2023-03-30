const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnections({
    host: "localhost",
    user: "root",
    password: "funfun",
    database: "nodemysql",
});

db.connect((err)=>{
    if(err) {
        throw err;
    }

    console.log("Mysqlconnect");
});

const app = express();

app.get("/creatdb", (req,res) =>{
    let sql = "Create database";

    db.query(sql,(err) =>{
        if(err){
            throw err;
        }
        res.send("Database created");
    });
});

app.get("/createemployee", (req,res) =>{
    let sql =
    "CREATE TABLE employee(id INT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)";

    db.query(sql,(err) =>{
        if(err){
            throw err;
        }
        res.send("Employee table")
    });
});
