import { logger } from "../error/errorWrapper";
import { verifyJwtToken } from "../utils/makeJWT";
// @ts-check

export const authorizeUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(req.headers);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const user = await verifyJwtToken(token);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        logger.error(error)
        res.send({ error: "unknown User", message: "You Are not Login" })
    }
}