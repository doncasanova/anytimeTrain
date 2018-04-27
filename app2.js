




    
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

// Whenever a user clicks the submit Add Employee button
$("#submit-emp-btn").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get the input values
    var trainName = $("#InputName").val().trim();
    var destination = $("#InputDestination").val().trim();
    var fristTime = parseInt(moment($("#InputFirstTime").val().trim(), "kk:mm").format("x"));
    console.log("first time  " + fristTime)
    // var frequency = parseInt(moment($("#InputTime").val().trim(), "mm").format("x"));
    var frequency = $("#InputTime").val().trim();
    var freqMill = (frequency * 10000000)

    //-----------------------------------------------------------------------------------
    var fristTime = $("#InputFirstTime").val().trim();
    console.log("yes  "+firstTime)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log("first  " + firstTimeConverted);



    database.ref().push({
        trainName: trainName,
        destination: destination,
        fristTime: fristTime,
        frequency: freqMill,
        currentTime: currentTime,
        happend: happend
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

    var firstTime = "12:00"
   
    var trainRec = snapshot.val();
// var fristTime = $("#InputFirstTime").val().trim();
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log("first  " + firstTimeConverted);


    var currentTime = moment(currentTime).format(" hh:mm ")
    var test = moment(trainRec.happend).format(" hh:mm")
    // var currentTime = moment()
    var timeDifferance = (trainRec.fristTime - trainRec.frequency)
    var trainFirst = moment().diff(timeDifferance, 'hh:mm');
    var freqMill = (trainRec.frequency / 10000000)


    // Table Columns: <id=pkey hidden>, Name, Role, Start, Months(computed), Rate, YTD(computed)
    $("#train-table-body").append(`<tr id="${snapshot.key}"><td>${trainRec.trainName}</td><td>${trainRec.destination}</td><td>${freqMill}</td><td>${currentTime}</td><td>${test}</td></tr>`)

})
