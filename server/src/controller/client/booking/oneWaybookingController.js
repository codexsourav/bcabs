// @ts-check 
import { validationResult } from 'express-validator';

import { OneWayBookingModel } from "../../../db/models/booking/onewayBooking";


export const oneWayBooking = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Some Fields Are Missing", errors: errors.array() });
    }

    // Create new booking
    const newBooking = new OneWayBookingModel(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
}
