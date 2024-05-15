const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    city: { type: String},
    country: { type: String},
    email: { type: String},
    firstName: { type: String},
    lastName: { type: String},
    UserId: { type: String},
    user: { type: String},
    status: { type: String, default: 'ordered' },
    cancel: { type: String, default: 'process' },
    cancelDate: { type: Date, default: null }, // New field for cancel date
    orderDateTime: { type: Date, default: Date.now, required: true },
    dispatchDate: {type: Date},
    deliveredDate: {type: Date},
    data: {type:Array, required:true},
    phone:{ type: String},
    state:{ type: String},
    street:{ type: String},
    zipcode:{ type: String},

  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel,
};
