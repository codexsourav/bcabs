import { OneWayCabModel } from "../../../db/models/cabs/oneWayCabSchema";
import { OneWayPricingModel } from "../../../db/models/pricing/oneWayPricingSchema";

// @ts-check
export const getOneWayCab = async (req, res) => {
    const { id } = req.params;
    const oneWayCab = await OneWayCabModel.findById(id);
    const price = await OneWayPricingModel.findOne({ cabDocId: id });

    if (!oneWayCab) {
        return res.status(404).json({ message: "OneWay cab not found" });
    }

    res.status(200).json({ cab: oneWayCab, pricing: price });
}


export const addNewOneWayCab = async (req, res) => {

    const {
        trip,
        image,
        cabName,
        inclusions,
        exclusions,
        facilities,
        taq,
        maxPassengers,
        discount,
        pricePerKm,
        pricing
    } = req.body;

    const newOneWayCab = new OneWayCabModel({
        trip,
        image,
        cabName,
        inclusions,
        exclusions,
        facilities,
        taq,
        maxPassengers,
        discount,
        pricePerKm,
        pricing
    });

    const savedOneWayCab = await newOneWayCab.save();

    const updatePrice = OneWayPricingModel({ cabDocId: savedOneWayCab._id, "pricing": pricing.pricing });
    const prciceData = await updatePrice.save()
    res.status(201).json({ message: "Cab Added Successfully", data: savedOneWayCab, pricing: prciceData });
}

export const updateOneWayCab = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.trip && !["oneway", "local", "roundtrip", "airport"].includes(updateData.trip)) {
        return res.status(400).json({ message: "Invalid trip type" });
    }
    if (updateData.discount && (updateData.discount < 0 || updateData.discount > 100)) {
        return res.status(400).json({ message: "Discount must be between 0 and 100" });
    }
    if (updateData.pricePerKm && updateData.pricePerKm < 0) {
        return res.status(400).json({ message: "Price per kilometer must be non-negative" });
    }
    const updatedOneWayCab = await OneWayCabModel.findOneAndUpdate({ _id: id }, updateData.cab, { new: true });
    const updatePrice = await OneWayPricingModel.updateOne({ cabDocId: id }, { $set: { cabDocId: id, "pricing": updateData.pricing.pricing } }, { new: true });

    if (!updatedOneWayCab) {
        return res.status(404).json({ message: "One-way cab not found" });
    }

    res.status(200).json({ message: "Cab Update Successfully", data: updatedOneWayCab, pricing: updatePrice });
};

export const deleteOneWayCab = async (req, res) => {
    const { id } = req.params;
    const oneWayCab = await OneWayCabModel.findById(id);
    if (!oneWayCab) {
        return res.status(404).json({ message: "OneWay cab not found" });
    }
    await OneWayCabModel.updateOne({ _id: id }, { $set: { isDelete: true, isPublic: false } });
    res.status(200).json({ message: "OneWay cab deleted successfully" });
};
