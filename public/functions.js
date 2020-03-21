 function displayStudents(time) {
    var classTime = time;
    console.log(classTime);
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
    		var but = document.createElement("BUTTON");
    		but.setAttribute("id", "student" + studentName[i].student_id);
        but.onclick = function(){ alert(this.value);
        };
    		but.className = "list-group-item list-group-item-action";
    		but.innerHTML = studentName[i].upper;
        but.value = studentName[i].upper;
    		document.getElementById("student_list").appendChild(but);
	}
}

function getAssessmentSelectOptions(unit, type){
    if(unit != 0 && type != 0){
        var assess_unit = unit;
        var assess_type = type;
        console.log(unit + " " + type);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var assessments = JSON.parse(this.responseText);
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
        // add options from query
        var option = document.createElement("option");
        option.text = assessments[i].assessment_title;
        option.value = assessments[i].assessment_id;
        sel.appendChild(option);     
    }

}

function displayStudentData(id){
    console.log("function called");
    document.getElementById("student_heading").innerText = "Enter Scores For " + document.getElementById(id);
}
