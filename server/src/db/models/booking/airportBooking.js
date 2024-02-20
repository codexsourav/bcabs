import mongoose from "mongoose";
import { generateBookingId } from "../../../helper/bookingId";

const { Schema } = mongoose;

// Define sub-schemas if necessary
const TripInfoSchema = new Schema({
  type: { type: String, required: true },
  trip: { type: String, required: true },
  airport: { type: String, required: true },
  location: { type: String, required: true },
  pickUpdate: { type: String, required: true },
  pickUpTime: { type: String, required: true },
  distance: { type: Number, required: true },
});

const PickupInfoSchema = new Schema({
  airport: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String },
});

// Define the main schema
export const AirportBookingSchema = new Schema({
  _date: { type: Date, default: Date.now() },
  bookingId: { type: String, default: generateBookingId() },
  trip: {
    type: String,
    enum: ["oneway", "local", "roundtrip", "airport"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "complete", "current", "cancel"],
    required: true,
  },
  cabId: { type: String, required: true },
  delete: { type: Boolean },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  haveGst: { type: Boolean, required: true },
  distance: { type: Number, required: true },
  CreateByAdmin: { type: Boolean },
  gstInfo: {
    companyName: { type: String },
    gstNumber: { type: String },
  },
  driverInfo: {
    name: { type: String },
    mobile: { type: String },
    email: { type: String },
    carNumber: { type: String },
  },
  paymentInfo: {
    payPercent: { type: Number, enum: [0, 25, 50, 100], required: true },
    payAmount: { type: Number, required: true },
    pendingAmount: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  translation: { type: Schema.Types.Mixed },
  cabInfo: { type: Object },
  tripInfo: TripInfoSchema,
  pickupInfo: PickupInfoSchema,
});

// Create and export the model
export const AirportBookingModel = mongoose.model(
  "AirportBooking",
  AirportBookingSchema
);
export const TmpAirportBookingModel = mongoose.model(
  "TmpAirportBooking",
  AirportBookingSchema
);

export const createAirportTmpBooking = async (data) => {
  try {
    const NewTmp = new TmpAirportBookingModel(data);
    return await NewTmp.save();
  } catch (error) {
    throw error;
  }
};
