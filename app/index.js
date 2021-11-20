import clock from "clock";
import { updateActivity } from "./activity";
import { updateBattery } from "./battery";
import { updateHeartRate } from "./hrm";
import { updateTimeDayDate } from "./timeDayDate";
import { updateEnvironment } from "./environment";

import * as messaging from "messaging";

// Set up the Clock
clock.granularity = "minutes"; // seconds, minutes, hours

// Update Screen on Clock tick
clock.ontick = (evt) => {
    updateTimeDayDate(evt);
    updateActivity();
    updateHeartRate();
    updateBattery();
};

// Fetch the environment data every 30 minutes
setInterval( updateEnvironment() , 30 * 1000 * 60);
