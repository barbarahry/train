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


function changeBg() {

  var rand = Math.floor(Math.random() * trainArr.length);
  var image = trainArr[rand];
  $(".bg").css("background-image", "url(" + image + ")");
};


// function deleteRecord(key){     
//   var refDB = firebase.database().ref('trains-9eee4/' + key);
//   refDB.remove()
//   .then(function() {
//     console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//     console.log("Remove failed: " + error.message)
//   });
// }





// Initialize Firebase


var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {

  event.preventDefault();

  changeBg();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStartTime = $("#start-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  //var fireKey = Object.keys(childSnapshot.val());
 // var key = database.ref().key();
  //var addDeleteBtn = $("#delete").val();
  //var addDeleteBtn = $("<input type='image' src='delete.png' name='image' id='delete'>").val();
  // Creates local "temporary" object for holding train data
  var newTrain = {
   
    name: trainName,
    destination: trainDestination,
    start: trainStartTime,
    frequency: trainFrequency,


  };
  
   
  
     
   
  

  // Uploads train data to the database
  database.ref().push(newTrain);


  // Logs everything to console
  console.log(newTrain);
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
database.ref().on("child_added", function (childSnapshot) {

  console.log(childSnapshot.val());
 $(".delete").empty();
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

  //var addDeleteBtn = $("<input type='image' src='delete.png' name='image' class='delete'>")
  var a = $("<input class='deleteBtn'>");
  a.attr("type", "image");
  a.attr("name", "image");
  a.attr("src", "delete.png");
 
  // Add each train's data into the table

  //var fireKey = Object.keys(childSnapshot.val());
  //var fireValue = Object.values(childSnapshot.val());
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + tMinutesTillTrain + "</td><td><span class='delete' >"+ "</span></td></tr>");
    $(".delete").append(a);

//delete1
$(".deleteBtn").on('click', function (event) {
  var rootRef = firebase.database().ref().child("trains-9eee4");
  var fireKey = Object.keys(childSnapshot.val());
  var $row = $(this).parents("tr").remove();
    
  var rowId = $row.data(fireKey);

  //it should remove the firebase object in here
 
  rootRef.child(rowId).remove()
  //after firebase confirmation, remove table row
  .then(function() {
    $row.remove();
  })
  //Catch errors
  .catch(function(error) {
    console.log('ERROR');
  });  
});


//delete2
  //   $(".deleteBtn").on('click', function (event) {
  //     $(this).parents("tr").remove();
  //     $(this).remove(newTrain);
  //     var refDB = firebase.database().ref('trains-9eee4/' + key);
  // refDB.remove();
      
  //   });
});


// $(".deleteBtn").on('click', function (event) {

// });