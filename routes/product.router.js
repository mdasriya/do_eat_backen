const express = require("express")
const { handleCreateProduct, handleGetProduct, handleUpadteProduct, handleDeleteProduct } = require("../controller/product.controller")



const ProductRouter = express.Router()


ProductRouter.post("/create", handleCreateProduct)
ProductRouter.get("/", handleGetProduct)
ProductRouter.patch("/update/:productId", handleUpadteProduct)
ProductRouter.delete("/delete/:productId", handleDeleteProduct)

module.exports = {
    ProductRouter
}