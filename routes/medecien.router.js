
const express = require("express")
const { handleCreatemedecien, handleGetmedecien, handleUpadtemedecien, handleDeletemedecien } = require("../controller/medecin.controller")

const medecienRouter = express.Router()


medecienRouter.post("/create", handleCreatemedecien)
medecienRouter.get("/", handleGetmedecien)
medecienRouter.patch("/update/:productId", handleUpadtemedecien)
medecienRouter.delete("/delete/:productId", handleDeletemedecien)

module.exports = {
    medecienRouter
}