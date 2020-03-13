const express = require('express')
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || "postgres://tjbpuwysthhmlc:1dea1ab38be85b6863689a93a677a5a64b6b2f47c87ee5ee6c048eb75fa4705c@ec2-52-23-14-156.compute-1.amazonaws.com:5432/dbvc8u7mi5mgsu";
const { Pool } = require('pg');
const pool = new Pool({ connectionString: connectionString });

var sql = "SELECT * FROM students";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get("/assessment_portal", function(req,res){
    let studentName = req.query.student_name;
    console.log(process.env.DATABASE_URL);
    var resRows;

});


