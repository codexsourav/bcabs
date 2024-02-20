import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ILocalBooking } from '../../../interface/booking/Booking';


const initialState: ILocalBooking = {

    trip: 'local',
    status: 'pending',
    cabId: '',
    name: '',
    mobile: '',
    email: '',
    haveGst: false,
    distance: 0,
    tripDuration: 0,
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
        taq: [],
        _id: "",
        date: "",
        trip: "local",
        prices: {
            hr12: 0,
            hr24: 0,
            hr4: 0,
            kr8: 0,
        },
    },
    tripInfo: {
        from: '',
        pickUpdate: '',
        pickUpTime: '',
        distance: 0,
    },
    pickupInfo: {
        pickupAddress: '',
        pickupLandmark: '',
    },
};

const localBookingProvider = createSlice({
    name: "localbooking",
    initialState,
    reducers: {
        setLocalBooking: (state, action: PayloadAction<{ name: keyof ILocalBooking, value: any }>) => {
            return { ...state, [action.payload.name]: action.payload.value };
        },
        setPaymentLocalBooking: (state, action: PayloadAction<{ name: keyof ILocalBooking["paymentInfo"], value: any }>) => {
            state.paymentInfo[action.payload.name] = action.payload.value;
            return state;
        },
        setTripInfoLocalBooking: (state, action: PayloadAction<{ name: keyof ILocalBooking["tripInfo"], value: any }>) => {
            return {
                ...state,
                tripInfo: {
                    ...state.tripInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setPickupInfoLocalBooking: (state, action: PayloadAction<{ name: keyof ILocalBooking["pickupInfo"], value: any }>) => {
            return {
                ...state,
                pickupInfo: {
                    ...state.pickupInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        },
        setGstInfoLocalBooking: (state, action: PayloadAction<{ name: keyof ILocalBooking["gstInfo"], value: any }>) => {
            const { name, value } = action.payload;
            state.gstInfo[name] = value;
            return state;
        },
        resetLocalBooking: () => {
            return initialState;
        }

    }
});

export const { setLocalBooking, setPaymentLocalBooking, setTripInfoLocalBooking, setPickupInfoLocalBooking, setGstInfoLocalBooking, resetLocalBooking } = localBookingProvider.actions

export default localBookingProvider.reducer