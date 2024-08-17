const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find({});
  return res.json({ message: categories });
});

module.exports = router;
