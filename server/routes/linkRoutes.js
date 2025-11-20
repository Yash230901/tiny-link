const express = require("express");
const router = express.Router();

const {
  createLink,
  getAllLinks,
  getStats,
  deleteLink,
  redirect,
  healthCheck,
} = require("../controllers/linkController");

router.post("/", createLink);
router.get("/", getAllLinks);
router.get("/:code", getStats);
router.delete("/:code", deleteLink);

router.get("/r/:code", redirect);

router.get("/healthz", healthCheck);

module.exports = router;
