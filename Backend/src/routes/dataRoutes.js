// backend/src/routes/dataRoutes.js

import express from "express";
import dataController from "../controllers/dataController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/scrape
router.post("/scrape", dataController.receiveScrapedData);

// @route   GET /api/data
router.get("/data", authMiddleware, dataController.getAllData);

// @route   POST /api/scrape/trigger
router.post("/scrape/trigger", authMiddleware, dataController.triggerScrape);

// @route   GET /api/data/stats
router.get("/data/stats", authMiddleware, dataController.getStats);

export default router;
