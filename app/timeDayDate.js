import * as utils from '../common/utils'


export function timeDayDateHandler(evt, callback) {
    // Get the formatted strings
    let today = evt.date;
    let dayString = utils.formatDay(today);
    let timeString = utils.formatTime(today);
    let dateString = utils.formatDate(today);
    // Return the data to the callback function
    callback({day: dayString, time: timeString, date: dateString});
  }
