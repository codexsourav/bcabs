export interface ICabCommon {
    _id?: string;
    _v?: string;
    date?: string;
    isDelete?: boolean;
    isPublic?: boolean;
    trip?: "oneway" | "local" | "roundtrip" | "airport";
    image: string;
    cabName: string;
    inclusions: { iconIndex: number, title: string }[];
    exclusions: { iconIndex: number, title: string }[];
    facilities: { iconIndex: number, title: string }[];
    taq: string[];
    maxPassengers: string;
    discount: number;
}

export type InclusionsKeys = keyof { iconIndex: number, title: string };
export type ExclusionsKeys = keyof { iconIndex: number, title: string };
export type FacilitiesKeys = keyof { iconIndex: number, title: string };

export interface IOneWayCab extends ICabCommon {
    pricePerKm: number;
    price?: number;
    highPrice?: number;
    distance?: number
}


export interface IRoundTripCab extends ICabCommon {
    baseKm: number;
    pricePerKm: number;
    driverCost: number;
    price?: number;
}

export interface ILocalCab extends ICabCommon {
    prices: {
        hr4: number;
        kr8: number;
        hr12: number;
        hr24: number;
    }
}

export interface IAirportCab extends ICabCommon {
    pricePerKm: number;
    baseAmount: number;
    price?: number;
}