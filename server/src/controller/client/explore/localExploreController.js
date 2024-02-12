import { LocalCabModel } from "../../../db/models/cabs/localCabSchema";
import { getDistance } from "../../../helper/getDistrence";

export const localExplore = async (req, res) => {
    const { from } = req.body;
    const cabs = await LocalCabModel.find({ isPublic: true, isDelete: false });
    const tripInfo = {
        type: "local",
        from,
        totalCabs: cabs.length,
    }
    res.send({ trip: tripInfo, cabs: cabs })
}

export const getLocalExplore = async (req, res) => {
    const { from } = req.body;
    const { id } = req.params;
    const cab = await LocalCabModel.findOne({ _id: id, isPublic: true, isDelete: false });

    const tripInfo = {
        type: "local",
        from,
    }
    res.send({ trip: tripInfo, cab: { ...cab._doc } });
}