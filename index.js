const express = require('express')
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000

app.use(express.static("public"));
app.set("views","views");
app.set("view engine", "ejs");



app.listen(PORT, function(){
	console.log('Listening on port 5000');
});

