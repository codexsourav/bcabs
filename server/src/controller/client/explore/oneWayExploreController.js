import { OneWayCabModel } from "../../../db/models/cabs/oneWayCabSchema"
import { OneWayPricingModel } from "../../../db/models/pricing/oneWayPricingSchema";
import { getDistance } from "../../../helper/getDistrence";
import { applyDiscount } from "../../../helper/pricing";
// @ts-check

export const oneWayExplore = async (req, res) => {
    const { from, to } = req.body;
    const cabs = await OneWayCabModel.find({ isPublic: true, isDelete: false });
    const distanceData = await getDistance(from.trim(), to.trim());
    const totalKM = Math.round(distanceData.distance.distance.value / 1000);
    const tripInfo = {
        type: "oneway",
        from, to,
        totalKM,
        totalCabs: cabs.length,
        distanceData,
    }
    var allCabs = [];

    for (let i = 0; i < cabs.length; i++) {
        const cab = cabs[i];
        const pricing = await OneWayPricingModel.findOne({
            cabDocId: cab._id,
            pricing: { $elemMatch: { from: from, to: to } }
        }, { 'pricing.$': 1 });
        if (pricing) {
            var price = pricing.pricing[0];
            const mainPrice = applyDiscount(price.price, price.discount);
            const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price.price, "distance": totalKM }
            allCabs.push(newCab);
        } else {
            var price = (totalKM * cab.pricePerKm);
            const mainPrice = applyDiscount(price, cab.discount);
            const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price, "distance": totalKM }
            allCabs.push(newCab);
        }
    }

    res.send({ trip: tripInfo, cabs: allCabs })
}

export const getOneWayExplore = async (req, res) => {
    const { from, to } = req.body;
    const { id } = req.params;

    const cab = await OneWayCabModel.findOne({ _id: id, isPublic: true, isDelete: false });
    var cabData = null;
    const distanceData = await getDistance(from.trim(), to.trim());
    const totalKM = Math.round(distanceData.distance.distance.value / 1000);
    const tripInfo = {
        type: "oneway",
        from, to,
        totalKM,
        distanceData,
    }

    if (cab) {


        const pricing = await OneWayPricingModel.findOne({
            cabDocId: cab._id,
            pricing: { $elemMatch: { from: from, to: to } }
        }, { 'pricing.$': 1 });


        if (pricing) {
            var price = pricing.pricing[0];
            const mainPrice = applyDiscount(price.price, price.discount);
            const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price.price, "distance": totalKM }
            cabData = newCab;
        } else {
            var price = (totalKM * cab.pricePerKm);
            const mainPrice = applyDiscount(price, cab.discount);
            const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price, "distance": totalKM }
            cabData = newCab;
        }
    }

    res.send({ trip: tripInfo, cab: cabData })
}