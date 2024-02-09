import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { today } from '../../../components/Inputbox/GoogleInputBoc';

export interface ILocalProvider {
    from: string,
    date: string,
    time: string,
}

const initialState: ILocalProvider = {
    date: today,
    from: "",
    time: "",
}

export const LocalProviderSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setLocalData: (state, action: PayloadAction<{ name: keyof ILocalProvider, value: string }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLocalData, } = LocalProviderSlice.actions

export default LocalProviderSlice.reducer