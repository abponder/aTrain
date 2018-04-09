


$(document).ready(function(){
    ///////////////////////////////////////////////////////////////////////////
    
    // Firebase Project
    // https://console.firebase.google.com/u/1/project/testx-57ddf/database/testx-57ddf/data/-L9be0sJN0SS6k-X_JnF
    var config = {
        //apiKey: "AIzaSyDtTemp8qRtH3nHP_BuI-mh1VKQEkJxbsQc",
        apiKey: "AIzaSyAh1_Frv9esK9TL2thmR4fmUmsFG3sxO_A",
        //authDomain: "project1-9f0e7.firebaseapp.com",
        authDomain: "testx-57ddf.firebaseapp.com",
        //databaseURL: "https://project1-9f0e7.firebaseio.com",
        databaseURL: "https://testx-57ddf.firebaseio.com",
        //projectId: "project1-9f0e7",
        projectId: "testx-57ddf",
        //storageBucket: "project1-9f0e7.appspot.com",
        storageBucket: "testx-57ddf.appspot.com",
        //messagingSenderId: "754382216001"
        messagingSenderId: "687554895822"


      };
      firebase.initializeApp(config);
    
      // Create a variable to reference the database.
      var database = firebase.database();
    
      $(document).on("click", ".submitButton", function(){
            event.preventDefault();
            //read the fields
            var name = $('#nameInput').val().trim();
            var destination = $('#destinationInput').val().trim();
            var firsttraintime = $('#firsttraintimeInput').val().trim();
            var frequency = $('#frequencyInput').val().trim();
            console.log(firsttraintime + " - " + frequency);


    
            //convert the startDate to miliseconds from jan 1, 1970
            //var startThen = Date.parse(startDate); 
    
            //calculate length of time in miliseconds
            //var timeDifference = currentTime - startThen;
    
            //convert the miliseconds to months
            //var monthsWorked = Math.round((timeDifference / [(1000*60*60*24*365.25)/12]));
    
            //calculate totalBilled
            //var totalBilled = monthsWorked * monthlyRate;
    
            //submit to database
            // Code for handling the push
            database.ref().push({
                name: name,
                destination: destination,
                firsttraintime: firsttraintime,
                frequency: frequency,
                //nextArrival: nextArrival,
                //minutesAway: minutesAway,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
    
          });
    
     // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
     database.ref().orderByChild("dateAdded").limitToLast(20).on("child_added", function(snapshot) {
    
            //Create a variable for snapshot.val()
            var trn = snapshot.val();    
        
        
        
            //calculate time
            //get curent time in milisecond from jan 1, 1970
            var currentTime = Date.now();

            // Assumptions
            var tFrequency = trn.frequency;

            // Time is 3:30 AM
            //var firstTime = "03:30";  
            var firstTime = trn.firsttraintime;
            console.log("trn 1st..." + trn.firsttraintime);

            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % tFrequency;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = tFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    
        //create table's <tobody>, adding class to <tobody>, constructing the table's <tr> and <td>
        var tabod = $('<tbody>');
        //tabod.addClass('employeeTable');
        tabod.addClass('trainTable');
        //tabod.append($("<tr>").html("<td>" + emp.name + "</td><td>" + emp.role + "</td><td>" + emp.startDate + "</td><td>" + emp.monthsWorked + "</td><td>" + emp.monthlyRate + "</td><td>" + emp.totalBilled + "</td></tr>"));
        tabod.append($("<tr>").html("<td>" + trn.name + "</td><td>" + trn.destination + "</td><td>" + trn.firsttraintime + "</td><td>" + trn.frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td></tr>"));


        //append the <tbody> to the table
        $('.table').append(tabod);
    
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    ///////// END OF DOCUMENT /////////////////
    });



// to open related pages if exist
    function OpenPortfolio() {

    urlval = "portfolio.html"
    newWin = window.open(urlval, 'newHWin');
    newWin.focus();
    }
    function OpenContact() {

        urlval = "contact.html"
        newWin = window.open(urlval, 'newHWin');
        newWin.focus();
    }
    function OpenAbout() {

        urlval = "index.html"
        newWin = window.open(urlval, 'newHWin');
        newWin.focus();
    }


// Start Clock Function

    function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    
    var time = setTimeout(function(){ startTime() }, 500);
    }
    function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
    }

// End Clock Function