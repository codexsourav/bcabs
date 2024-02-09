// https://maps.googleapis.com/maps/api/distancematrix/json?destinations=New%20York%20City%2C%20NY&origins=Washington%2C%20DC%7CBoston&units=imperial&key=AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40
// @ts-check
/**
 * @param {string} from
 * @param {string} to
 */

import { DistanceModel } from "../db/models/places/distanceSchema";
export const googleApiKey = 'AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40';

export const getDistance = async (from, to) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from}&destinations=${to}&units=imperial&key=${googleApiKey}`;
    var place;
    try {
        place = await DistanceModel.findOne({ from, to });
        if (!place) {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                const distanceText = data.rows[0].elements[0];
                const savePlace = new DistanceModel({ from: from, to: to, distance: distanceText });
                await savePlace.save();
                place = { from, to, distance: distanceText };
            } else {
                throw new Error(`Error: ${data.status}`);
            }

        }
        return place;
    } catch (error) {
        throw error;
    }
};