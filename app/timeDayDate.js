import { setTimeDayDate } from './ui.js'
import * as utils from '../common/utils'


export function updateTimeDayDate(evt) {
  // Get the formatted strings
  let today = evt.date;
  let timeString = utils.formatTime(today);
  let dateString = utils.formatDate(today);
  // Return the data to the callback function
  setTimeDayDate({time: timeString, date: dateString});
}
