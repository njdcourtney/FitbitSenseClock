import clock from "clock";
import * as document from "document";
import * as activity from "./activity";
import * as timeDayDate from "./timeDayDate";

clock.granularity = "minutes"; // seconds, minutes, hours

clock.ontick = (evt) => {
    setElementText("dayText", timeDayDate.getDay(evt.date));
    setElementText("timeText", timeDayDate.getTime(evt.date));
    setElementText("dateText", timeDayDate.getDate(evt.date));
    setElementText("stepsText", activity.getSteps() );
    setElementText("heartRateText", activity.getHeart() );
    setElementText("caloriesText", activity.getCalories() );
};

function setElementText(id, value) {
    const element = document.getElementById(id);
    element.text = value;
}