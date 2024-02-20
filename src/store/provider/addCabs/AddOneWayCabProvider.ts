import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExclusionsKeys, FacilitiesKeys, IOneWayCab, InclusionsKeys } from '../../../interface/cabs/cab';
import { areAllValuesPresent, areServiceValuesPresent } from '../../../utils/mapOptons';
import { toast } from 'react-toastify';


export interface INewOneWayCab extends IOneWayCab { step: number }

const initialState: INewOneWayCab = {
    step: 0,
    cabName: "",
    discount: 0,
    inclusions: [{
        iconIndex: 0,
        title: ""
    }],
    exclusions: [{
        iconIndex: 0,
        title: ""
    }],
    facilities: [{
        iconIndex: 0,
        title: ""
    }],
    image: "",
    maxPassengers: "",
    pricePerKm: 0,
    taq: [""],
    trip: "oneway",
    isDelete: false,
    isPublic: true,
}

const AddOneWayCabProvider = createSlice({
    name: "addonewaycab",
    initialState,
    reducers: {
        // set all state Daata 
        setNewOneWayCabData: (state, action: PayloadAction<{ name: keyof INewOneWayCab, value: any }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        },

        // manage OneWay data 
        addNewOneWayCabInclusionsData: (state) => {
            const itsOk = areServiceValuesPresent(state.inclusions);
            if (itsOk) {
                state['inclusions'].push({
                    iconIndex: 0,
                    title: "",
                });
            } else {
                toast.error("Add All Inclusions")
            }
            return state;
        },
        setNewOneWayCabInclusionsData: (state, action: PayloadAction<{ index: number, key: InclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newInclusions = [...state.inclusions];
            newInclusions[index] = { ...newInclusions[index], [key]: value };

            return { ...state, inclusions: newInclusions };
        },
        removeNewOneWayCabInclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.inclusions.length != 1) {
                state.inclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        // end manage OneWay data

        //  exclusions data 
        addNewOneWayCabExclusionsData: (state) => {
            const itsOk = areServiceValuesPresent(state.exclusions);
            if (itsOk) {
                state['exclusions'].push({
                    iconIndex: 0,
                    title: "",
                });
            } else {
                toast.error("Add All Exclusions")
            }

            return state;
        },
        setNewOneWayCabExclusionsData: (state, action: PayloadAction<{ index: number, key: ExclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newExclusions = [...state.exclusions];
            newExclusions[index] = { ...newExclusions[index], [key]: value };

            return { ...state, exclusions: newExclusions };
        },

        removeNewOneWayCabExclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.exclusions.length != 1) {
                state.exclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        //  exclusions end data 

        // manage facilities data
        addNewOneWayCabFacilitiesData: (state) => {
            const itsOk = areServiceValuesPresent(state.facilities);
            if (itsOk) {
                state['facilities'].push({
                    iconIndex: 0,
                    title: "",
                });
            } else {
                toast.error("Add All Facilities")
            }
            return state;
        },

        setNewOneWayCabFacilitiesData: (state, action: PayloadAction<{ index: number, key: FacilitiesKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newFacilities = [...state.facilities];
            newFacilities[index] = { ...newFacilities[index], [key]: value };

            return { ...state, facilities: newFacilities };
        },

        removeNewOneWayCabFacilitiesData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.facilities.length != 1) {
                state.facilities.splice(action.payload.index, 1);
            }
            return state;
        },
        // manage facilities end data

        // manage tad q data 
        addNewOneWayCabTAQData: (state) => {
            const itsOk = areAllValuesPresent(state.taq);
            if (itsOk) {
                state['taq'].push("");
            } else {
                toast.error("Add All T&Q")
            }
            return state;
        },
        setNewOneWayCabTAQData: (state, action: PayloadAction<{ index: number, value: string }>) => {
            state.taq[action.payload.index] = action.payload.value;
            return state;
        },
        removeNewOneWayCabTAQData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.taq.length != 1) {
                state.taq.splice(action.payload.index, 1);
            }
            return state;
        },
        resetOneWayCabData: () => {
            return initialState;
        },
        initOneWayCabData: (_, action: PayloadAction<any>) => {
            return action.payload;
        }
    }
});

export const {
    setNewOneWayCabData,
    addNewOneWayCabInclusionsData,
    setNewOneWayCabInclusionsData,
    removeNewOneWayCabInclusionsData,
    addNewOneWayCabExclusionsData,
    setNewOneWayCabExclusionsData,
    removeNewOneWayCabExclusionsData,
    addNewOneWayCabFacilitiesData,
    setNewOneWayCabFacilitiesData,
    removeNewOneWayCabFacilitiesData,
    addNewOneWayCabTAQData,
    setNewOneWayCabTAQData,
    removeNewOneWayCabTAQData,
    resetOneWayCabData,
    initOneWayCabData,
} = AddOneWayCabProvider.actions;

export default AddOneWayCabProvider.reducer;
