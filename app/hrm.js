import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";
import { setHeartRate } from './ui'

// Heart Rate default value and export function
let heartRate = '---';
export function updateHeartRate() {
    // Return the data to the callback function
    setHeartRate({heartRate: heartRate});
}

// Set up the heart rate sensor
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
            body.present ? hrm.start() : hrm.stop();
        });
        body.start();
    };
    // Start the sensor
    hrm.start();
}

