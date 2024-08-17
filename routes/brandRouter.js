const express = require("express");
const router = express.Router();
const Brand = require("../models/brand");
const Product = require("../models/product");

router.get("/", async (req, res) => {
  const brands = await Brand.find({});
  return res.json({ message: brands });
});
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const product = await Product.find({}).populate("brand");
  const brand = product.filter((item) => item.brand.name === name);
  return res.json({ message: brand });
});

module.exports = router;
