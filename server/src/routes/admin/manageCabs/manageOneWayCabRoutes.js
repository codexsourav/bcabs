// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { addNewOneWayCab, deleteOneWayCab, getOneWayCab, updateOneWayCab } from "../../../controller/admin/manageCabs/manageOneWayCabsController";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";

const router = express.Router();

router.get("/api/admin/managecabs/oneway/:id", authorizeAdmin, errorWrapper(getOneWayCab));
router.post("/api/admin/managecabs/oneway", authorizeAdmin, errorWrapper(addNewOneWayCab));
router.put("/api/admin/managecabs/oneway/:id", authorizeAdmin, errorWrapper(updateOneWayCab));
router.delete("/api/admin/managecabs/oneway/:id", authorizeAdmin, errorWrapper(deleteOneWayCab));

export default router; 
