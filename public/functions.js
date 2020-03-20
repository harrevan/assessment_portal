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

      	//Create list of students
/*      	var but = document.createElement("BUTTON");
      	but.setAttribute("id", "students");
      	but.className = "list-group-item list-group-item-action";
      	document.getElementById("student_list").appendChild(ul);
      	for(var i  = 0; i < studentName.length; i++){
      		var li = document.createElement("LI");
      		li.innerHTML = studentName[i].upper;
      		console.log(studentName[i].upper);
      		document.getElementById("students").appendChild(li);
      	}*/
      	for(var i  = 0; i < studentName.length; i++){
      		var but = document.createElement("BUTTON");
      		but.setAttribute("id", "student" + i);
      		but.className = "list-group-item list-group-item-action";
      		but.innerHTML = studentName[i].upper;
      		document.getElementById("student_list").appendChild(but);
      	}
      }