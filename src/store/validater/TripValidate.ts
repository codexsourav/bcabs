import { toast } from "react-toastify";
import { IOneWayProvider } from "../provider/trips/OneWayProvider";
import { ILocalProvider } from "../provider/trips/LocalProvider";
import { IAirportProvider } from "../provider/trips/AirportProvider";
import { IRoundTripProvider } from "../provider/trips/RoundTripProvider";
import { areAllValuesPresent } from "../../utils/mapOptons";
import { is_valid_drop_date } from "../../utils/helper";

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
    return `/explore/oneway?type=oneway&from=${oneway.from}&to=${oneway.to}&date=${oneway.date}&time=${oneway.time}`;
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
    return `/explore/local?type=local&from=${local.from}&date=${local.date}&time=${local.time}`;
}

export const validateRoundTripError = (roundtrip: IRoundTripProvider): boolean | string => {
    if (roundtrip.from.trim().length == 0) {
        toast.error("Select From Location");
        return false;
    }
    if (roundtrip.to[0].trim().length == 0) {
        toast.error("Select To Location");
        return false;
    }
    if (!areAllValuesPresent(roundtrip.to)) {
        toast.error("Please Add All To Locations");
        return false;
    }
    if (roundtrip.date.trim().length == 0) {
        toast.error("Select Pickup Date");
        return false;
    }
    if (roundtrip.returnDate.trim().length == 0) {
        toast.error("Select Return Date");
        return false;
    }
    if (is_valid_drop_date(roundtrip.date.trim(), roundtrip.returnDate.trim())) {
        toast.error("Return Date is Invalid");
        return false;
    }
    if (roundtrip.time.trim().length == 0) {
        toast.error("Select Pickup Time");
        return false;
    }
    return `/explore/roundtrip?type=roundtrip&from=${roundtrip.from}&to=${roundtrip.to.length == 1 ? roundtrip.to[0] : roundtrip.to.join("||")}&date=${roundtrip.date}&return=${roundtrip.returnDate}&time=${roundtrip.time}`;
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
    return `/explore/airport?type=airport&trip=${airport.type}&airport=${airport.airport}&location=${airport.location}&date=${airport.date}&time=${airport.time}`;
}

