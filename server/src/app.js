// @ts-check
import express from "express";
import { errorHandler, errorWrapper, logger } from './error/errorWrapper';
import path from 'path';
import fs from 'fs';
import { getMimeType } from "./utils/mimeType";
import { connectDb } from "./db/db";
import adminAuthRoutes from "./routes/admin/adminAuth";
import manageOneWayCabRoutes from "./routes/admin/manageCabs/manageOneWayCabRoutes";
import manageLocalCabRoutes from "./routes/admin/manageCabs/manageLocalCabRoutes";
import manageAirportCabRoutes from "./routes/admin/manageCabs/manageAirportCabRoutes";
import manageRoundTripCabRoutes from "./routes/admin/manageCabs/manageRoundTripCabRoutes";
import oneWayPricingRoutes from "./routes/admin/pricing/oneWayPricingRoutes";
import roundTripPricingRoutes from "./routes/admin/pricing/roundTripPricingRoutes";
import getCabsRoutes from "./routes/admin/cabs/getCabsRoutes";
import manageBlogsRoutes from "./routes/admin/blogs/manageBlogsRoutes";

import exploreRoutes from "./routes/client/explore/exploreRoutes";
import authRotes from "./routes/client/auth/authRotes";
import cors from 'cors';
import uploader from "./utils/uploader";
export const port = 3000;
const staticFolderPath = path.join(new URL('.', import.meta.url).pathname, '..', 'static');

const app = express();
app.use(
    cors(),
    express.json(),
    express.static(staticFolderPath),
    express.static(path.join(staticFolderPath, "dist")),

    adminAuthRoutes,
    manageOneWayCabRoutes,
    manageLocalCabRoutes,
    manageAirportCabRoutes,
    manageRoundTripCabRoutes,
    oneWayPricingRoutes,
    roundTripPricingRoutes,
    getCabsRoutes,
    exploreRoutes,
    authRotes,
    manageBlogsRoutes,
);

// Route handler
async function myRouteHandler(req, res) {
    console.log(staticFolderPath);
    throw new Error('Ha HA HA!');
}

app.get('/list-files', (req, res) => {
    const UploadsFilePath = path.join(staticFolderPath, "uploads");
    fs.readdir(UploadsFilePath, (err, files) => {
        if (err) {
            return res.status(500).send('Error listing files');
        }

        // Get file information and sort by last modified time (latest first)
        const fileList = files.map(file => {
            const filePath = path.join(UploadsFilePath, file);
            const fileStat = fs.statSync(filePath);
            const fileType = fileStat.isFile() ? 'file' : 'directory';
            const fileExtension = path.extname(file);
            const fileSize = fileStat.size;
            const mimeType = getMimeType(fileExtension);
            return {
                name: file,
                type: fileType,
                extension: fileExtension,
                size: fileSize,
                mimeType: mimeType,
                lastModified: fileStat.mtime.getTime()
            };
        }).sort((a, b) => b.lastModified - a.lastModified);

        res.send(fileList);
    });
});


app.post('/api/upload', uploader.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        return res.status(200).json({
            message: "File Upload Successfully",
            filename: req.file.filename,
            originalname: req.file.originalname,
            destination: req.file.destination,
            path: req.file.path,
            metadata: {
                name: req.file.filename,
                type: req.file.mimetype,
                extension: req.file.originalname.split('.').pop(),
                size: req.file.size,
                mimeType: req.file.mimetype,
            }
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/", errorWrapper(myRouteHandler));

app.get("*", (req, res) => {
    const indexFile = path.join(staticFolderPath, "dist", "index.html");
    res.sendFile(indexFile);
});

// Error handling middleware
app.use(errorHandler);

// Start the server


connectDb().then((result) => {

    app.listen(port, () => {
        logger.info("Server State on Port " + port);
    });

}).catch((err) => {
    logger.error(err);
});
