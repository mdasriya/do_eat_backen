const express = require("express")
const { handleCreateCartProduct, handleGetCartProduct, handleDeleteCartProduct, handleCartOrderDelet } = require("../controller/cart.controller")
const { auth } = require("../middleware/auth")


const CartRouter = express.Router()
CartRouter.use(auth)
CartRouter.post("/create", handleCreateCartProduct)
CartRouter.get("/", handleGetCartProduct)
CartRouter.delete("/delete/:productId", handleDeleteCartProduct)
CartRouter.post("/order/delete", handleCartOrderDelet)

module.exports = {
    CartRouter
}