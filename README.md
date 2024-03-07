# CalmWatch

**Instructions for Usage**

Before running any applications, ensure the following packages are installed:
- node modules
- libsecret modules
- fetch (specifically node-fetch)
- keytar (had *a lot* of difficulty with this one - just ensure you have Python and some type of C++ framework installed and it should work)

__Steps__

1. Ensure the IP address in the server.js file is that of your own machine
2. Check the client code section of companion/index.js and ensure that the IP address is the same here as well
3. Ensure port number is set to 9090

4. Run the Unity application first and ensure that it runs with no compilation issues before continuing
5. Begin the server with 
```
node server.js
```
6. Connect the fitbit watch to same internet connection as the machine running the server and connect the companion app, ensuring it is in developer mode
7. In a separate terminal, begin the client code. This step is only needed when changes to the server or client code is made. Running it on a PC allows it to act as a intermediary buffer before getting it working on the app. Otherwise, the companionion app can work alone.
Start the companion code as such:
```
C:/User> npx fitbit-build
C:/User> npx fitbit
$fitbit> install
```

The companion code should start running and display
```
[hh:mm:ss] App: Current heart rate: ...                                                       (app/index.js: 24,3)
[hh:mm:ss] Companion: companion says: heart rate: ... time: "hh:mm:ss"                        ([native code]: 1,1)
```

The server should display
```
client connected
Recieved message: Hello server!
Recieved message: ...
...
```

The dashboard is operated using the API endpoints as desired, but should display real-time readings in the dyanmic graph and this should be seen in the Unity application. 

