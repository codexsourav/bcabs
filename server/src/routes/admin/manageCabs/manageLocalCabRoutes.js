// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";
import { createLocalCab, deleteLocalCab, getLocalCabById, updateLocalCab } from "../../../controller/admin/manageCabs/manageLocalCabsController";

const router = express.Router();

router.get("/api/admin/managecabs/local/:id", authorizeAdmin, errorWrapper(getLocalCabById));
router.post("/api/admin/managecabs/local", authorizeAdmin, errorWrapper(createLocalCab));
router.put("/api/admin/managecabs/local/:id", authorizeAdmin, errorWrapper(updateLocalCab));
router.delete("/api/admin/managecabs/local/:id", authorizeAdmin, errorWrapper(deleteLocalCab));

export default router; 
