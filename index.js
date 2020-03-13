const express = require('express')
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || "postgres://tjbpuwysthhmlc:1dea1ab38be85b6863689a93a677a5a64b6b2f47c87ee5ee6c048eb75fa4705c@ec2-52-23-14-156.compute-1.amazonaws.com:5432/dbvc8u7mi5mgsu";
const { Pool } = require('pg');
const pool = new Pool({ connectionString: connectionString });

app.use(express.static("public"));
app.set("views","views");
app.set("view engine", "ejs");

app.get("/assessment_portal", function(req,res){
    console.log(process.env.DATABASE_URL);
});

app.listen(PORT, function(){
	console.log('Listening on port 5000');
});

