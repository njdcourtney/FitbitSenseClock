
function zeroPad(i) {
    return `${i < 10 ? "0" + i : i}`;
}

export function formatTime(date) {
    const hrs = zeroPad( date.getHours() );
    const mins = zeroPad( date.getMinutes() );
    return `${hrs}:${mins}`
}

// Set up variables
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(date) {
  let dow = weekdays[date.getDay()]
  let dayStr = `${date.getDate()}`;
  let monStr = months[date.getMonth()];
  let suffix = "--";
  switch (date.getDate() ) {
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
