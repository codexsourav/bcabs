import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { today } from '../../../components/Inputbox/GoogleInputBoc';

export interface IOneWayProvider {
    from: string,
    to: string,
    date: string,
    time: string,
}

const initialState: IOneWayProvider = {
    date: today,
    from: "",
    time: "",
    to: "",
}

export const OneWayProviderSlice = createSlice({
    name: 'oneway',
    initialState,
    reducers: {
        setOneWayData: (state, action: PayloadAction<{ name: keyof IOneWayProvider, value: string }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setOneWayData, } = OneWayProviderSlice.actions

export default OneWayProviderSlice.reducer