import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExclusionsKeys, FacilitiesKeys, ILocalCab, InclusionsKeys } from '../../../interface/cabs/cab';
import { areAllValuesPresent, areServiceValuesPresent } from '../../../utils/mapOptons';
import { toast } from 'react-toastify';


export interface INewLocalCab extends ILocalCab { step: number }

const initialState: INewLocalCab = {
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
    prices: {
        hr4: 0,
        kr8: 0,
        hr12: 0,
        hr24: 0,
    },
    taq: [""],
    trip: "local",
    isDelete: false,
    isPublic: true,
}

const AddLocalCabProvider = createSlice({
    name: "addlocalcab",
    initialState,
    reducers: {

        // set all state Daata 
        setNewLocalCabData: (state, action: PayloadAction<{ name: keyof INewLocalCab, value: any }>) => {
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        },

        // manage Local data 
        addNewLocalCabInclusionsData: (state) => {
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
        setNewLocalCabInclusionsData: (state, action: PayloadAction<{ index: number, key: InclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newInclusions = [...state.inclusions];
            newInclusions[index] = { ...newInclusions[index], [key]: value };

            return { ...state, inclusions: newInclusions };
        },
        removeNewLocalCabInclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.inclusions.length != 1) {
                state.inclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        // end manage Local data

        //  exclusions data 
        addNewLocalCabExclusionsData: (state) => {
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
        setNewLocalCabExclusionsData: (state, action: PayloadAction<{ index: number, key: ExclusionsKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newExclusions = [...state.exclusions];
            newExclusions[index] = { ...newExclusions[index], [key]: value };

            return { ...state, exclusions: newExclusions };
        },

        removeNewLocalCabExclusionsData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.exclusions.length != 1) {
                state.exclusions.splice(action.payload.index, 1);
            }
            return state;
        },
        //  exclusions end data 

        // manage facilities data
        addNewLocalCabFacilitiesData: (state) => {
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

        setNewLocalCabFacilitiesData: (state, action: PayloadAction<{ index: number, key: FacilitiesKeys, value: number | string }>) => {
            const { index, key, value } = action.payload;
            const newFacilities = [...state.facilities];
            newFacilities[index] = { ...newFacilities[index], [key]: value };

            return { ...state, facilities: newFacilities };
        },

        removeNewLocalCabFacilitiesData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.facilities.length != 1) {
                state.facilities.splice(action.payload.index, 1);
            }
            return state;
        },
        // manage facilities end data

        // manage tad q data 
        addNewLocalCabTAQData: (state) => {
            const itsOk = areAllValuesPresent(state.taq);
            if (itsOk) {
                state['taq'].push("");
            } else {
                toast.error("Add All T&Q")
            }
            return state;
        },
        setNewLocalCabTAQData: (state, action: PayloadAction<{ index: number, value: string }>) => {
            state.taq[action.payload.index] = action.payload.value;
            return state;
        },
        removeNewLocalCabTAQData: (state, action: PayloadAction<{ index: number }>) => {
            if (state.taq.length != 1) {
                state.taq.splice(action.payload.index, 1);
            }
            return state;
        },

        // set pricing 
        setLocalPricing: (state, action: PayloadAction<{ key: keyof INewLocalCab['prices'], value: number }>) => {
            state.prices[action.payload.key] = action.payload.value;
            return state;
        },

        resetLocalCabData: () => {
            return initialState;
        },
        initLocalCabData: (_, action: PayloadAction<any>) => {
            return action.payload;
        }
    }
});

export const {
    setNewLocalCabData,
    addNewLocalCabInclusionsData,
    setNewLocalCabInclusionsData,
    removeNewLocalCabInclusionsData,
    addNewLocalCabExclusionsData,
    setNewLocalCabExclusionsData,
    removeNewLocalCabExclusionsData,
    addNewLocalCabFacilitiesData,
    setNewLocalCabFacilitiesData,
    removeNewLocalCabFacilitiesData,
    addNewLocalCabTAQData,
    setNewLocalCabTAQData,
    removeNewLocalCabTAQData,
    setLocalPricing,
    resetLocalCabData,
    initLocalCabData
} = AddLocalCabProvider.actions;

export default AddLocalCabProvider.reducer;
