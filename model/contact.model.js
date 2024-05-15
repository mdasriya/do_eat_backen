const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
   name: { type: "string", required: true },
   email: { type: "String", required: true },
   PhoneNo: { type: "string", required: true },
   subject: { type: "String", required: true },
   message: { type: "String", required: true },
   UserId: { type: "String", required: true },
   user: { type: "String", required: true },
   creationDate: { type: Date, default: Date.now }, // Date and time of creation
   updateDate: { type: Date, default: null }, // Date and time of last update
}, {
   versionKey: false
});

const ContactModel = mongoose.model("contact", contactSchema);

module.exports = {
   ContactModel
};
