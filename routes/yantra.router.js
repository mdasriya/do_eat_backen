
const express = require("express")
const { handleCreateYantra, handleGetYantra, handleUpadteYantra, handleDeleteYantra } = require("../controller/yantra.controller")



const YantraRouter = express.Router()


YantraRouter.post("/create", handleCreateYantra)
YantraRouter.get("/", handleGetYantra)
YantraRouter.patch("/update/:productId", handleUpadteYantra)
YantraRouter.delete("/delete/:productId", handleDeleteYantra)

module.exports = {
    YantraRouter
}