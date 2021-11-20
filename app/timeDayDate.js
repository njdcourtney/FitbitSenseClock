import { setTimeDayDate } from './ui.js'
import * as utils from '../common/utils'


export function updateTimeDayDate(evt) {
  // Get the formatted strings
  let today = evt.date;
  let timeString = utils.formatTime(today);
  let dateString = formatDate(today);
  // Return the data to the callback function
  setTimeDayDate({time: timeString, date: dateString});
}


// Set up variables
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(date) {
  let dow = weekdays[date.getDay()]
  let dayStr = `${date.getDate()}`;
  let monStr = months[date.getMonth()];
  let suffix = "th";
  switch (date.getDate) {
      case 1:
      case 21:
      case 31:
          suffix = "st";
          break;
      case 2:
      case 22:
          suffix = "nd";
          break;
      case 3:
      case 23:
          suffix = "rd";
          break;
      default:
          suffix = "th";
          break;
  }
  return `${dow} ${monStr} ${dayStr}${suffix}`;
}