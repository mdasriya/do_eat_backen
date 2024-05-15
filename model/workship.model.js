const mongoose = require("mongoose");


const WorkShipSchema = mongoose.Schema({
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  image: { type: "string", required: true },
  quantity: { type: "Number", required: true },
  price: { type: "Number", required: true },
}, {
  versionKey: false,
});

const WorkShipModel = mongoose.model("workship", WorkShipSchema);

module.exports = {
    WorkShipModel,
};
