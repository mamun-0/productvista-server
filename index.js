const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const homeRouter = require("./routes/homeRouter");
const searchRouter = require("./routes/searchRouter");
const productRouter = require("./routes/productRouter");
const brandRouter = require("./routes/brandRouter");
const categoryRouter = require("./routes/categoryRouter");
// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/productvista", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
  });

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use("/", homeRouter);
app.use("/search", searchRouter);
app.use("/products", productRouter);
app.use("/brands", brandRouter);
app.use("/category", categoryRouter);
app.listen(3000, () => {
  console.log("Server is running...");
});
