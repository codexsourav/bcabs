import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExclusionsKeys, FacilitiesKeys, IAirportCab, InclusionsKeys } from '../../../interface/cabs/cab';
import { areAllValuesPresent, areServiceValuesPresent } from '../../../utils/mapOptons';
import { toast } from 'react-toastify';

export interface INewAirportCab extends IAirportCab { step: number }

const initialState: INewAirportCab = {
    step: 0,
    cabName: "",
    baseAmount: 0,
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
    trip: "airport",
    isDelete: false,
    isPublic: true,
}

const AddAirportCabProvider = createSlice({
    name: "addairportcab",
    initialState,
    reducers: {
        // set all state Daata 
        setNewAirportCabData: (state, action: PayloadAction<{ name: keyof INewAirportCab, value: any }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        },

        // manage Airport data 
        addNewAirportCabInclusionsData: (state) => {
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
        setNewAirportCabInclusionsData: (state, action: PayloadAction<{ index: number, key: InclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newInclusions = [...state.inclusions];
            newInclusions[index] = { ...newInclusions[index], [key]: value };

            return { ...state, inclusions: newInclusions };
        },
        removeNewAirportCabInclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.inclusions.length != 1) {
                state.inclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        // end manage Airport data

        //  exclusions data 
        addNewAirportCabExclusionsData: (state) => {
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
        setNewAirportCabExclusionsData: (state, action: PayloadAction<{ index: number, key: ExclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newExclusions = [...state.exclusions];
            newExclusions[index] = { ...newExclusions[index], [key]: value };

            return { ...state, exclusions: newExclusions };
        },

        removeNewAirportCabExclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.exclusions.length != 1) {
                state.exclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        //  exclusions end data 

        // manage facilities data
        addNewAirportCabFacilitiesData: (state) => {
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

        setNewAirportCabFacilitiesData: (state, action: PayloadAction<{ index: number, key: FacilitiesKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newFacilities = [...state.facilities];
            newFacilities[index] = { ...newFacilities[index], [key]: value };

            return { ...state, facilities: newFacilities };
        },

        removeNewAirportCabFacilitiesData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.facilities.length != 1) {
                state.facilities.splice(action.payload.index, 1);
            }
            return state;
        },
        // manage facilities end data

        // manage tad q data 
        addNewAirportCabTAQData: (state) => {
            const itsOk = areAllValuesPresent(state.taq);
            if (itsOk) {
                state['taq'].push("");
            } else {
                toast.error("Add All T&Q")
            }
            return state;
        },
        setNewAirportCabTAQData: (state, action: PayloadAction<{ index: number, value: string }>) => {
            state.taq[action.payload.index] = action.payload.value;
            return state;
        },
        removeNewAirportCabTAQData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.taq.length != 1) {
                state.taq.splice(action.payload.index, 1);
            }
            return state;
        },
        resetAirportCabData: () => {
            return initialState;
        },
        initAirportCabData: (_, action: PayloadAction<any>) => {
            return action.payload;
        }
    }
});

export const {
    setNewAirportCabData,
    addNewAirportCabInclusionsData,
    setNewAirportCabInclusionsData,
    removeNewAirportCabInclusionsData,
    addNewAirportCabExclusionsData,
    setNewAirportCabExclusionsData,
    removeNewAirportCabExclusionsData,
    addNewAirportCabFacilitiesData,
    setNewAirportCabFacilitiesData,
    removeNewAirportCabFacilitiesData,
    addNewAirportCabTAQData,
    setNewAirportCabTAQData,
    removeNewAirportCabTAQData,
    resetAirportCabData,
    initAirportCabData
} = AddAirportCabProvider.actions;

export default AddAirportCabProvider.reducer;
