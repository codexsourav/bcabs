import mongoose from "mongoose";
// @ts-check
const oneWayCab = {
    date: { type: Date, required: true, default: Date.now },
    isDelete: { type: Boolean, required: true, default: false },
    isPublic: { type: Boolean, required: true, default: true },
    trip: {
        type: String,
        enum: ["oneway", "local", "roundtrip", "airport"],
        required: true,
        default: "oneway"
    },
    image: { type: String, required: true },
    cabName: { type: String, required: true },
    inclusions: [{
        iconIndex: { type: Number, required: true },
        title: { type: String, required: true }
    }],
    exclusions: [{
        iconIndex: { type: Number, required: true },
        title: { type: String, required: true }
    }],
    facilities: [{
        iconIndex: { type: Number, required: true },
        title: { type: String, required: true }
    }],
    taq: [{ type: String, required: true }],
    maxPassengers: { type: String, required: true },
    pricePerKm: { type: Number, required: true },
    discount: { type: Number, required: true },
};

const oneWayCabSchema = new mongoose.Schema(oneWayCab);
export const OneWayCabModel = mongoose.model('OneWayCabs', oneWayCabSchema);
