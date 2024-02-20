// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { addOneWayPricing, getOneWayPricing, updateOneWayPricing } from "../../../controller/admin/pricing/oneWayPricingController";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";

const router = express.Router();

router.post("/api/admin/oneway/pricing", authorizeAdmin, errorWrapper(addOneWayPricing));
router.get("/api/admin/oneway/pricing/:id", authorizeAdmin, errorWrapper(getOneWayPricing));
router.put("/api/admin/oneway/pricing", authorizeAdmin, errorWrapper(updateOneWayPricing));

export default router; 
