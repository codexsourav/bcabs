// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";
import { createRoundTripCab, deleteRoundTripCab, getRoundTripCabById, updateRoundTripCab } from "../../../controller/admin/manageCabs/manageRoundTripCabsController";

const router = express.Router();

router.get("/api/admin/managecabs/roundtrip/:id", authorizeAdmin, errorWrapper(getRoundTripCabById));
router.post("/api/admin/managecabs/roundtrip", authorizeAdmin, errorWrapper(createRoundTripCab));
router.put("/api/admin/managecabs/roundtrip/:id", authorizeAdmin, errorWrapper(updateRoundTripCab));
router.delete("/api/admin/managecabs/roundtrip/:id", authorizeAdmin, errorWrapper(deleteRoundTripCab));

export default router; 
