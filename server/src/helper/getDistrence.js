// https://maps.googleapis.com/maps/api/distancematrix/json?destinations=New%20York%20City%2C%20NY&origins=Washington%2C%20DC%7CBoston&units=imperial&key=AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40
// @ts-check
/**
 * @param {string} from
 * @param {string} to
 */

import { DistanceModel } from "../db/models/places/distanceSchema";
export const googleApiKey = 'AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40';

export const getDistance = async (/** @type {string} */ from, /** @type {string} */ to) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from}&destinations=${to}&units=imperial&key=${googleApiKey}`;
    var place;
    try {
        place = await DistanceModel.findOne({ from, to });
        if (!place) {
            const response = await fetch(url);
            const data = await response.json();
            console.table(data);
            if (data.status === 'OK') {
                const distanceText = data.rows[0].elements[0];
                if (distanceText.status == "OK") {
                    const savePlace = new DistanceModel({ from: from, to: to, distance: distanceText });
                    await savePlace.save();
                    place = { from, to, distance: distanceText };
                } else {
                    throw new Error(`${distanceText.status}`);
                }
            } else {
                throw new Error(`Error: ${data.status}`);
            }

        }
        return place;
    } catch (error) {
        throw error;
    }
};

export const getMultiDistance = async (/** @type {string[]} */ data) => {
    try {
        var total = 0;
        for (let i = 0; i < data.length - 1; i++) {
            const to = data[i];
            const dis = await getDistance(to, data[i + 1]);
            total = total + dis.distance.distance.value;
        }
        return total;
    } catch (error) {
        throw error;
    }
}


export const getDateDifference = (/** @type {any} */ dateString1, /** @type {any} */ dateString2) => {
    const parseDate = (/** @type {{ split: (arg0: string) => { (): any; new (): any; map: { (arg0: NumberConstructor): [any, any, any]; new (): any; }; }; }} */ dateString) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    };

    const date1 = parseDate(dateString1);
    const date2 = parseDate(dateString2);

    // @ts-ignore
    const diffInMilliseconds = Math.abs(date2 - date1);

    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    const millisecondsInOneHour = 1000 * 60 * 60;
    const millisecondsInOneMinute = 1000 * 60;

    const days = Math.floor(diffInMilliseconds / millisecondsInOneDay);
    const remainingMilliseconds = diffInMilliseconds % millisecondsInOneDay;

    const hours = Math.floor(remainingMilliseconds / millisecondsInOneHour);
    const remainingMillisecondsAfterHours = remainingMilliseconds % millisecondsInOneHour;

    const minutes = Math.floor(remainingMillisecondsAfterHours / millisecondsInOneMinute);

    return {
        milliseconds: diffInMilliseconds,
        days: days + 1,
        hours: hours,
        minutes: minutes
    };
};