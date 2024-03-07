////// SERVER HERE ///////

const WebSocket = require("ws");
const fetch = require('node-fetch');
const server = new WebSocket.Server({host:'10.247.69.215', port: 9090});


// Connection event handler
server.on("connection", function connection(ws) {
  console.log("client connected");

  ws.on("message", function incoming(message){
    console.log("Received message: %s", message)
    fetch(`http://localhost:8080/API/update_BPM/${message}`)
      /*.then(response => response.json())
      .then(json => console.log(json)) */
  })

});