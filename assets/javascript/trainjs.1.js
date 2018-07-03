 // Initialize Firebase

    var config = {
        apiKey: "AIzaSyDRZM9IjVkVJXKe2gc8prIcgWbdbNMij-I",
        authDomain: "trains-9eee4.firebaseapp.com",
        databaseURL: "https://trains-9eee4.firebaseio.com",
        projectId: "trains-9eee4",
        storageBucket: "trains-9eee4.appspot.com",
        messagingSenderId: "192112336154"
   
  };
  firebase.initializeApp(config);
//array
var trainArr = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
function changeBg(){

  var rand = Math.floor(Math.random() * trainArr.length);
  var image = trainArr[rand];
  console.log("IMAGE PICKED: " + image);
  console.log("OLD BACKGROUND: " + $(".bg").css("background-image"));
  $(".bg").css("background-image", "url(" + image + ")");
// for (i=0; i<trainArr.length; i++){
//   var gifImage = $("<img>");
//   gifImage.attr("src", "assets/images/"+trainArr[i]);
//   $(".bg").append(gifImage);
console.log("NEW BACKGROUND: " + $(".bg").css("background-image"));


};

// };
console.log("assets/images/2.jpg")

// Initialize Firebase


var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {

  event.preventDefault();
  changeBg();
  //changeBg();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStartTime = $("#start-input").val().trim();
  //var trainStartTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStartTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  //alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartTime);
  console.log(trainFrequency);

  // Prettify the employee start
//var trainStartPretty = moment.unix(trainStartTime).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
 // var empMonths = moment().diff(moment(empStart, "X"), "months");
 // console.log(empMonths);

  // Calculate the total billed rate
 //var empBilled = empMonths * empRate;
 // console.log(empBilled);

 // Assumptions
 var tFrequency = $("#frequency-input").val().trim();
 console.log(tFrequency);
 // Time is 3:30 AM
 var firstTime = $("#start-input").val();
 console.log(firstTime);
 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
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

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
