// @ts-check 

import { AirportCabModel } from "../../../db/models/cabs/airportCabSchema";

// Create a new airport cab document
export const createAirportCab = async (req, res) => {
    const airportCabData = req.body; // Extract airport cab data from request body
    const newAirportCab = new AirportCabModel(airportCabData);
    const savedAirportCab = await newAirportCab.save();
    res.status(201).json({ message: "Airport Cab Added Successful", data: savedAirportCab });
};

// Retrieve a single airport cab document by ID
export const getAirportCabById = async (req, res) => {
    const { id } = req.params;
    const airportCab = await AirportCabModel.findById(id);
    if (!airportCab) {
        return res.status(404).json({ message: "Airport cab not found" });
    }
    res.status(200).json(airportCab);
};

// Update an existing airport cab document
export const updateAirportCab = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedAirportCab = await AirportCabModel.findByIdAndUpdate(id, updateData, { new: true }); // Update airport cab by ID
    if (!updatedAirportCab) {
        return res.status(404).json({ message: "Airport cab not found" });
    }
    res.status(200).json({ message: "Update Cab Successful", data: updatedAirportCab });
};

// Delete an airport cab document by ID
export const deleteAirportCab = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const deletedAirportCab = await AirportCabModel.updateOne({ _id: id }, { $set: { isDelete: true, isPublic: false } });
    if (!deletedAirportCab) {
        return res.status(404).json({ message: "Airport cab not found" });
    }
    res.status(200).json({ message: "Airport cab deleted successfully" });
};
