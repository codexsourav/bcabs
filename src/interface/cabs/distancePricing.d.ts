export interface IDistanceOneWayPricing {
    _id?: string;
    cabDocId: string;
    pricing: { from: string, to: string, distance: number, discount: number, price: number }[],
}

export type IOneWayPricingKey = keyof { from: string, to: string, distance: number, discount: number, price: number };


export interface IDistanceRoundtripPricing {
    _id?: string;
    cabDocId: string;
    pricing: { from: string, discount: number, pricePerKm: number }[],
}

export type IRoundTripPricingKey = keyof { from: string, discount: number, pricePerKm: number };
