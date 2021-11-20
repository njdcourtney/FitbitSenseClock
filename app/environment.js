import * as messaging from "messaging";
import { setEnvironment } from "./ui";

export function updateEnvironment() {
    sendMessage( {command: 'envData' } )
}

/* ------- MESSAGING --------- */
export function sendMessage (message) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send( message );
    }
  }

messaging.peerSocket.addEventListener("open", (evt) => {
    updateEnvironment()
});

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    setEnvironment(evt.data);
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});




