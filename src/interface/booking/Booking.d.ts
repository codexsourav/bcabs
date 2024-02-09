import { IAirportCab, ILocalCab, IOneWayCab, IRoundTripCab } from "../cabs/cab";

export interface booking {
    _id?: string;
    _date?: string;
    _v?: string;
    trip?: "oneway" | "local" | "roundtrip" | "airport";
    status?: "pending" | "confirmed" | "complete" | "current" | "cancel";
    cabId: string;
    delete?: boolean;
    name: string;
    mobile: string;
    email: string;
    haveGst: boolean;
    distance: number;
    CreateByAdmin?: boolean;
    gstInfo?: {
        companyName: string;
        gstNumber: string;
    };
    driverInfo?: {
        name: string;
        mobile: string;
        email: string;
        carNumber: string;
    }
    paymentInfo: {
        payPercent: 0 | 25 | 50 | 100;
        payAmount: number;
        pendingAmount: number;
    }
}

export interface IOneWayBooking extends booking {
    cabInfo: IOneWayCab;
    tripInfo: {
        from: string;
        to: string;
        pickUpdate: string;
        pickUpTime: string;
        distance: number;
    },
    pickupInfo: {
        pickupAddress: string;
        pickupLandmark: string;
        dropAddress: string;
        dropLandmark: string;
    },
}

export interface IRoundTripBooking extends booking {
    cabInfo: IRoundTripCab;
    tripInfo: {
        from: string;
        to: string[];
        pickUpdate: string;
        pickUpTime: string;
        returnDate: string;
        distance: number;
    },
    pickupInfo: {
        pickupAddress: string;
        pickupLandmark: string;
    },
}

export interface ILocalBooking extends booking {
    cabInfo: ILocalCab;
    tripInfo: {
        from: string;
        pickUpdate: string;
        pickUpTime: string;
        distance: number;
    },
    pickupInfo: {
        pickupAddress: string;
        pickupLandmark: string;
    },
}

export interface IAirportBooking extends booking {
    cabInfo: IAirportCab;
    tripInfo: {
        type: 0 | 1;
        airport: string;
        location: string;
        pickUpdate: string;
        pickUpTime: string;
        distance: number;
    },
    pickupInfo: {
        pickupAddress: string;
        dropAddress: string;
    },
}
