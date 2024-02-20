// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";
import { createAirportCab, deleteAirportCab, getAirportCabById, updateAirportCab } from "../../../controller/admin/manageCabs/manageAirportCabsController";

const router = express.Router();

router.get("/api/admin/managecabs/airport/:id", authorizeAdmin, errorWrapper(getAirportCabById));
router.post("/api/admin/managecabs/airport", authorizeAdmin, errorWrapper(createAirportCab));
router.put("/api/admin/managecabs/airport/:id", authorizeAdmin, errorWrapper(updateAirportCab));
router.delete("/api/admin/managecabs/airport/:id", authorizeAdmin, errorWrapper(deleteAirportCab));

export default router; 
