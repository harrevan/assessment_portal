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

function calculateRate(type, weight){
	if(type == "Letters - Stamped"){
		if(weight > 0 && weight <= 1){
			return 0.55;
		}
		else if(weight > 1 && weight <= 2){
			return 0.70;
		}
		else if(weight > 2 && weight <= 3){
			return 0.85;
		}
		else if(weight > 3 && weight <= 3.5){
			return 1.00;
		}
	}
	if(type == "Letters - Metered"){
		if(weight > 0 && weight <= 1){
			return 0.50;
		}
		else if(weight > 1 && weight <= 2){
			return 0.65;
		}
		else if(weight > 2 && weight <= 3){
			return 0.80;
		}
		else if(weight > 3 && weight <= 3.5){
			return 0.95;
		}		
	}
	if (type == "Large Envelopes - Flats"){
		if(weight > 0 && weight <= 1){
			return 1.00;
		}
		else if(weight > 1 && weight <= 2){
			return 1.20;
		}
		else if(weight > 2 && weight <= 3){
			return 1.40;
		}
		else if(weight > 3 && weight <= 4){
			return 1.60;
		}	
		else if(weight > 4 && weight <= 5){
			return 1.80;
		}
		else if(weight > 5 && weight <= 6){
			return 2.00;
		}
		else if(weight > 6 && weight <= 7){
			return 2.20;
		}
		else if(weight > 7 && weight <= 8){
			return 2.40;
		}
		else if(weight > 8 && weight <= 9){
			return 2.60;
		}
		else if(weight > 9 && weight <= 10){
			return 2.80;
		}
		else if(weight > 10 && weight <= 11){
			return 3.00;
		}
		else if(weight > 11 && weight <= 12){
			return 3.20;
		}
		else if(weight > 12 && weight <= 13){
			return 3.40;
		}									
	}
	if(type == "Package Service - Retail"){
		var array = [];
		var base1 = 3.80;
		var base2 = 4.60;
		var base3 = 5.30;
		var base4 = 5.90;
		var counter = 0.05;
		if(weight > 0 && weight <= 4){
			for(var i = 1; i < 10; i++){
				if(i <= 2)
				{
					array[i] = base1;
				}
				else if(i < 8){
					array[i] = base1 + counter;
					counter += 0.05;
				}
				else{
					array[i] = 4.20;
				}
			}
		}
		else if(weight > 4 && weight <= 8){
			for(var i = 1; i < 10; i++){
				if(i <= 2)
				{
					array[i] = base2;
				}
				else if(i < 7){
					array[i] = base2 + counter;
					counter += 0.05;
				}
				else if(i == 7)
				{
					array[i] = 4.90;
				}
				else{
					array[i] = 5.00;
				}
			}
		}
		else if(weight > 8 && weight <= 12){
			for(var i = 1; i < 10; i++){
				if(i <= 2)
				{
					array[i] = base3;
				}
				else if(i < 7){
					array[i] = base3 + counter;
					counter += 0.05;
				}
				else if(i == 7)
				{
					array[i] = 5.65;
				}
				else{
					array[i] = 5.75;
				}
			}			

		}
		else if(weight > 12)
		{
			for(var i = 1; i < 10; i++){
				if(i <= 2)
				{
					array[i] = base4;
				}
				else if(i < 6){
					array[i] = base4 + counter;
					counter += 0.10;
				}
				else if(i == 6)
				{
					array[i] = 6.20;
				}
				else if (i == 7){
					array[i] = 6.40;
				}
				else{
					array[i] = 6.50;
				}
			}			
		}
		return array;
	}
}
