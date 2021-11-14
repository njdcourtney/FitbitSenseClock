import clock from "clock";
import * as document from "document";
import { timeDayDateHandler } from "./timeDayDate";
import { activityHandler } from "./activity";
import { heartRateHandler } from "./hrm";

clock.granularity = "seconds"; // seconds, minutes, hours

clock.ontick = (evt) => {
    timeDayDateHandler(evt, clockCallback)
    activityHandler(activityCallback)
    heartRateHandler(heartRateCallback)
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
    console.log(JSON.stringify(data, null, 4))
    setElementText("heartRateText", data.heartRate );
}

function setElementText(id, value) {
    let element = document.getElementById(id);
    element.text = value;
}