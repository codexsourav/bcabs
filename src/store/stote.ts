import { configureStore } from '@reduxjs/toolkit'
import OneWayProvider from './provider/trips/OneWayProvider'
import AirportProvider from './provider/trips/AirportProvider'
import LocalProvider from './provider/trips/LocalProvider'
import RoundTripProvider from './provider/trips/RoundTripProvider'
import TripIndex from './provider/trips/TripIndex'
import AddAirportCabProvider from './provider/addCabs/AddAirportCabProvider'
import AddLocalCabProvider from './provider/addCabs/AddLocalCabProvider'
import AddOneWayCabProvider from './provider/addCabs/AddOneWayCabProvider'
import AddRoundTripCabProvider from './provider/addCabs/AddRoundTripCabProvider'
import oneWayPricingProvider from './provider/addCabs/pricing/oneWayPricingProvider'
import roundTripPricingProvider from './provider/addCabs/pricing/roundTripPricingProvider'
import imagesProvider from './provider/images/imagesProvider'
import OneWayBookingProvider from './provider/booking/OneWayBookingProvider'
import roundTripBookingProvider from './provider/booking/roundTripBookingProvider'
import localBookingProvider from './provider/booking/localBookingProvider'
import airportBookingProvider from './provider/booking/airportBookingProvider'



export const store = configureStore({
    reducer: {
        oneway: OneWayProvider,
        roundtrip: RoundTripProvider,
        local: LocalProvider,
        airport: AirportProvider,
        tripIndex: TripIndex,
        addairportcab: AddAirportCabProvider,
        addlocalcab: AddLocalCabProvider,
        addonewaycab: AddOneWayCabProvider,
        addroundtripcab: AddRoundTripCabProvider,
        onewaypricing: oneWayPricingProvider,
        roundtrippricing: roundTripPricingProvider,
        imagesprovider: imagesProvider,
        onewaybooking: OneWayBookingProvider,
        roundtripbooking: roundTripBookingProvider,
        localtripbooking: localBookingProvider,
        airportbooking: airportBookingProvider,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;