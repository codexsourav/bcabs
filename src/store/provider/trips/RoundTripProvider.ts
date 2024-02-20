import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { areAllValuesPresent } from '../../../utils/mapOptons';
import { toast } from 'react-toastify';
import { today } from '../../../components/Inputbox/GoogleInputBoc';

export interface IRoundTripProvider {
    from: string,
    to: string[],
    date: string,
    returnDate: string;
    time: string,
}

const initialState: IRoundTripProvider = {
    date: today,
    from: "",
    time: "",
    returnDate: "",
    to: [""],
}

export const RoundTripProviderSlice = createSlice({
    name: 'roundtrip',
    initialState,
    reducers: {
        setRoundTripData: (state, action: PayloadAction<{ name: keyof IRoundTripProvider, value: string }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value }
        },
        setRoundTripToIndexData: (state, action: PayloadAction<{ index: number, value: string }>) => {
            const { index, value } = action.payload;
            state.to[index] = value;
            return state;
        },
        addNewToData: (state) => {
            const data = areAllValuesPresent(state.to);
            if (data) {
                if (state.to.length < 5) {
                    state.to.push("");
                }
                return state;
            } else {
                toast.error("Enter All Location Add New")
            }
        },
        deleteToData: (state, action: PayloadAction<number>) => {
            if (state.to.length != 1) {
                state.to.splice(action.payload, 1);
            }
            return state;
        },
    },
})


export const { setRoundTripData, setRoundTripToIndexData, addNewToData, deleteToData } = RoundTripProviderSlice.actions

export default RoundTripProviderSlice.reducer