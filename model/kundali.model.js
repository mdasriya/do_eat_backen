const mongoose = require("mongoose");

const kundaliSchema = mongoose.Schema({
    fname: { type: "String", required: true },
    lname: { type: "String", required: true },
    phone: { type: "String", required: true },
    dob: { type: "String", required: true },
    hours: { type: "String", required: true },
    min: { type: "String", required: true },
    pob: { type: "String", required: true },
    selectedTime: { type: "String", required: true },
    UserId: { type: "String", required: true },
    user: { type: "String", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    versionKey: false
});

const KundaliModel = mongoose.model("kundali", kundaliSchema);

module.exports = {
    KundaliModel
};
