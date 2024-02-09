import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IDistanceRoundtripPricing, IRoundTripPricingKey } from '../../../../interface/cabs/distancePricing';
import { areRoundTripPricingValuesPresent } from '../../../../utils/mapOptons';
import { toast } from 'react-toastify';

const initialState: IDistanceRoundtripPricing = {
    cabDocId: "",
    pricing: [
        {
            discount: 0,
            from: "",
            pricePerKm: 0,
        }
    ]
}

const roundTripPricingProvider = createSlice({
    name: "roundtrippricingprovider",
    initialState,
    reducers: {
        setNewRoundTripCabPricingData: (state, action: PayloadAction<{ name: keyof IDistanceRoundtripPricing, value: any }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        },
        addNewRoundTripPricing: (state, action: PayloadAction<{ discount: number }>) => {
            const itsOk = areRoundTripPricingValuesPresent(state.pricing);
            if (itsOk) {
                state.pricing.push({
                    from: "",
                    discount: action.payload.discount,
                    pricePerKm: 0,
                })
            } else {
                toast.error("Enter All Pricing Data")
            }
            return state;
        },
        setNewRoundTripPricing: (state, action: PayloadAction<{ index: number, key: IRoundTripPricingKey, value: any }>) => {
            const { index, key, value } = action.payload;
            const newPricing = [...state.pricing];
            newPricing[index] = { ...newPricing[index], [key]: value };
            return { ...state, pricing: newPricing };
        },
        removeRoundTripPricing: (state, action: PayloadAction<{ index: number }>) => {
            if (state.pricing.length != 1) {
                state.pricing.splice(action.payload.index, 1);
            } else {
                toast.error("Enter No More Remove")
            }
            return state;
        },
        initRoundTripPricingData: (_, action: PayloadAction<any>) => {
            return action.payload;
        }
    }
});

export const { initRoundTripPricingData, setNewRoundTripCabPricingData, addNewRoundTripPricing, setNewRoundTripPricing, removeRoundTripPricing } = roundTripPricingProvider.actions

export default roundTripPricingProvider.reducer