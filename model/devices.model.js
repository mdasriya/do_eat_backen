// models/Device.js

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, unique: true, required: true },
  userAgent: String,
  deviceType: String,
  timestamp: { type: Date, default: Date.now },
});

const DeviceModel = mongoose.model('Device', deviceSchema);

module.exports = {
    DeviceModel
}
