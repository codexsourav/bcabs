import { OneWayPricingModel } from "../../../db/models/pricing/oneWayPricingSchema";
// @ts-check 

export const getOneWayPricing = async (req, res) => {
    const { id } = req.params;
    const pricing = await OneWayPricingModel.findOne({ cabDocId: id });
    res.status(200).json(pricing);
}

export const addOneWayPricing = async (req, res) => {
    const { cabDocId, pricing } = req.body;
    const newPricing = await OneWayPricingModel.create({ cabDocId, pricing });
    res.status(201).json({ message: "Pricing Added Successfully", data: newPricing });
}

export const updateOneWayPricing = async (req, res) => {
    const { cabDocId, pricing } = req.body;
    const updatePrice = await OneWayPricingModel.updateOne({ cabDocId }, { cabDocId, pricing });
    res.status(200).json({ message: "Pricing Update Successfully", data: updatePrice });
}
