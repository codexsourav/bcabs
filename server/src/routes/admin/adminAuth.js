// @ts-check
import express from "express";
import { errorWrapper } from "../../error/errorWrapper";
import { adminAuthLogin } from "../../controller/admin/adminAuthController";

const router = express.Router();

router.post("/api/admin/login", errorWrapper(adminAuthLogin));

export default router; 
