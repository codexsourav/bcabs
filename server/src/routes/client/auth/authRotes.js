// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { changePass, forgetPass, login, signup, verify } from "../../../controller/client/auth/authController";

const router = express.Router();

router.post("/api/auth/login", errorWrapper(login));
router.post("/api/auth/signup", errorWrapper(signup));
router.post("/api/auth/forgetpass/:email", errorWrapper(forgetPass));
router.post("/api/auth/resetpass/:token", errorWrapper(changePass));
router.post("/api/auth/verify/:token", errorWrapper(verify));


export default router; 