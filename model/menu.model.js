const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    title: { type: "String", required: true },
    image: { type: "String", required: true },
    
}, {
    versionKey: false
});

const MenuModel = mongoose.model("menu", MenuSchema);

module.exports = {
    MenuModel
};
