// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { getOneWayExplore, oneWayExplore } from "../../../controller/client/explore/oneWayExploreController";
import { getRoundTripExplore, roundTripExplore } from "../../../controller/client/explore/roundTripExploreController";
import { getLocalExplore, localExplore } from "../../../controller/client/explore/localExploreController";
import { airportExplore, getAirportExplore } from "../../../controller/client/explore/airportExploreController";

const router = express.Router();

router.post("/api/explore/oneway", errorWrapper(oneWayExplore));
router.post("/api/explore/oneway/:id", errorWrapper(getOneWayExplore));

router.post("/api/explore/roundtrip", errorWrapper(roundTripExplore));
router.post("/api/explore/roundtrip/:id", errorWrapper(getRoundTripExplore));

router.post("/api/explore/local", errorWrapper(localExplore));
router.post("/api/explore/local/:id", errorWrapper(getLocalExplore));

router.post("/api/explore/airport", errorWrapper(airportExplore));
router.post("/api/explore/airport/:id", errorWrapper(getAirportExplore));

export default router; 
