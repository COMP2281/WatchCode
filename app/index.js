// importing essential modules
import { HeartRateSensor } from "heart-rate";
import { me } from "appbit";
import * as messaging from "messaging";

// Fetch UI elements we will need to change
let document = require("document");
let hrLabel = document.getElementById("hrm");

// initialising messaging to companion app
// opening connection
messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("App ready to send to receive message");
});

// listening for errors
messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`ERROR: ${err.code} - ${err.message}`);
});

// Initialize the UI with some values
hrLabel.text = "--";

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values and log them to the console
  console.log("Current heart rate: " + hrm.heartRate);

  //write the heart rate to the clock face
  hrLabel.text = hrm.heartRate;

  //get the data and time data
  var date = new Date()
  var currentTime = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()

  //compose the data to be sent in a JSON format
  const data = {
    time: currentTime,
    heartRate: hrm.heartRate
  }

  //send data down if connected to companion
  if (messaging.peerSocket.readyState == messaging.peerSocket.OPEN){
    messaging.peerSocket.send(data);
  }

}

//disabling timeout

if (me.appTimeoutEnabled) {
  console.log("Timeout is enabled. We will now disable it");
}
me.appTimeoutEnabled = false;


// Begin monitoring the sensor
hrm.start();

