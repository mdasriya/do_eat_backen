const mongoose = require("mongoose");


const MedecienSchema = mongoose.Schema({
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  image: { type: "string", required: true },
  quantity: { type: "Number", required: true },
  price: { type: "Number", required: true },
}, {
  versionKey: false,
});

const MedecienModel = mongoose.model("medecien", MedecienSchema);

module.exports = {
    MedecienModel,
};
