// backend/src/controllers/dataController.js

const ScrapedItem = require("../models/ScrapedItem");
const logger = require("../utils/logger");
const { spawn } = require("child_process");
const path = require("path");

/**
 * Receive Scraped Data from Python Scraper
 *
 * @route POST /api/scrape
 * @access Public (called by scraper)
 */
exports.receiveScrapedData = async (req, res) => {
  try {
    const { items } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required and must not be empty",
      });
    }

    // Validate item structure
    const validItems = items.filter((item) => {
      return item.title && item.link && item.rank;
    });

    if (validItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid items found in request",
      });
    }

    // Clear old data (keep only latest scrape)
    await ScrapedItem.deleteMany({});
    logger.info("Cleared old scraped data");

    // Insert new scraped items
    const savedItems = await ScrapedItem.insertMany(
      validItems.map((item) => ({
        rank: item.rank,
        title: item.title,
        link: item.link,
        points: item.points || 0,
        comments: item.comments || 0,
        scrapedAt: new Date(item.scraped_at || Date.now()),
      }))
    );

    logger.info(`Saved ${savedItems.length} items to database`);

    res.status(201).json({
      success: true,
      message: `Successfully saved ${savedItems.length} items`,
      count: savedItems.length,
    });
  } catch (error) {
    logger.error("Error receiving scraped data:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save scraped data",
      error: error.message,
    });
  }
};

/**
 * Get All Scraped Data
 *
 * @route GET /api/data
 * @access Private (requires authentication)
 */
exports.getAllData = async (req, res) => {
  try {
    // Parse query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    // Fetch data with pagination
    const items = await ScrapedItem.find()
      .sort({ rank: 1 }) // Sort by rank ascending
      .skip(skip)
      .limit(limit)
      .select("-__v"); // Exclude version key

    // Get total count for pagination
    const totalCount = await ScrapedItem.countDocuments();

    // Get last scrape time
    const latestItem = await ScrapedItem.findOne().sort({ scrapedAt: -1 });
    const lastScrapedAt = latestItem ? latestItem.scrapedAt : null;

    logger.info(`Fetched ${items.length} items for user: ${req.user.email}`);

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit,
      },
      lastScrapedAt,
    });
  } catch (error) {
    logger.error("Error fetching data:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

/**
 * Trigger Manual Scrape
 * Runs Python scraper script
 *
 * @route POST /api/scrape/trigger
 * @access Private (requires authentication)
 */
exports.triggerScrape = async (req, res) => {
  let responded = false;

  try {
    logger.info(`Manual scrape triggered by user: ${req.user.email}`);

    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    const scraperPath = path.join(__dirname, "../../../scraper/src/main.py");

    const fs = require("fs");
    if (!fs.existsSync(scraperPath)) {
      return res.status(500).json({
        success: false,
        message: "Scraper file not found",
        path: scraperPath,
      });
    }

    logger.info(`Executing: ${pythonCmd} ${scraperPath}`);

    const pythonProcess = spawn(pythonCmd, [scraperPath], {
      cwd: path.join(__dirname, "../../../scraper"),
      env: { ...process.env, PYTHONUNBUFFERED: "1" },
    });

    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      logger.info(`Scraper: ${data.toString().trim()}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
      logger.error(`Scraper error: ${data.toString().trim()}`);
    });

    // ⏱️ Timeout handler
    const timeout = setTimeout(() => {
      if (!responded) {
        responded = true;
        pythonProcess.kill();
        logger.error("Scraper timed out after 60 seconds");

        return res.status(504).json({
          success: false,
          message: "Scraper timed out",
        });
      }
    }, 60000);

    // ✅ Process finished
    pythonProcess.on("close", async (code) => {
      if (responded) return;

      responded = true;
      clearTimeout(timeout);

      logger.info(`Scraper process exited with code ${code}`);

      if (code === 0) {
        const count = await ScrapedItem.countDocuments();
        return res.status(200).json({
          success: true,
          message: "Scraping completed successfully",
          itemsScraped: count,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Scraping failed",
        error: errorOutput || "Scraper exited with non-zero code",
        exitCode: code,
      });
    });

    // ❌ Spawn error
    pythonProcess.on("error", (error) => {
      if (responded) return;

      responded = true;
      clearTimeout(timeout);

      logger.error("Failed to start scraper:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to start scraper. Make sure Python is installed.",
        error: error.message,
        pythonCommand: pythonCmd,
      });
    });
  } catch (error) {
    if (responded) return;

    responded = true;
    logger.error("Error triggering scrape:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to trigger scrape",
      error: error.message,
    });
  }
};

/**
 * Get Scraping Statistics
 *
 * @route GET /api/data/stats
 * @access Private
 */
exports.getStats = async (req, res) => {
  try {
    const totalItems = await ScrapedItem.countDocuments();
    const latestItem = await ScrapedItem.findOne().sort({ scrapedAt: -1 });

    // Calculate average points
    const avgPoints = await ScrapedItem.aggregate([
      {
        $group: {
          _id: null,
          avgPoints: { $avg: "$points" },
          totalPoints: { $sum: "$points" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalItems,
        lastScrapedAt: latestItem ? latestItem.scrapedAt : null,
        averagePoints: avgPoints[0]?.avgPoints || 0,
        totalPoints: avgPoints[0]?.totalPoints || 0,
      },
    });
  } catch (error) {
    logger.error("Error fetching stats:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};
