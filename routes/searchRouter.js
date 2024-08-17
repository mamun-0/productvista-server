const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.post("/", async (req, res) => {
  const { search } = req.body;
  const product = await Product.find({
    name: new RegExp(search, "i"),
  }).populate("brand");
  return res.json({ message: product });
});

module.exports = router;
