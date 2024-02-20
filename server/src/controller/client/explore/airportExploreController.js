import { AirportCabModel } from "../../../db/models/cabs/airportCabSchema";
import { getDistance } from "../../../helper/getDistrence";
import { applyDiscount } from "../../../helper/pricing";

export const airportExplore = async (req, res) => {
    const { from, to } = req.body;
    const cabs = await AirportCabModel.find({ isPublic: true, isDelete: false });
    const distanceData = await getDistance(from.trim(), to.trim());
    const totalKM = Math.round(distanceData.distance.distance.value / 1000);
    var allCabs = [];
    const tripInfo = {
        type: "airport",
        from, to,
        totalKM,
        totalCabs: cabs.length,
        distanceData,
    }
    for (let i = 0; i < cabs.length; i++) {
        const cab = cabs[i];
        var price = (totalKM * cab.pricePerKm) + cab.baseAmount;
        const mainPrice = applyDiscount(price, cab.discount);
        const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price, "distance": totalKM }
        allCabs.push(newCab);
    }

    res.send({ trip: tripInfo, cabs: allCabs })
}


export const getAirportExplore = async (req, res) => {
    const { from, to } = req.body;
    const { id } = req.params;

    const cab = await AirportCabModel.findOne({ _id: id, isPublic: true, isDelete: false });
    const distanceData = await getDistance(from.trim(), to.trim());
    const totalKM = Math.round(distanceData.distance.distance.value / 1000);
    const tripInfo = {
        type: "airport",
        from, to,
        totalKM,
        distanceData,
    }
    var price = (totalKM * cab.pricePerKm) + cab.baseAmount;
    const mainPrice = applyDiscount(price, cab.discount);
    const newCab = { ...cab._doc, "price": mainPrice, "highPrice": price, "distance": totalKM }
    res.send({ trip: tripInfo, cab: newCab });
}
