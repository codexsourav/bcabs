// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";
import { airportTripCabs, getLocalCabs, getRoundTripCabs, oneWayTripCabs } from "../../../controller/admin/cabs/getCabsController";

const router = express.Router();

router.get("/api/admin/cabs/oneway", authorizeAdmin, errorWrapper(oneWayTripCabs));
router.get("/api/admin/cabs/roundtrip", authorizeAdmin, errorWrapper(getRoundTripCabs));
router.get("/api/admin/cabs/local", authorizeAdmin, errorWrapper(getLocalCabs));
router.get("/api/admin/cabs/airport", authorizeAdmin, errorWrapper(airportTripCabs));

export default router; 
