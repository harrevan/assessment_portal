const express = require('express')
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || "postgres://tjbpuwysthhmlc:1dea1ab38be85b6863689a93a677a5a64b6b2f47c87ee5ee6c048eb75fa4705c@ec2-52-23-14-156.compute-1.amazonaws.com:5432/dbvc8u7mi5mgsu";
const { Pool } = require('pg');
const pool = new Pool({ connectionString: connectionString });



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/students', function(req,res){
    let classTime = req.query.time;
    console.log(classTime);
    var resRows;
    // Select students according to class time
    const sql = "SELECT upper(student_name), student_id FROM students WHERE class_time = '" + classTime + "'";
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        resRows = result.rows;
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(resRows);

        // Return JSON result
        res.json(resRows);
    });
});

app.get('/assess_select_options', function(req,res){
    let unit = req.query.unit;
    let type = req.query.type;
    console.log("DB params: " + unit + type);
    var resRows;
    // Select students according to class time
    const sql = "SELECT assessment_title, assessment_id FROM master_assessment WHERE assessment_period = '" + unit + "' AND subject = '" + type + "'";
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        resRows = result.rows;
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(resRows);

        // Return JSON result
        res.json(resRows);
    });
});

app.get('/student_table_data', function(req,res){
    let student = req.query.student;
    let subject = req.query.subject;
    let assess_period = req.query.assess_period; 
    var resRows;

    // Select assessment data according to student, subject, and assessment period
    const sql = "SELECT assessment_title, score, correct_answers FROM master_assessment" + 
                "INNER JOIN assessment_score ON master_assessment.assessment_id = assessment_score.assessment_id" + 
                "WHERE student_id = " + student + "AND subject = " + "'" + subject + "'" + "AND assessment_period = " + assess_period;
    console.log(sql);
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        resRows = result.rows;
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(resRows);

        // Return JSON result
        res.json(resRows);
    });
});

app.post('/enter_scores', function(req,res){
    let student = req.body.student;
    let assessment = req.body.assessment;
    let score = req.body.score;
    let answers = req.body.answers;

    console.log("DB score params: " + student + " " + assessment + " " + score + " " + answers);
    var resRows;
    // Select students according to class time

    const sql = "INSERT INTO assessment_score (student_id, assessment_id, score, correct_answers) VALUES (" 
                + student + ", " +  assessment + ", "  + "'" + score + "'"  + ", " + answers + ")" +
                " ON CONFLICT (student_id, assessment_id) DO UPDATE SET score = excluded.score, correct_answers = excluded.correct_answers";
    console.log(sql);
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in update: ")
            console.log(err);
        }
        //resRows = result.rows;
        // Log this to the console for debugging purposes.
        //console.log("Back from DB with result:");
        //console.log(resRows);

        // Return JSON result
        res.send("Score entered successfully!");
    });
});


