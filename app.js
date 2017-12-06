  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnz7InxU8rTVVqbxJPq6uG7CEaRcFfAfA",
    authDomain: "train-scheduler-37739.firebaseapp.com",
    databaseURL: "https://train-scheduler-37739.firebaseio.com",
    projectId: "train-scheduler-37739",
    storageBucket: "",
    messagingSenderId: "920859170900"
  };
  firebase.initializeApp(config);

  var database = firebase.database();  

  $("#submit-button").on('click', function (event) { 
      event.preventDefault();

      let trainName = $("#train-name").val().trim();
      let destination = $("#destination-input").val().trim();
      let firstTrainTime = $("#first-train-time").val().trim();
      let frequency = $("#frequency-input").val().trim();

      console.log(trainName)

    // ================  Create newTrain obj to hold variables declared above ============================
      let newTrain = {
          name: trainName,
          dest: destination,
          firstTime: firstTrainTime,
          freq: frequency,
      }

    // =========  Push the new train to the Firebase database
      database.ref().push(newTrain);


    //============ Clear the input boxes ===============================
    $("#train-name").val("");
    $("#destination-input").val("");
    $("#first-train-time").val("");
    $("#frequency-input").val("");

   })



    // Create Firebase event to add train to the database and a row in html

    database.ref().on("child_added", function (childSnapshot) { 
        console.log(childSnapshot.val());

        let addedTrain = childSnapshot.val();
        
        let newTrainName = addedTrain.name;
        let newTrainFreq = addedTrain.freq;
        let newTrainFirstTime = addedTrain.firstTime;
        let newTrainDest = addedTrain.dest;

        // first time (pushed back one year)
        let firstTimeConverted = moment(newTrainFirstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Get Current Time
        let currentTime = moment();

        // difference between the two times
        var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("Difference in time: " + timeDiff);

        // Time apart (remainder)
        let tRemainder = timeDiff % newTrainFreq;
        console.log(tRemainder);

        // Minutes until train
        let tMinutesTillTrain = newTrainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        let nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDest + "</td><td>" +  newTrainFreq + "</td> <td>" +  moment(nextTrain).format("hh:mm") + "</td><td>" +  tMinutesTillTrain + "</td></tr>");



     })