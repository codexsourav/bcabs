// @ts-check
import Logger from "@ptkdev/logger";
import { statusCode, statusMessage } from "../utils/statusKeys";

export const logger = new Logger();

// errorWrapper.js
export function errorWrapper(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

// errorWrapper.js
export function errorHandler(err, req, res, next) {
    console.log("\n", err);
    logger.error(err.stack);
    logger.stackoverflow(err.message);

    res.status(statusCode.INTERNAL_SERVER_ERROR).json(
        {
            status: statusCode.INTERNAL_SERVER_ERROR,
            message: err.message || 'An error occurred!',
            error: statusMessage[500]
        }
    );
}
