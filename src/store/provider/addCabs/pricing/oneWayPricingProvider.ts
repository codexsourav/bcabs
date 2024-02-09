import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IDistanceOneWayPricing, IOneWayPricingKey } from '../../../../interface/cabs/distancePricing';
import { areOneWayPricingValuesPresent } from '../../../../utils/mapOptons';
import { toast } from 'react-toastify';

const initialState: IDistanceOneWayPricing = {
    cabDocId: "",
    pricing: [
        {
            from: "",
            to: "",
            discount: 0,
            distance: 0,
            price: 0,
        }
    ],
}

const oneWayPricingProvider = createSlice({
    name: "onewaypricing",
    initialState,
    reducers: {
        setNewOneWayCabPricingData: (state, action: PayloadAction<{ name: keyof IDistanceOneWayPricing, value: any }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        },
        addNewOneWayPricing: (state, action: PayloadAction<{ discount: number }>) => {
            const itsOk = areOneWayPricingValuesPresent(state.pricing);
            if (itsOk) {
                state.pricing.push({
                    from: "",
                    to: "",
                    discount: action.payload.discount,
                    distance: 0,
                    price: 0,
                })
            } else {
                toast.error("Enter All Pricing Data")
            }
            return state;
        },
        setNewOneWayPricing: (state, action: PayloadAction<{ index: number, key: IOneWayPricingKey, value: any }>) => {
            const { index, key, value } = action.payload;
            const newPricing = [...state.pricing];
            newPricing[index] = { ...newPricing[index], [key]: value };
            return { ...state, pricing: newPricing };
        },
        removeOneWayPricing: (state, action: PayloadAction<{ index: number }>) => {
            if (state.pricing.length != 1) {
                state.pricing.splice(action.payload.index, 1);
            } else {
                toast.error("Enter No More Remove")
            }
            return state;
        },
        initOneWayPricingData: (_, action: PayloadAction<any>) => {
            return action.payload;
        }
    }
});

export const { setNewOneWayCabPricingData, initOneWayPricingData, addNewOneWayPricing, setNewOneWayPricing, removeOneWayPricing } = oneWayPricingProvider.actions

export default oneWayPricingProvider.reducer