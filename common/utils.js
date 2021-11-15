// Set up variables
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function zeroPad(i) {
    return `${i < 10 ? "0" + i : i}`;
}

export function formatDay(date) {
    return weekdays[date.getDay()]
}

export function formatTime(date) {
    const hrs = zeroPad( date.getHours() );
    const mins = zeroPad( date.getMinutes() );
    return `${hrs}:${mins}`
}


export function formatDate(date) {
    const dayStr = `${date.getDate()}`;
    const monStr = months[date.getMonth()];
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
    return `${monStr} ${dayStr}${suffix}`;
}