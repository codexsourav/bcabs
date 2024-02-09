import { OneWayCabModel } from "../../../db/models/cabs/oneWayCabSchema"
import { OneWayPricingModel } from "../../../db/models/pricing/oneWayPricingSchema";
import { getDistance } from "../../../helper/getDistrence";
import { applyDiscount } from "../../../helper/pricing";
// @ts-check 
export const oneWayExplore = async (req, res) => {
    const { from, to, date } = req.body;
    const cabs = await OneWayCabModel.find();
    const distanceData = await getDistance(from, to);
    const totalKM = Math.round(distanceData.distance.distance.value / 1000);
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
            cab.price = mainPrice;
            cab.highPrice = price.price
            cab.distance = totalKM;
            allCabs.push(cab);
        }
    }

    res.send(allCabs)
}