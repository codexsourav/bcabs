// @ts-check
import mongoose from "mongoose";
import { logger } from "../error/errorWrapper";

export const connectDb = async () => {
    logger.info("Connecting Database....");
    try {
        await mongoose.connect("mongodb+srv://sourav:sourav404@cluster0.6aannpk.mongodb.net/bcabs");
    } catch (error) {
        throw error;
    }
}
