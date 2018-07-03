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
  console.log("IMAGE PICKED: " + image);
  console.log("OLD BACKGROUND: " + $(".bg").css("background-image"));
  $(".bg").css("background-image", "url(" + image + ")");
  // for (i=0; i<trainArr.length; i++){
  //   var gifImage = $("<img>");
  //   gifImage.attr("src", "assets/images/"+trainArr[i]);
  //   $(".bg").append(gifImage);
  console.log("NEW BACKGROUND: " + $(".bg").css("background-image"));


};

 



console.log("assets/images/2.jpg")

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
//delete from database
function deleteRecord(){   
  var refDB = firebase.database().ref();
  refDB.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
}
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("value", function (childSnapshot) {

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
  
  var fireKey = Object.keys(childSnapshot.val());
  var fireValue = Object.values(childSnapshot.val());
for (i=0; i<fireKey.length; i++){
    console.log(fireValue);
    $("#train-table > tbody").append("<tr><td>" + fireValue[i].name + "</td><td>" + fireValue[i].destination + "</td><td>" +
    fireValue[i].frequency + "</td><td>" + tMinutesTillTrain + "</td><td><span class='delete'>" + "<a class='deleteBtn' data-type='image' data-id='"+fireKey[i]+"'>Delete</a></span></td></tr>");
    // $(".delete").append(a);

    
}
$(".deleteBtn").on('click', function (event) {
    console.log($(this).attr("data-id"))

    database.ref($(this).attr("data-id")).remove()

});
})
;




