// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { oneWayExplore } from "../../../controller/client/explore/oneWayExploreController";

const router = express.Router();

router.post("/api/explore/oneway", errorWrapper(oneWayExplore));

export default router; 
