import mongoose from "mongoose";
// @ts-check
const distanceRoundtripPricingSchema = {
    cabDocId: { type: String, required: true },
    pricing: [{
        from: { type: String, required: true },
        discount: { type: Number, required: true },
        pricePerKm: { type: Number, required: true }
    }]
};



const DistanceRoundtripPricingSchema = new mongoose.Schema(distanceRoundtripPricingSchema);

export const RoundtripPricingModel = mongoose.model('DistanceRoundtripPricing', DistanceRoundtripPricingSchema);

