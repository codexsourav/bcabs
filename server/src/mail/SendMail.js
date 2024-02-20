// @ts-check 
import nodemailer from "nodemailer";
import { logger } from "../error/errorWrapper";

export const sendMail = async (/** @type {string} */ to, /** @type {string} */ subject, /** @type {string} */ template) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "info@idealedesigns.com",
            pass: "ssva efmi vxzd znrx",
        },
    });
    try {
        const info = await transporter.sendMail({
            from: '"From" babagcabs@gmail.com',
            to: to,
            subject: subject,
            html: template,
        });
        logger.info("Message sent: %s", info.messageId);
    } catch (error) {
        logger.error(error);
    }
}
