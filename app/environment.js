import * as messaging from "messaging";
import { setEnvironment } from "./ui";
import * as utils from '../common/utils'

// Define some variables
let envData = {
  temp: '---',
  sunrise: '---',
  sunset: '---'
}

// Update the UI elements
export function updateEnvironment() {
  setEnvironment( envData );
}

// Send the request to update the environement data
function requestEnvironmentData() {
  sendMessage( {command: 'envData' } )
}

// Store the environment data
function updateEnvironmentData(data){
  envData.temp = data.temp;
  envData.sunrise = data.sunrise;
  envData.sunset = data.sunset;
}

/* ------- MESSAGING --------- */
export function sendMessage (message) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send( message );
  }
}

messaging.peerSocket.addEventListener("open", (evt) => {
  requestEnvironmentData()
});

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    updateEnvironmentData(evt.data);
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});


// Fetch the environment data every 30 minutes
setInterval( () => { requestEnvironmentData() } , 30 * 1000 * 60 );
