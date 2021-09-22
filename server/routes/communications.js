const express = require("express");
const router = express.Router();
const { notify } = require("../controllers/communicationsController");

// Launch announcement
router.post("/notify", notify);

module.exports = router;
