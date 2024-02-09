import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { today } from '../../../components/Inputbox/GoogleInputBoc';

export interface IAirportProvider {
    type: number,
    airport: string,
    location: string,
    date: string,
    time: string,
}

const initialState: IAirportProvider = {
    date: today,
    airport: "",
    time: "",
    location: "",
    type: 0,
}

export const AirportProviderSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        setAirportData: (state, action: PayloadAction<{ name: keyof IAirportProvider, value: string | number }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAirportData } = AirportProviderSlice.actions

export default AirportProviderSlice.reducer