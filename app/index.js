import clock from "clock";
import * as document from "document";
import { activityHandler } from "./activity";
import { batteryHandler } from "./battery";
import { heartRateHandler } from "./hrm";
import { timeDayDateHandler } from "./timeDayDate";

clock.granularity = "minutes"; // seconds, minutes, hours

clock.ontick = (evt) => {
    timeDayDateHandler(evt, clockCallback)
    activityHandler(activityCallback)
    heartRateHandler(heartRateCallback)
    batteryHandler(batteryCallback)
};

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


function setElementText(id, value) {
    let element = document.getElementById(id);
    element.text = value;
}

function setElementIcon(id, value) {
    let element = document.getElementById(id);
    element.href = value;
}