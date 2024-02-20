import { toast } from "react-toastify";
import { IAirportBooking, ILocalBooking, IOneWayBooking, IRoundTripBooking } from "../../interface/booking/Booking";
import { validateEmail } from "../../utils/helper";

export const validateOneWayBookingFields = (stateData: IOneWayBooking): boolean => {
    let isValid = true;

    // Validate "from"
    if (!stateData.name) {
        toast.error("Please Enter Your Name");
        return false;
    }

    if (!stateData.email) {
        toast.error("Please Enter Your Email ID");
        return false;
    }

    if (!validateEmail(stateData.email)) {
        toast.error("Invalid Email ID");
        return false;
    }

    if (stateData.mobile.length != 10) {
        toast.error("Enter Your Valid Mobile Number");
        return false;
    }

    if (!stateData.pickupInfo.pickupAddress) {
        toast.error("Enter Your Pickup Address");
        return false;
    }


    if (!stateData.pickupInfo.pickupLandmark) {
        toast.error("Enter Your Pickup Landmark");
        return false;
    }

    if (!stateData.pickupInfo.dropAddress) {
        toast.error("Enter Your Drop Address");
        return false;
    }

    if (!stateData.pickupInfo.dropLandmark) {
        toast.error("Enter Your Drop Landmark");
        return false;
    }

    return true;

    // Validate other fields similarly...

    return isValid;
};

export const validateRoundTripBookingFields = (stateData: IRoundTripBooking): boolean => {
    let isValid = true;

    // Validate "from"
    if (!stateData.name) {
        toast.error("Please Enter Your Name");
        return false;
    }

    if (!stateData.email) {
        toast.error("Please Enter Your Email ID");
        return false;
    }

    if (!validateEmail(stateData.email)) {
        toast.error("Invalid Email ID");
        return false;
    }

    if (stateData.mobile.length != 10) {
        toast.error("Enter Your Valid Mobile Number");
        return false;
    }

    if (!stateData.pickupInfo.pickupAddress) {
        toast.error("Enter Your Pickup Address");
        return false;
    }


    if (!stateData.pickupInfo.pickupLandmark) {
        toast.error("Enter Your Pickup Landmark");
        return false;
    }

    return true;

    // Validate other fields similarly...

    return isValid;
};

export const validateLocalTripBookingFields = (stateData: ILocalBooking): boolean => {
    let isValid = true;

    // Validate "from"
    if (!stateData.name) {
        toast.error("Please Enter Your Name");
        return false;
    }

    if (!stateData.email) {
        toast.error("Please Enter Your Email ID");
        return false;
    }

    if (!validateEmail(stateData.email)) {
        toast.error("Invalid Email ID");
        return false;
    }

    if (stateData.mobile.length != 10) {
        toast.error("Enter Your Valid Mobile Number");
        return false;
    }

    if (!stateData.pickupInfo.pickupAddress) {
        toast.error("Enter Your Pickup Address");
        return false;
    }


    if (!stateData.pickupInfo.pickupLandmark) {
        toast.error("Enter Your Pickup Landmark");
        return false;
    }

    return true;

    // Validate other fields similarly...

    return isValid;
};
export const validateAirportTripBookingFields = (stateData: IAirportBooking): boolean => {
    let isValid = true;

    // Validate "from"
    if (!stateData.name) {
        toast.error("Please Enter Your Name");
        return false;
    }

    if (!stateData.email) {
        toast.error("Please Enter Your Email ID");
        return false;
    }

    if (!validateEmail(stateData.email)) {
        toast.error("Invalid Email ID");
        return false;
    }

    if (stateData.mobile.length != 10) {
        toast.error("Enter Your Valid Mobile Number");
        return false;
    }

    if (!stateData.pickupInfo.address) {
        toast.error("Enter Your Address");
        return false;
    }

    if (!stateData.pickupInfo.airport) {
        toast.error("Enter Your Airport Name");
        return false;
    }

    if (!stateData.pickupInfo.landmark) {
        toast.error("Enter Your Pickup Landmark");
        return false;
    }

    return true;

    // Validate other fields similarly...

    return isValid;
};

export const validateBookingPaymentFields = (stateData: any): boolean => {

    if (stateData.haveGst) {
        if (!stateData.gstInfo.companyName) {
            toast.error("Enter Your Company Name")
            return false;
        }
        if (!stateData.gstInfo.gstNumber) {
            toast.error("Enter Your GST Number")
            return false;
        }
    }
    return true
}