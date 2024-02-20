import { Route } from "react-router-dom"
import OneWayBooking from "../pages/booking/OneWayBooking"
import RoundTripBooking from "../pages/booking/RoundTripBooking"
import LocalBooking from "../pages/booking/LocalBooking"
import AirportBooking from "../pages/booking/AirportBooking"
import SuccessPayment from "../pages/booking/payment/status/SuccessPayment"
import ErrorPayment from "../pages/booking/payment/status/ErrorPayment"

function BookingRoutes() {
    return (
        <>
            <Route path="/booking/oneway" Component={OneWayBooking} />
            <Route path="/booking/roundtrip" Component={RoundTripBooking} />
            <Route path="/booking/local" Component={LocalBooking} />
            <Route path="/booking/airport" Component={AirportBooking} />
            <Route path="/booking/payment/:type/:bookingId" Component={SuccessPayment} />
            <Route path="/booking/payment/error/:type/:bookingId" Component={ErrorPayment} />
        </>
    )
}
export default BookingRoutes;