const mongoose = require("mongoose");

const qualitySchema = mongoose.Schema({
  type: { type: "string", required: true },
  prices: { type: ["Number"], required: true },
}, { _id: false });

const productSchema = mongoose.Schema({
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  image: { type: "string", required: true },
  quantity: { type: "Number", required: true },
  benefits: { type: "String", required: true },
  qualities: [qualitySchema],
}, {
  versionKey: false,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};
