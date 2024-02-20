import mongoose from "mongoose";
// @ts-check
const oneWayPricing = {
    cabDocId: { type: String, required: true },
    pricing: [{
        from: { type: String, required: true },
        to: { type: String, required: true },
        discount: { type: Number, required: true },
        price: { type: Number, required: true }
    }]
};


const oneWayPricingSchema = new mongoose.Schema(oneWayPricing);

export const OneWayPricingModel = mongoose.model('OneWayPricing', oneWayPricingSchema);

