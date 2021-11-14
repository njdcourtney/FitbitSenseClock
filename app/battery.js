import { battery } from "power";

export function batteryHandler(callback) {
    callback({percentage: battery.chargeLevel, chargingStatus: battery.charging})
}