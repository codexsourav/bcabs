import { toast } from "react-toastify";
import { IOneWayProvider } from "../provider/trips/OneWayProvider";
import { ILocalProvider } from "../provider/trips/LocalProvider";
import { IAirportProvider } from "../provider/trips/AirportProvider";
import { IRoundTripProvider } from "../provider/trips/RoundTripProvider";
import { areAllValuesPresent } from "../../utils/mapOptons";

export const validateOneWayError = (oneway: IOneWayProvider): boolean | string => {
    if (oneway.from.trim().length == 0) {
        toast.error("Select From Location");
        return false;
    }
    if (oneway.to.trim().length == 0) {
        toast.error("Select To Location");
        return false;
    }
    if (oneway.date.trim().length == 0) {
        toast.error("Select Pickup Date");
        return false;
    }
    if (oneway.time.trim().length == 0) {
        toast.error("Select Pickup Time");
        return false;
    }
    return `/explore/oneway?from=${oneway.from}&to=${oneway.to}&date=${oneway.date}&time=${oneway.time}`;
}

export const validateLocalError = (local: ILocalProvider): boolean | string => {
    if (local.from.trim().length == 0) {
        toast.error("Select From Location");
        return false;
    }
    if (local.date.trim().length == 0) {
        toast.error("Select Pickup Date");
        return false;
    }
    if (local.time.trim().length == 0) {
        toast.error("Select Pickup Time");
        return false;
    }
    return `/explore/local?from=${local.from}&date=${local.date}&time=${local.time}`;
}

export const validateRoundTripError = (airport: IRoundTripProvider): boolean | string => {
    if (airport.from.trim().length == 0) {
        toast.error("Select From Location");
        return false;
    }
    if (airport.to[0].trim().length == 0) {
        toast.error("Select To Location");
        return false;
    }
    if (!areAllValuesPresent(airport.to)) {
        toast.error("Please Add All To Locations");
        return false;
    }
    if (airport.date.trim().length == 0) {
        toast.error("Select Pickup Date");
        return false;
    }
    if (airport.time.trim().length == 0) {
        toast.error("Select Pickup Time");
        return false;
    }
    return `/explore/roundtrip?from=${airport.from}&to=${airport.to.length == 1 ? airport.to[0] : airport.to.join("||")}&date=${airport.date}&time=${airport.time}`;
}


export const validateAirportError = (airport: IAirportProvider): boolean | string => {
    const trip = airport.type;
    if (airport.airport.trim().length == 0) {
        toast.error("Select Airport Name");
        return false;
    }
    if (airport.location.trim().length == 0) {
        if (trip == 0) {
            toast.error("Select Your Pickup Address");
        } else {
            toast.error("Select Your Drop Address");
        }
        return false;
    }
    if (airport.date.trim().length == 0) {
        toast.error("Select Pickup Date");
        return false;
    }
    if (airport.time.trim().length == 0) {
        toast.error("Select Pickup Time");
        return false;
    }
    return `/explore/airport?trip=${airport.type}&airport=${airport.airport}&location=${airport.location}&date=${airport.date}&time=${airport.time}`;
}

