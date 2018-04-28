

// Update schedule and clock every 15 seconds
var clockTimer = setInterval(refreshTable, 15000);
// Format current moment and update #station-clock
function refreshClock() {
    $("#station-clock").text(moment().format("hh:mm a"))
}
    
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCNKSmFxndc52U07nFBW8fTK8aar7_Ryg",
    authDomain: "anytimetrain-33772.firebaseapp.com",
    databaseURL: "https://anytimetrain-33772.firebaseio.com",
    projectId: "anytimetrain-33772",
    storageBucket: "",
    messagingSenderId: "110214044280"
};
firebase.initializeApp(config);
// Get a reference to the database service

var database = firebase.database();
// console.log(database)

// Whenever a user clicks the submit Add Employee button
$("form").on("submit", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    // Get the input values
    var trainName = $("#InputName").val().trim();
    var destination = $("#InputDestination").val().trim();
    var fristTime = parseInt(moment($("#InputFirstTime").val().trim(), "kk:mm").format("x"));
    var firstTimeConverted = (moment($("#InputFirstTime").val().trim(), "HH:mm").subtract(1, "years"));
    var frequency = $("#InputTime").val().trim();
    console.log("first time  " + firstTimeConverted)
    

    //-----------------------------------------------------------------------------------
    
    // console.log(trainName, destination, frequency,nextTrain)
    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTime: fristTime
        // nextTrain: nextTrain
        // tMinutesTillTrain: tMinutesTillTrain
    });

    // Clear text boxes
    $("#InputName").val("");
    $("#InputDestination").val("");
    $("#InputFirstTime").val("");
    $("#InputTime").val("");
    $("#InputName").focus();
})


    
// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("child_added", function (snapshot) {
     displayTrain(snapshot)
   
});

// Refresh the train table 
function refreshTable() {
    // Refresh the clock
    refreshClock();

    // Clear the table
    $("#train-table-body").empty();

    // Query dbref (order by pkey, no limit) and display each train
    database.ref().on("child_added", function (snapshot) {
        displayTrain(snapshot);
        
    })
}
function displayTrain(snapshot) {
    var trainRec = snapshot.val();
    // console.log(trainRec)
    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var firstTrain = trainRec.firstTime;

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    var frequency = trainRec.frequency;
    //  var freqMill = (frequency * 10000000)

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    // console.log(tRemainder);

    // Table Columns: <id=pkey hidden>, Name, Role, Start, Months(computed), Rate, YTD(computed)
    $("#train-table-body").append(`<tr id="${snapshot.key}"><td>${trainRec.trainName}</td><td>${trainRec.destination}</td><td>${trainRec.frequency}</td><td>${nextTrain}</td><td>${tMinutesTillTrain}</td></tr>`)
    }