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
   })