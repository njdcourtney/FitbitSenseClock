
function zeroPad(i) {
    return `${i < 10 ? "0" + i : i}`;
}

export function formatTime(date) {
    const hrs = zeroPad( date.getHours() );
    const mins = zeroPad( date.getMinutes() );
    return `${hrs}:${mins}`
}

