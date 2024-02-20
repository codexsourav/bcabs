import { RoundTripCabModel } from "../../../db/models/cabs/roundTripCabSchema";
import { RoundtripPricingModel } from "../../../db/models/pricing/roundTripPricing";
import { getDateDifference, getDistance, getMultiDistance } from "../../../helper/getDistrence";
import { applyDiscount } from "../../../helper/pricing";

// @ts-check
export const roundTripExplore = async (req, res) => {
    const { from, to, pickupDate, dropDate } = req.body;
    const cabs = await RoundTripCabModel.find({ isPublic: true, isDelete: false });
    const distanceData = await getMultiDistance([from.trim(), ...to]);
    const totalKM = Math.round(distanceData / 1000);
    const tripTime = getDateDifference(pickupDate, dropDate)
    const tripInfo = {
        type: "roundtrip",
        from, to,
        totalKM,
        totalCabs: cabs.length,
        pickupDate, dropDate,
        distance: distanceData,
        tripTime,
    }

    var allCabs = [];

    for (let i = 0; i < cabs.length; i++) {
        const cab = cabs[i];
        const pricing = await RoundtripPricingModel.findOne({
            cabDocId: cab._id,
            pricing: { $elemMatch: { from: from } }
        }, { 'pricing.$': 1 });
        const mainKm = (cab.baseKm * tripTime.days) < totalKM ? totalKM : (cab.baseKm * tripTime.days);
        const driverCost = (cab.driverCost * tripTime.days);
        if (pricing) {
            var pricePerKm = pricing.pricing[0].pricePerKm;
            const price = pricePerKm * mainKm;
            const mainPrice = applyDiscount(price, cab.discount) + driverCost;
            const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price + driverCost, "distance": mainKm }
            allCabs.push(newCab);
        } else {
            var pricePerKm = cab.pricePerKm;
            const price = mainKm * pricePerKm;
            const mainPrice = applyDiscount(price, cab.discount) + driverCost;
            const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price + driverCost, "distance": mainKm }
            allCabs.push(newCab);
        }
    }

    res.send({ trip: tripInfo, cabs: allCabs });
}

export const getRoundTripExplore = async (req, res) => {
    const { id } = req.params;
    const { from, to, pickupDate, dropDate } = req.body;
    const cab = await RoundTripCabModel.findOne({ _id: id, isPublic: true, isDelete: false });
    const distanceData = await getMultiDistance([from.trim(), ...to]);
    const totalKM = Math.round(distanceData / 1000);
    const tripTime = getDateDifference(pickupDate, dropDate);

    const tripInfo = {
        type: "roundtrip",
        from, to,
        totalKM,
        pickupDate, dropDate,
        distance: distanceData,
    }

    var newCab;
    const pricing = await RoundtripPricingModel.findOne({
        cabDocId: cab._id,
        pricing: { $elemMatch: { from: from } }
    }, { 'pricing.$': 1 });
    const mainKm = (cab.baseKm * tripTime.days) < totalKM ? totalKM : (cab.baseKm * tripTime.days);
    const driverCost = (cab.driverCost * tripTime.days);
    if (pricing) {
        var pricePerKm = pricing.pricing[0].pricePerKm;
        const price = pricePerKm * mainKm;
        const mainPrice = applyDiscount(price, cab.discount) + driverCost;
        newCab = { ...cab._doc, "price": mainPrice, "highPrice": price + driverCost, "distance": mainKm }

    } else {
        var pricePerKm = cab.pricePerKm;
        const price = mainKm * pricePerKm;
        const mainPrice = applyDiscount(price, cab.discount) + driverCost;
        newCab = { ...cab._doc, "price": mainPrice, "highPrice": price + driverCost, "distance": mainKm }
    }

    res.send({ trip: tripInfo, cab: newCab })
}

