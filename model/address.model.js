
const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    address1: { type: "string", required: true },
    address2: { type: "string", required: true },
    country: { type: "string", required: true },
    city: { type: "string", required: true },
    postalCode: { type: "string", required: true },
    phone: { type: "string", required: true },
    UserId: { type: "String", required: true },
    user: { type: "String", required: true }
}, {
    versionKey: false
})

const addressModel = mongoose.model("address", addressSchema)

module.exports = {
    addressModel
}