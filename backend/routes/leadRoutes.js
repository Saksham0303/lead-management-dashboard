const express = require("express");
const router = express.Router();

const {
  getLeads,
  getLeadById,
  getAnalytics,
} = require("../controllers/leadController");

// analytics route (MUST be before :id)
router.get("/analytics", getAnalytics);

// list & detail routes
router.get("/", getLeads);
router.get("/:id", getLeadById);

module.exports = router;
