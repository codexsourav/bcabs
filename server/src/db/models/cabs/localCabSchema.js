import mongoose from "mongoose";
// @ts-check
const localCab = {
    date: { type: Date, required: true, default: Date.now },
    isDelete: { type: Boolean, required: true, default: false },
    isPublic: { type: Boolean, required: true, default: true },
    trip: {
        type: String,
        enum: ["oneway", "local", "roundtrip", "airport"],
        required: true,
        default: "local"
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
    discount: { type: Number, required: true },
    prices: {
        hr4: { type: Number, required: true },
        kr8: { type: Number, required: true },
        hr12: { type: Number, required: true },
        hr24: { type: Number, required: true }
    }
};

const LocalCabSchema = new mongoose.Schema(localCab);
export const LocalCabModel = mongoose.model('LocalCabs', LocalCabSchema);
