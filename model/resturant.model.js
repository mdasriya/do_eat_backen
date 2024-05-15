const mongoose = require("mongoose");

const resturantSchema = mongoose.Schema({
    resturant: { type: Boolean, required: true },
    
}, {
    versionKey: false
});

const ResturantModel = mongoose.model("resturant", resturantSchema);

module.exports = {
    ResturantModel
};
