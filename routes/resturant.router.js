const express = require("express")
const {  handleGetResturant, handleUpadteResturant } = require("../controller/resturant.controller")


const ResturantRouter = express.Router()


// ResturantRouter.post("/create", handleCreateResturant)
ResturantRouter.get("/", handleGetResturant)
ResturantRouter.patch("/update/:menuId", handleUpadteResturant)
// ProductRouter.delete("/delete/:menuId", )

module.exports = {
    ResturantRouter
}