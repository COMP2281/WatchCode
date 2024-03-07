////// CLIENT CODE
/*
 * Entry point for the companion app
 */

// CODE BELOW IS FOR CONNECTING TO SERVER

//THE IP ADDRESSES IN THIS COMPANION CODE IS FOR THE SPECIFIC HEADSET 'VR CDS 05'
//TO USE THIS CODE FOR A DIFFERENT HEADSET, CHANGE THE IP ADDRESS IN LINE 12 AND LINE 

//start websocket connection
const socket = new WebSocket('ws://10.247.69.215:9090'); //change ip address to the current server address

let gotCalHR = false;
let k = 0;
let calHR = 0;

/*
//add event listeners
socket.addEventListener("open", onOpen)
socket.addEventListener("close", onClose)
socket.addEventListener("message", onMessage)


// Connection opened
function onOpen(evt) {
  console.log("Now sending message to server");
  socket.send('Hello Server!');
}
// Connection closed
function onClose(evt) {
  console.log("Disconnected");
}

// Message received
function onMessage(evt) {
  console.log(`MESSAGE: ${evt.data}`);
}
*/

///////////// COMPANION CODE

console.log("Companion code started");
import * as messaging from "messaging";

//open connection
messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Companion ready to send to receive message");
});

//listen for errors
messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`ERROR: ${err.code} - ${err.message}`);
});

//recieve data from fitbit. Data will always been in the same format, unless there's an error.
//print data to console and send down websocket to server
messaging.peerSocket.addEventListener("message", (evt) => {
  var heartRateData = JSON.stringify(evt.data["heartRate"])
  var time = JSON.stringify(evt.data["time"])
  console.log('companion says: heart rate: ' + heartRateData + " time: " + time);
  socket.send(heartRateData)
  const data = heartRateData
    const url = "http://10.249.14.236:8080/API/update_BPM/"+heartRateData
    let fetchInit = {method: 'GET'}
    fetch(url, fetchInit)
      .then(function(response) {
        if (response.ok) {
          response.text().then(text => console.log(`Server response: OK (${text})`))
        } else {
          response.text().then(text => console.log(`Server response: not OK (${text})`))
        }
      })
      .catch(function(err) {
        console.log(`fetch error (${err}).`)
      })
  
  } else{
    if (k < 5){
      calHR = calHR + evt.data["heartRate"];
      k = k + 1;
    }
    if (k==5){
      calHR = Math.floor(calHR /5)
      socket.send(calHR);
      gotCalHR = true;
    }
  }
})


