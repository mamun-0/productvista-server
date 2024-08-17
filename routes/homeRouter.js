const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Home Page");
});

module.exports = router;
