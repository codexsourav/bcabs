import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

const TripIndex = createSlice({
    name: 'tripindex',
    initialState,
    reducers: {
        setTripIndex: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    }
});

export const { setTripIndex } = TripIndex.actions

export default TripIndex.reducer