import { me as companion } from "companion";
import weather from "weather";
import * as SunCalc from 'suncalc'
import { geolocation } from "geolocation";
import * as messaging from "messaging";
import * as utils from '../common/utils'


/* ------- Messaging --------- */

// Send the environment data
function sendEnvData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    } else {
      console.error("Error: Connection is not open");
    }
}
  
// Listen for requests
messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data && evt.data.command === "envData") {
        getEnvData();
    }
});
  
// Log any errors
messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});


/* ------- Environment Data --------- */

async function getEnvData () {
    let sunshineData = await getSunTimes()
    let weatherData = await weather.getWeatherData()
    let envData = {
        sunrise: utils.formatTime(sunshineData.sunrise), 
        sunset:  utils.formatTime(sunshineData.sunset), 
        temp:    Math.floor(weatherData.locations[0].currentWeather.temperature) 
    }
    sendEnvData(envData);
}

// Wrap the getCurrentPosition async funtion in a Promise
let getCurrentLocation = () => {
    return new Promise( (resolve, reject) => {
            geolocation.getCurrentPosition( function(position) { resolve(position) });
    });
}

// Get the Sunset and Sunrise times for the current location
async function getSunTimes() {
    let position = await getCurrentLocation()
    let sunTimes = SunCalc.getTimes(new Date(), position.coords.latitude, position.coords.longitude);
    return sunTimes
}

