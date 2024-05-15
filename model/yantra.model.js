const mongoose = require("mongoose");


const yantraSchema = mongoose.Schema({
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  image: { type: "string", required: true },
  category: { type: "string", required: true },
  veg: { type: "string", required: true },
  quantity: { type: "Number", required: true },
  price: { type: "Number", required: true },
  discount:{ type: "Number", required: true },
  cutprice:{ type: "Number", required: true }
}, {
  versionKey: false,
});

const YantraModel = mongoose.model("yantra", yantraSchema);

module.exports = {
  YantraModel,
};
