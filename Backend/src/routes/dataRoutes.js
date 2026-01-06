// backend/src/routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { authMiddleware } = require('../middleware/auth');

// @route   POST /api/scrape
// @desc    Receive scraped data from Python scraper
// @access  Public (called by scraper)
router.post('/scrape', dataController.receiveScrapedData);

// @route   GET /api/data
// @desc    Get all scraped data
// @access  Private
router.get('/data', authMiddleware, dataController.getAllData);

// @route   POST /api/scrape/trigger
// @desc    Trigger manual scraping
// @access  Private
router.post('/scrape/trigger', authMiddleware, dataController.triggerScrape);

// @route   GET /api/data/stats
// @desc    Get scraping statistics
// @access  Private
router.get('/data/stats', authMiddleware, dataController.getStats);

module.exports = router;