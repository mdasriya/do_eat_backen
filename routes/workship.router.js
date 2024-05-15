
const express = require("express")
const { handleCreateWorkShip, handleGetWorkShip, handleUpadteWorkShip, handleDeleteWorkShip } = require("../controller/workShip.controller")





const WorkShipRouter = express.Router()


WorkShipRouter.post("/create", handleCreateWorkShip)
WorkShipRouter.get("/", handleGetWorkShip)
WorkShipRouter.patch("/update/:productId", handleUpadteWorkShip)
WorkShipRouter.delete("/delete/:productId", handleDeleteWorkShip)

module.exports = {
    WorkShipRouter
}