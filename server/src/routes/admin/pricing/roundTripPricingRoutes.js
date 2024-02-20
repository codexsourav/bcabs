// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { addRoundTripPricing, getRoundTripPricing, updateRoundTripPricing } from "../../../controller/admin/pricing/roundTripPricingController";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";
const router = express.Router();

router.post("/api/admin/roundtrip/pricing", authorizeAdmin, errorWrapper(addRoundTripPricing));
router.get("/api/admin/roundtrip/pricing/:id", authorizeAdmin, errorWrapper(getRoundTripPricing));
router.put("/api/admin/roundtrip/pricing", authorizeAdmin, errorWrapper(updateRoundTripPricing));

export default router;