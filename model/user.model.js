const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   name: { type: "string", required: true },
   email: { type: "string", required: true },
   pass: { type: "string", required: true },
   resetPin: { type: String, default: null },
   resetPinExpiration: { type: Date, default: null },
   registrationDate: { type: Date, default: Date.now }, // New field for registration date
}, {
   versionKey: false
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
   UserModel
};
