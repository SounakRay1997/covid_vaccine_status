var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var body_parser = require('body-parser');
var sleep = require('sleep');

var app=express();

app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public")); //links our css file

var query = "SELECT COUNT(*) AS total FROM covid_vaccine_data";

var connection=mysql.createConnection({
	host : 'localhost',
	user : 'root',
    password: 'sounak1997',
    database: 'covid_data'
});

app.get("/", function(req, res){
	connection.query(query, function(err, results){
		if (err) res.send("No users information found");
		var count = results[0].total;
	    res.render('home', {count: count})
	});
});

app.post("/registration", function(req, res){
    var vaccine_details = {name: req.body.name, mobile_no: req.body.mobile_number, age:req.body.age, house_number:req.body.house_number, vaccine_name:req.body.vaccine_name, final_dose_date:req.body.final_dose_date};
    connection.query('INSERT INTO covid_vaccine_data SET ?', vaccine_details, function (error, results, fields){
       if(error) throw error;
	   res.redirect('/');
	});
});

app.post("/registered_individuals", function(req, res){
	var sql='SELECT * FROM covid_vaccine_data';
    connection.query(sql, function(error, results, fields){
        if(error) throw error;
        res.render('registered_individuals', {userData: results})
 	});
});

app.post("/delete_member", function(req, res){
	var sql='SELECT * FROM covid_vaccine_data';
    connection.query(sql, function(error, results, fields){
        if(error) throw error;
        res.render('registered_individuals', {userData: results})
 	});
});

app.listen(8080, function() {
    console.log("App listening on port 8080!");
});

//res.send("We have " +count+ " in our waitlist!")