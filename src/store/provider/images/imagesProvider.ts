import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FileMetadata } from '../../../interface/cabs/Files';

const initialState: FileMetadata[] = [];

const imagesProvider = createSlice({
    name: "imagesprovider",
    initialState,
    reducers: {
        setImages: (_, action: PayloadAction<{ data: any[] }>) => {
            return action.payload.data;
        },
        pushImage: (state, action: PayloadAction<{ data: any }>) => {
            state.unshift(action.payload.data);
            return state;
        }
    }
});

export const { setImages, pushImage } = imagesProvider.actions

export default imagesProvider.reducer