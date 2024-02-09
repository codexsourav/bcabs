// @ts-check 
import { RoundTripCabModel } from "../../../db/models/cabs/roundTripCabSchema";
import { RoundtripPricingModel } from "../../../db/models/pricing/roundTripPricing";

// Create a new round trip cab document
export const createRoundTripCab = async (req, res) => {
    const roundTripCabData = req.body;
    const newRoundTripCab = new RoundTripCabModel(roundTripCabData);
    const savedRoundTripCab = await newRoundTripCab.save();
    const roundtripPricing = new RoundtripPricingModel({ cabDocId: savedRoundTripCab._id, pricing: roundTripCabData.pricing.pricing });
    const newRoundtripPricing = await roundtripPricing.save();
    res.status(201).json({ message: "Cab Added Successful", data: savedRoundTripCab, pricing: newRoundtripPricing });
};

// Retrieve a single round trip cab document by ID
export const getRoundTripCabById = async (req, res) => {
    const { id } = req.params;
    const roundTripCab = await RoundTripCabModel.findById(id);
    const roundtripPricing = await RoundtripPricingModel.findOne({ cabDocId: id });

    if (!roundTripCab) {
        return res.status(404).json({ message: "Round trip cab not found" });
    }
    res.status(200).json({ cab: roundTripCab, pricing: roundtripPricing });
};

// Update an existing round trip cab document
export const updateRoundTripCab = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRoundTripCab = await RoundTripCabModel.findByIdAndUpdate(id, updateData.cab, { new: true });
    const roundtripPricing = await RoundtripPricingModel.findOneAndUpdate({ cabDocId: id }, { $set: { cabDocId: id, pricing: updateData.pricing.pricing } });
    console.log(updateData);
    if (!updatedRoundTripCab) {
        return res.status(404).json({ message: "Round trip cab not found" });
    }
    res.status(200).json({ message: "Cab Update Successful", data: updatedRoundTripCab, pricing: roundtripPricing });
};

// Delete a round trip cab document by ID
export const deleteRoundTripCab = async (req, res) => {
    const { id } = req.params;
    const deletedRoundTripCab = await RoundTripCabModel.updateOne({ _id: id }, { $set: { isDelete: true, isPublic: false } });
    if (!deletedRoundTripCab) {
        return res.status(404).json({ message: "Round trip cab not found" });
    }
    res.status(200).json({ message: "Round trip cab deleted successfully" });
};
