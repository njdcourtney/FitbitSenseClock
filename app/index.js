import clock from "clock";
import * as document from "document";
import { activityHandler } from "./activity";
import { batteryHandler } from "./battery";
import { heartRateHandler } from "./hrm";
import { timeDayDateHandler } from "./timeDayDate";
import * as messaging from "messaging";

// Set up the Clock
clock.granularity = "minutes"; // seconds, minutes, hours

// Update Screen on Clock tick
clock.ontick = (evt) => {
    timeDayDateHandler(evt, clockCallback)
    activityHandler(activityCallback)
    heartRateHandler(heartRateCallback)
    batteryHandler(batteryCallback)
};

// Fetch the environment data every 30 minutes
setInterval(getEnvData, 30 * 1000 * 60);

/* --------- CLOCK ---------- */
function clockCallback(data) {
    setElementText("dayText", data.day);
    setElementText("timeText", data.time);
    setElementText("dateText", data.date);
}

/* ------- ACTIVITY --------- */
function activityCallback(data) {
    setElementText("stepsText", data.steps );
    setElementText("caloriesText", data.calories );
}

/* ------- HEART RATE --------- */
function heartRateCallback(data) {
    setElementText("heartRateText", data.heartRate );
}

/* ------- BATTERY --------- */
function batteryCallback(data) {
    let value = `${data.percentage}%`;
    let icon = "battery-full.png"
    if (data.chargingStatus) {
        icon = "battery-charging.png";
    } else if (data.percentage <= 25) {
        icon = "battery-low.png";
    } else if (data.percentage <= 50) {
        icon = "battery-50.png";
    } else if (data.percentage <= 75) {
        icon = "battery-75.png";
    } else {
        icon = "battery-full.png";
    }
    setElementIcon("batteryIcon", icon);
    setElementText("batteryValue", value);
}

/* ------- ENVIRONMENT --------- */
function environmentCallback(data) {
    setElementText("tempText", data.temp );
    setElementText("sunRiseText", data.sunrise );
    setElementText("sunSetText", data.sunset );
}

/* ------- UI UTILITIES --------- */
function setElementText(id, value) {
    let element = document.getElementById(id);
    element.text = value;
}

function setElementIcon(id, value) {
    let element = document.getElementById(id);
    element.href = value;
}


/* ------- MESSAGING --------- */
function getEnvData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: "envData"
    });
  }
}

messaging.peerSocket.addEventListener("open", (evt) => {
    getEnvData()
});

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    environmentCallback(evt.data);
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

