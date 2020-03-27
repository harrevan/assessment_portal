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
    //display student name
    document.getElementById("student_heading").innerText = "Enter assessment scores for " + name;
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

    //AJAX GET
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var assessment_data = JSON.parse(this.responseText);
            console.log("Assessment[0] = " + assessment_data[0].assessment_title);
         //   var assessments = JSON.parse(this.responseText);
          //  console.log("ASSESSMENTS: " + assessments);
           // displayAssessments(assessments); 
        }
    };
    xhttp.open("GET", "/student_table_data?student=" + student_id + "&assess_period=" + assessment_period, + "&subject=" + subject, true);
    xhttp.send();      
}