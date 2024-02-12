import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOneWayBooking } from '../../../interface/booking/Booking';

const initialState: IOneWayBooking = {
    _id: '',
    _date: '',
    _v: '',
    trip: 'oneway',
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
    },
    tripInfo: {
        from: '',
        to: '',
        pickUpdate: '',
        pickUpTime: '',
        distance: 0,
    },
    pickupInfo: {
        pickupAddress: '',
        pickupLandmark: '',
        dropAddress: '',
        dropLandmark: '',
    },
};

const OneWayBookingProvider = createSlice({
    name: "onewaybooking",
    initialState,
    reducers: {
        setOneWayBooking: (state, action: PayloadAction<{ name: keyof IOneWayBooking, value: any }>) => {
            return { ...state, [action.payload.name]: action.payload.value };
        },
        setPaymentOneWayBooking: (state, action: PayloadAction<{ name: keyof IOneWayBooking["paymentInfo"], value: any }>) => {
            state.paymentInfo[action.payload.name] = action.payload.value;
            return state;
        },
        setTripInfoOneWayBooking: (state, action: PayloadAction<{ name: keyof IOneWayBooking["tripInfo"], value: any }>) => {
            return {
                ...state,
                tripInfo: {
                    ...state.tripInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setPickupInfoOneWayBooking: (state, action: PayloadAction<{ name: keyof IOneWayBooking["pickupInfo"], value: any }>) => {
            return {
                ...state,
                pickupInfo: {
                    ...state.pickupInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setGstInfoOneWayBooking: (state, action: PayloadAction<{ name: keyof IOneWayBooking["gstInfo"], value: any }>) => {
            const { name, value } = action.payload;
            state.gstInfo[name] = value;
            return state;
        },
        resetOneWayBooking: () => {
            return initialState;
        }

    }
});

export const { resetOneWayBooking, setOneWayBooking, setPaymentOneWayBooking, setTripInfoOneWayBooking, setPickupInfoOneWayBooking, setGstInfoOneWayBooking } = OneWayBookingProvider.actions

export default OneWayBookingProvider.reducer