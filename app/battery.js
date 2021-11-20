import { battery } from "power";
import { setBattery } from './ui';

export function updateBattery() {
    setBattery({percentage: battery.chargeLevel, chargingStatus: battery.charging})
}