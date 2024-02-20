// @ts-check 

import { AirportCabModel } from "../../../db/models/cabs/airportCabSchema";
import { LocalCabModel } from "../../../db/models/cabs/localCabSchema"
import { OneWayCabModel } from "../../../db/models/cabs/oneWayCabSchema";
import { RoundTripCabModel } from "../../../db/models/cabs/roundTripCabSchema";

export const getLocalCabs = async (req, res) => {
    const data = await LocalCabModel.find({ isDelete: false });
    res.send(data);
}

export const getRoundTripCabs = async (req, res) => {
    const data = await RoundTripCabModel.find({ isDelete: false });
    res.send(data);
}

export const airportTripCabs = async (req, res) => {
    const data = await AirportCabModel.find({ isDelete: false });
    res.send(data);
}

export const oneWayTripCabs = async (req, res) => {
    const data = await OneWayCabModel.find({ isDelete: false });
    res.send(data);
}