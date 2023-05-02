const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    RMC: String,
    FamilyName: String,
    ModelName: String,
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", ProductsSchema);

module.exports = { Products };
