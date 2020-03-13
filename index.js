const express = require('express')
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000

app.use(express.static("public"));
app.set("views","views");
app.set("view engine", "ejs");

app.get("/calculate", function(req,res){
    var mail_type = req.query.mail;
    var weight = req.query.wt;
    console.log(mail_type);
    console.log(weight);
    var rate = calculateRate(mail_type, weight);

    var params = {mail: mail_type, weight: weight, rate: rate};
    //var rounded = rate.toFixed(2);
    //console.log(rounded);

	res.render("results", params);
});

app.listen(PORT, function(){
	console.log('Listening on port 5000');
});

