// @ts-check 
import express from 'express';
import { errorWrapper } from '../error/errorWrapper';
import { newPayment, checkStatus } from './phonePe';
import { authorizeUser } from '../middleware/authorizeUser';
const router = express.Router();

router.post("/api/pay/:type", authorizeUser, errorWrapper(newPayment));
router.get("/api/paystatus/:txnId", errorWrapper(checkStatus));

export default router;