const express = require("express");
const Product = require("../models/product");
const Brand = require("../models/brand");
const Category = require("../models/category");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("brand")
    .populate("category");
  return res.json({ message: product });
});
router.post("/filter", async (req, res) => {
  const { selectedBrands, sortOption, selectedCategories, values } = req.body;

  let brandIds = [];
  let categoryIds = [];
  let sort =
    sortOption == "htl"
      ? { price: -1 }
      : sortOption == "lth"
      ? { price: 1 }
      : sortOption == "newest"
      ? { createdAt: -1 }
      : "";
  if (selectedBrands.length > 0) {
    const brands = await Brand.find({ name: { $in: selectedBrands } });
    brandIds = brands.map((brand) => brand._id);
  }
  if (selectedCategories.length > 0) {
    const categories = await Category.find({
      name: { $in: selectedCategories },
    });
    categoryIds = categories.map((category) => category._id);
  }
  const query = {
    price: { $gte: values[0], $lte: values[1] },
  };

  if (brandIds.length > 0) query.brand = { $in: brandIds };
  if (categoryIds.length > 0) query.category = { $in: categoryIds };

  const products = await Product.find(query)
    .populate("brand")
    .populate("category")
    .sort(sort);
  res.json({ message: products });
});

module.exports = router;
