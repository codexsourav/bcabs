// @ts-check
import { createAirportTmpBooking } from "../db/models/booking/airportBooking";
import { createLocalTmpBooking } from "../db/models/booking/localBooking";
import { createOneWayTmpBooking } from "../db/models/booking/onewayBooking";
import { createRoundTripTmpBooking } from "../db/models/booking/roundTripBooking";
import { isValidEmail } from "./validate"
/**
 * Generates a random string of specified length.
 * @param {number} length The length of the random string.
 * @returns {string} The random string.
 */
export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

/**
 * Generates a random booking ID with specified format.
 * @returns {string} The random booking ID.
 */
export function generateBookingId() {
    const prefix = "BABAG";
    const number = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    const middle = generateRandomString(2); // Generates a random string of length 2
    return `${prefix}${number}${middle}`;
}



export const createTmpOrder = async (type, data) => {
    try {
        switch (type) {
            case "oneway":
                return await createOneWayTmpBooking(data);
            case "local":
                return await createLocalTmpBooking(data);
            case "airport":
                return await createAirportTmpBooking(data);
            case "roundtrip":
                return await createRoundTripTmpBooking(data);
            default:
                throw new Error("Invalid Trip type")
        }
    } catch (error) {
        throw error;
    }
}

export const validateBookingData = (data) => {
    if (!data.name) {
        return "Please Enter Your Name";
    } else if (!data.email) {
        return "Please Enter Your Email ID";
    } else if (!isValidEmail(data.email)) {
        return "Invalid Email Id";
    } else if (!data.mobile) {
        return "Enter Your Mobile Number";
    } else if (data.mobile.length < 10) {
        return "Invalid Mobile Number";
    } else if (!data.tripInfo) {
        return "Please provide trip information";
    } else if (!data.pickupInfo) {
        return "Please provide pickup information";
    }
    return true;
}