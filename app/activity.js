import { me as appbit } from "appbit";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";

// Get the Step information
export function getSteps() {
    let steps = '---'
    if (appbit.permissions.granted("access_activity")) {
        steps = today.adjusted.steps
    }
    return steps;
}

// Get the Calories information
export function getCalories() {
    let calories = '---'
    if (appbit.permissions.granted("access_activity")) {
        calories = today.adjusted.calories
    }
    return calories;
}

// Heart Rate
let heartRate = '---';

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    let hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => { heartRate = hrm.heartRate });
    
    // Stop sensor if display is off
    display.addEventListener("change", () => {
        // Automatically stop the sensor when the screen is off to conserve battery
        display.on ? hrm.start() : hrm.stop();
    });

    // Stop sensor if off wrist
    if (BodyPresenceSensor) {
        const body = new BodyPresenceSensor();
        body.addEventListener("reading", () => {
            if (!body.present) {
                hrm.stop();
            } else {
                hrm.start();
            }
        });
        body.start();
    };
    hrm.start();
}

export function getHeart() {
    return heartRate;
}