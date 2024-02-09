// @ts-check 
import { LocalCabModel } from "../../../db/models/cabs/localCabSchema";

// Create a new local cab document
export const createLocalCab = async (req, res) => {
    const localCabData = req.body;
    const newLocalCab = new LocalCabModel(localCabData);
    const savedLocalCab = await newLocalCab.save();
    res.status(201).json({ message: "Local Cab Added Successful", data: savedLocalCab });
};


export const getLocalCabById = async (req, res) => {

    const { id } = req.params;
    const localCab = await LocalCabModel.findById(id);
    if (!localCab) {
        return res.status(404).json({ message: "Local cab not found" });
    }
    res.status(200).json(localCab);

};

// Update an existing local cab document
export const updateLocalCab = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedLocalCab = await LocalCabModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedLocalCab) {
        return res.status(404).json({ message: "Local cab not found" });
    }
    res.status(200).json({ message: "Cab Update Successful", data: updatedLocalCab });
};

// Delete a local cab document by ID
export const deleteLocalCab = async (req, res) => {
    const { id } = req.params;
    const deletedLocalCab = await LocalCabModel.updateOne({ _id: id }, { $set: { isDelete: true, isPublic: false } });

    if (!deletedLocalCab) {
        return res.status(404).json({ message: "Local cab not found" });
    }
    res.status(200).json({ message: "Local cab deleted successfully" });
};
