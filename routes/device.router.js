// routes/device.js

const express = require('express');
const { DeviceModel } = require('../model/devices.model');

const DeviceRouter = express.Router();


DeviceRouter.post('/track-device', async (req, res) => {
  try {
    const { deviceId, userAgent, deviceType } = req.body;
    let device = await DeviceModel.findOne({ deviceId });

if(device){
    res.status(200).json({ msg: 'Device already visited' });
}else{
    
    const newDevice = new DeviceModel({deviceId, userAgent, deviceType });
    await newDevice.save();
    res.status(201).json({msg:"Device succesfully get Data"});
}

  } catch (error) {
    res.status(500).json({ error: 'Error saving device information' });
  }
});

module.exports = {
    DeviceRouter
};
