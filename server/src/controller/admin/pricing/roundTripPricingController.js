// @ts-check 
import { RoundtripPricingModel } from "../../../db/models/pricing/roundTripPricing";

export const getRoundTripPricing = async (req, res) => {
    const { id } = req.params;
    const roundtripPricingList = await RoundtripPricingModel.findOne({ _id: id });
    res.json(roundtripPricingList);
}

export const addRoundTripPricing = async (req, res) => {
    const { cabDocId, pricing } = req.body;
    const newRoundtripPricing = await RoundtripPricingModel.create({ cabDocId, pricing });
    res.status(201).json({ message: "Pricing Added Successfully", data: newRoundtripPricing });
}

export const updateRoundTripPricing = async (req, res) => {
    const { cabDocId, pricing } = req.body;
    const updatePrice = await RoundtripPricingModel.updateOne({ cabDocId }, { cabDocId, pricing });
    res.status(200).json({ message: "Pricing Update Successfully", data: updatePrice });
}
