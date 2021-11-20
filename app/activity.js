import { me as appbit } from "appbit";
import { today } from "user-activity";
import { setActivity } from "./ui.js";

// Set up default variables
let steps = '--'
let calories = '---'

export function updateActivity() {
    // Update the data if we have permission
    if (appbit.permissions.granted("access_activity")) {
        steps =  today.adjusted.steps,
        calories = today.adjusted.calories
    }
    // Return the data to the callback function
    setActivity({steps: steps, calories: calories});
  }
