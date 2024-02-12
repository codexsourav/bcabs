import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAirportBooking } from '../../../interface/booking/Booking';

const initialState: IAirportBooking = {
    _id: '',
    _date: '',
    _v: '',
    trip: 'airport',
    status: 'pending',
    cabId: '',
    name: '',
    mobile: '',
    email: '',
    haveGst: false,
    distance: 0,
    CreateByAdmin: false,
    gstInfo: {
        companyName: '',
        gstNumber: '',
    },
    paymentInfo: {
        payPercent: 0,
        payAmount: 0,
        pendingAmount: 0,
        total: 0,
    },

    cabInfo: {
        cabName: "",
        discount: 0,
        exclusions: [],
        facilities: [],
        image: '',
        inclusions: [],
        maxPassengers: "",
        pricePerKm: 0,
        taq: [],
        _id: "",
        date: "",
        distance: 0,
        highPrice: 0,
        price: 0,
        trip: "oneway",
        baseAmount: 0,
    },
    tripInfo: {
        airport: '',
        location: '',
        pickUpdate: '',
        pickUpTime: '',
        distance: 0,
        type: 0,
        trip: "",
    },
    pickupInfo: {
        address: "",
        airport: "",
        landmark: ""
    },
};


const airportBookingProvider = createSlice({
    name: "airportpricing",
    initialState,
    reducers: {
        setAirportBooking: (state, action: PayloadAction<{ name: keyof IAirportBooking, value: any }>) => {
            return { ...state, [action.payload.name]: action.payload.value };
        },
        setPaymentAirportBooking: (state, action: PayloadAction<{ name: keyof IAirportBooking["paymentInfo"], value: any }>) => {
            state.paymentInfo[action.payload.name] = action.payload.value;
            return state;
        },
        setTripInfoAirportBooking: (state, action: PayloadAction<{ name: keyof IAirportBooking["tripInfo"], value: any }>) => {
            return {
                ...state,
                tripInfo: {
                    ...state.tripInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setPickupInfoAirportBooking: (state, action: PayloadAction<{ name: keyof IAirportBooking["pickupInfo"], value: any }>) => {
            return {
                ...state,
                pickupInfo: {
                    ...state.pickupInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setGstInfoAirportBooking: (state, action: PayloadAction<{ name: keyof IAirportBooking["gstInfo"], value: any }>) => {
            const { name, value } = action.payload;
            state.gstInfo[name] = value;
            return state;
        },
        resetAirportBooking: () => {
            return initialState;
        }

    }
});

export const { setAirportBooking, setPaymentAirportBooking, setTripInfoAirportBooking, setPickupInfoAirportBooking, setGstInfoAirportBooking, resetAirportBooking } = airportBookingProvider.actions

export default airportBookingProvider.reducer;