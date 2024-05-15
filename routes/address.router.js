const express = require("express")
const { handleCreateUserAddress, handleGetUserAddress, handleUpdateUserAddress, handleGetAllAddress } = require("../controller/address.controller")
const { auth } = require("../middleware/auth")



const AddressRouter = express.Router()


AddressRouter.post("/create", auth, handleCreateUserAddress)
AddressRouter.get("/get",auth, handleGetUserAddress)
AddressRouter.get("/", handleGetAllAddress)
AddressRouter.patch("/update/:id", handleUpdateUserAddress)


module.exports = {
    AddressRouter
}