import { Route } from "react-router-dom"
import OneWayBooking from "../pages/booking/OneWayBooking"
import RoundTripBooking from "../pages/booking/RoundTripBooking"
import LocalBooking from "../pages/booking/LocalBooking"
import AirportBooking from "../pages/booking/AirportBooking"

function BookingRoutes() {
    return (
        <>
            <Route path="/booking/oneway" Component={OneWayBooking} />
            <Route path="/booking/roundtrip" Component={RoundTripBooking} />
            <Route path="/booking/local" Component={LocalBooking} />
            <Route path="/booking/airport" Component={AirportBooking} />
        </>
    )
}
export default BookingRoutes;