import * as document from "document";

/* --------- CLOCK ---------- */
export function setTimeDayDate(data) {
    setElementText("timeText", data.time);
    setElementText("dateText", data.date);
}

/* ------- ACTIVITY --------- */
export function setActivity(data) {
    setElementText("stepsText", data.steps );
    setElementText("caloriesText", data.calories );
}

/* ------- HEART RATE --------- */
export function setHeartRate(data) {
    setElementText("heartRateText", data.heartRate );
}

/* ------- BATTERY --------- */
export function setBattery(data) {
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
export function setEnvironment(data) {
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
