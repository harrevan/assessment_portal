 function displayStudents(time) {
    var classTime = time;
    console.log(classTime);
    //AJAX GET
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var studentName = JSON.parse(this.responseText);
            console.log(this.responseText);
            console.log(studentName[0].upper);

            createList(classTime, studentName);
        }
    };
    xhttp.open("GET", "/students?time=" + classTime, true);
    xhttp.send();
}

function createList(time, studentName){
    	// Clear any existing content first
    document.getElementById("student_list").innerHTML = "";
  	var title = document.createElement("H1");
  	title.innerHTML = time + " Students";
  	document.getElementById("student_list").appendChild(title);
  	for(var i  = 0; i < studentName.length; i++){
        var id = studentName[i].student_id;
        var name = studentName[i].upper;
    		var but = document.createElement("BUTTON");
    		but.setAttribute("id", "student" + id);
    		but.className = "list-group-item list-group-item-action";
    		but.innerHTML = name;
        but.value = id;
        but.onclick = function(){ prepareStudentData(this.value, this.innerHTML);};        
    		document.getElementById("student_list").appendChild(but);
	}
}

function getAssessmentSelectOptions(unit, type){
    if(unit != 0 && type != 0){
        var assess_unit = unit;
        var assess_type = type;
        console.log(unit + " " + type);
        //AJAX GET
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var assessments = JSON.parse(this.responseText);
                console.log("ASSESSMENTS: " + assessments);
                displayAssessments(assessments); 
            }
        };
        xhttp.open("GET", "/assess_select_options?unit=" + unit + "&type=" + type, true);
        xhttp.send();  

    }
}  

function displayAssessments(assessments){
    //Clear options first
    document.getElementById("assess_id").innerHTML = "";
    var sel = document.getElementById("assess_id");
    for(var i = 0; i < assessments.length; i++){
        //sel.options[sel.options.length] = new Option(assessments[i].assessment_title,assessments[i].assessment_id);
         //add options from query
        var option = document.createElement("option");
        console.log(assessments[i].assessment_title + "-" + assessments[i].assessment_id);
        option.text = assessments[i].assessment_title;
        option.value = assessments[i].assessment_id;
        sel.appendChild(option);     
    }
}

function prepareStudentData(id, name){
    //Hold student id in hidden input field.
    var student = document.getElementById("student_name"); 
    student.value = id;

    //display student name in headers
    document.getElementById("student_heading").innerText = "Enter assessment scores for " + name;
    document.getElementById("stud_header").innerText = name + "'s Data";

    //display data table
    displayStudentData();
}

function enterStudentData(){
    var student_id = document.getElementById("student_name").value;
    var assessment_id = document.getElementById("assess_id").value;
    var assess_score = document.getElementById("score_id").value;
    var correct_answers = document.getElementById("answ_id").value;
    console.log("Funct: enterStudentData: student_id = " + student_id + " assessment_id = " + assessment_id + " assess_score= " + assess_score + " Answers= " + correct_answers);

    //AJAX Post
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var message = this.responseText;
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "/enter_scores", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("student=" + student_id + "&assessment=" + assessment_id +"&score=" + assess_score + "&answers=" + correct_answers);
}

function displayStudentData(){
    var student_id = document.getElementById("student_name").value;
    var assessment_period = document.getElementById("assessment_list").value;
    var subject = document.getElementById("subject_list").value;
    console.log("displayStudentData " + "s_id = " + student_id + " assess = " + assessment_period + " subject = " + subject);

    //AJAX GET
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var assessment_data = JSON.parse(this.responseText);
            var table = document.getElementById("stud_table");

            //Clear existing table rows
            while(table.rows.length > 1){
                table.deleteRow(1);
            }

            for(var i = 0; i < assessment_data.length; i++){
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = assessment_data[i].assessment_title;
                cell2.innerHTML = assessment_data[i].score;
                cell3.innerHTML = assessment_data[i].correct_answers;
            }
        }
    };
    xhttp.open("GET", "/student_table_data?student=" + student_id + "&assess_period=" + assessment_period + "&subject=" + subject, true);
    xhttp.send();      
}

function displayClassData() {
    var time = document.getElementById("class_time").value;
    var assessment_period = document.getElementById("assessment_list").value;
    var subject = document.getElementById("subject_list").value;

    //AJAX GET
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var class_data = JSON.parse(this.responseText);
           var table = document.getElementById("class_table");

           // Clear existing table rows
           while(table.rows.length > 1){
            table.deleteRow(1);
            }

           var numAssessments = document.getElementById("assess_id").length;

           // score totals
           var mtTotal = 0;
           var ntTotal = 0;
           var btTotal = 0;

           //display class table
           for(var i = 0; i < numAssessments; i++){
                var row = table.insertRow(i+1);
                // td cells
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = document.getElementById("assess_id")[i].value;

                console.log("I = " + i + " CELL1 = " + class_data[i].assessment_title + " ID = " + document.getElementById("assess_id")[i].value);

                for(var j = 0; j < class_data.length; j++){
                    console.log("Query title: " + class_data[j].assessment_title);
                    console.log("Element title: " + document.getElementById("assess_id")[i].text);
                    if(class_data[j].assessment_title == document.getElementById("assess_id")[i].text){
                        console.log("Assessment value: " + document.getElementById("assess_id")[i].text);
                        if(class_data[j].score == "MT"){
                            mtTotal += parseInt(class_data[j].count,10);
                        }
                        if(class_data[j].score == "NT"){
                            ntTotal += parseInt(class_data[j].count,10);
                        }
                        if(class_data[j].score == "BT"){
                            btTotal += parseInt(class_data[j].count,10);
                        }
                    }  
                }
                console.log("MT total = " + mtTotal);
                cell2.innerHTML = mtTotal;
                cell3.innerHTML = ntTotal;
                cell4.innerHTML = btTotal;
           }
        }
    };
    xhttp.open("GET", "/class_data?time=" + time + "&assess_period=" + assessment_period + "&subject=" + subject, true);
    xhttp.send();  
}

function setTime(time){
    document.getElementById("class_time").value = time;
}