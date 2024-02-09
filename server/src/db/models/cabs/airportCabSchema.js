import mongoose from "mongoose";
// @ts-check
const airportCab = {
    date: { type: Date, default: Date.now },
    isDelete: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
    trip: {
        type: String,
        enum: ["oneway", "local", "roundtrip", "airport"],
        required: true,
        default: "airport"
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
    taq: { type: [String], required: true },
    maxPassengers: { type: String, required: true },
    discount: { type: Number, required: true, },
    pricePerKm: { type: Number, required: true },
    baseAmount: { type: Number, required: true },
};

const airportCabSchema = new mongoose.Schema(airportCab);
export const AirportCabModel = mongoose.model('airportCabs', airportCabSchema);