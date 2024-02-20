// @ts-check 
import express from "express";
import { body } from 'express-validator';
import { errorWrapper } from "../../../error/errorWrapper";
import { oneWayBooking } from "../../../controller/client/booking/oneWaybookingController";
import { authorizeUser } from "../../../middleware/authorizeUser";
const router = express.Router();

export const validateBooking = [
    body('trip').isIn(['oneway', 'local', 'roundtrip', 'airport']).withMessage('Invalid trip type'),
    body('status').isIn(['pending', 'confirmed', 'complete', 'current', 'cancel']).withMessage('Invalid status'),
    body('name').notEmpty().withMessage('Name is required'),
    body('mobile').notEmpty().withMessage('Mobile is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('haveGst').isBoolean().withMessage('Invalid GST value'),
    body('distance').isNumeric().withMessage('Invalid distance'),
    body('paymentInfo.payPercent').isIn([0, 25, 50, 100]).withMessage('Invalid payment percentage'),
    body('paymentInfo.payAmount').isNumeric().withMessage('Invalid payment amount'),
    body('paymentInfo.pendingAmount').isNumeric().withMessage('Invalid pending amount'),
    body('paymentInfo.total').isNumeric().withMessage('Invalid total amount'),
    body('tripInfo.from').notEmpty().withMessage('Trip from is required'),
    body('tripInfo.to').notEmpty().withMessage('Trip to is required'),
    body('tripInfo.pickUpdate').isISO8601().withMessage('Invalid date format'),
    body('tripInfo.pickUpTime').isString().withMessage('Invalid pick-up time'),
    body('tripInfo.distance').isNumeric().withMessage('Invalid trip distance'),
    body('pickupInfo.pickupAddress').notEmpty().withMessage('Pickup address is required'),
    body('pickupInfo.pickupLandmark').notEmpty().withMessage('Pickup landmark is required')
];

router.post("/api/booking/oneway", authorizeUser, validateBooking, errorWrapper(oneWayBooking));

export default router;