import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExclusionsKeys, FacilitiesKeys, IRoundTripCab, InclusionsKeys } from '../../../interface/cabs/cab';
import { areAllValuesPresent, areServiceValuesPresent } from '../../../utils/mapOptons';
import { toast } from 'react-toastify';


export interface INewRoundTripCab extends IRoundTripCab { step: number }

const initialState: INewRoundTripCab = {
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
    trip: "roundtrip",
    baseKm: 0,
    driverCost: 0,
    isDelete: false,
    isPublic: true,
}

const AddRoundTripCabProvider = createSlice({
    name: "addroundtripcab",
    initialState,
    reducers: {
        // set all state Data 
        setNewRoundTripCabData: (state, action: PayloadAction<{ name: keyof INewRoundTripCab, value: any }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        },

        // manage RoundTrip data 
        addNewRoundTripCabInclusionsData: (state) => {
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
        setNewRoundTripCabInclusionsData: (state, action: PayloadAction<{ index: number, key: InclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newInclusions = [...state.inclusions];
            newInclusions[index] = { ...newInclusions[index], [key]: value };

            return { ...state, inclusions: newInclusions };
        },
        removeNewRoundTripCabInclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.inclusions.length != 1) {
                state.inclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        // end manage RoundTrip data

        //  exclusions data 
        addNewRoundTripCabExclusionsData: (state) => {
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
        setNewRoundTripCabExclusionsData: (state, action: PayloadAction<{ index: number, key: ExclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newExclusions = [...state.exclusions];
            newExclusions[index] = { ...newExclusions[index], [key]: value };

            return { ...state, exclusions: newExclusions };
        },

        removeNewRoundTripCabExclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.exclusions.length != 1) {
                state.exclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        //  exclusions end data 

        // manage facilities data
        addNewRoundTripCabFacilitiesData: (state) => {
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

        setNewRoundTripCabFacilitiesData: (state, action: PayloadAction<{ index: number, key: FacilitiesKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newFacilities = [...state.facilities];
            newFacilities[index] = { ...newFacilities[index], [key]: value };

            return { ...state, facilities: newFacilities };
        },

        removeNewRoundTripCabFacilitiesData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.facilities.length != 1) {
                state.facilities.splice(action.payload.index, 1);
            }
            return state;
        },
        // manage facilities end data

        // manage tad q data 
        addNewRoundTripCabTAQData: (state) => {
            const itsOk = areAllValuesPresent(state.taq);
            if (itsOk) {
                state['taq'].push("");
            } else {
                toast.error("Add All T&Q")
            }
            return state;
        },

        setNewRoundTripCabTAQData: (state, action: PayloadAction<{ index: number, value: string }>) => {
            state.taq[action.payload.index] = action.payload.value;
            return state;
        },

        removeNewRoundTripCabTAQData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.taq.length != 1) {
                state.taq.splice(action.payload.index, 1);
            }
            return state;
        },
        resetRoundTripCabData: () => {
            return initialState;
        },
        initRoundTripCabData: (_, action: PayloadAction<any>) => {
            return action.payload;
        }
    },

});

export const {
    setNewRoundTripCabData,
    addNewRoundTripCabInclusionsData,
    setNewRoundTripCabInclusionsData,
    removeNewRoundTripCabInclusionsData,
    addNewRoundTripCabExclusionsData,
    setNewRoundTripCabExclusionsData,
    removeNewRoundTripCabExclusionsData,
    addNewRoundTripCabFacilitiesData,
    setNewRoundTripCabFacilitiesData,
    removeNewRoundTripCabFacilitiesData,
    addNewRoundTripCabTAQData,
    setNewRoundTripCabTAQData,
    removeNewRoundTripCabTAQData,
    resetRoundTripCabData,
    initRoundTripCabData,
} = AddRoundTripCabProvider.actions;

export default AddRoundTripCabProvider.reducer;
