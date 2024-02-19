import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IRoundTripBooking } from '../../../interface/booking/Booking';

const initialState: IRoundTripBooking = {

    trip: 'roundtrip',
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
        trip: "roundtrip",
        baseKm: 0,
        driverCost: 0,
    },
    tripInfo: {
        from: '',
        to: [''],
        pickUpdate: '',
        pickUpTime: '',
        distance: 0,
        returnDate: '',
    },
    pickupInfo: {
        pickupAddress: '',
        pickupLandmark: '',
    },
};

const roundTripBookingProvider = createSlice({
    name: "roundTripBooking",
    initialState,
    reducers: {
        setRoundTripBooking: (state, action: PayloadAction<{ name: keyof IRoundTripBooking, value: any }>) => {
            return { ...state, [action.payload.name]: action.payload.value };
        },
        setPaymentRoundTripBooking: (state, action: PayloadAction<{ name: keyof IRoundTripBooking["paymentInfo"], value: any }>) => {
            state.paymentInfo[action.payload.name] = action.payload.value;
            return state;
        },
        setTripInfoRoundTripBooking: (state, action: PayloadAction<{ name: keyof IRoundTripBooking["tripInfo"], value: any }>) => {
            return {
                ...state,
                tripInfo: {
                    ...state.tripInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setPickupInfoRoundTripBooking: (state, action: PayloadAction<{ name: keyof IRoundTripBooking["pickupInfo"], value: any }>) => {
            return {
                ...state,
                pickupInfo: {
                    ...state.pickupInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setGstInfoRoundTripBooking: (state, action: PayloadAction<{ name: keyof IRoundTripBooking["gstInfo"], value: any }>) => {
            const { name, value } = action.payload;
            state.gstInfo[name] = value;
            return state;
        },
        resetRoundTripBooking: () => {
            return initialState;
        }
    }
});

export const { setPickupInfoRoundTripBooking, setTripInfoRoundTripBooking, setPaymentRoundTripBooking, setRoundTripBooking, resetRoundTripBooking, setGstInfoRoundTripBooking } = roundTripBookingProvider.actions

export default roundTripBookingProvider.reducer