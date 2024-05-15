const express = require("express")
const { handleCreateOrder, handleGetOrder, handleGetAllOrders, handleCancelOrder, handleUpdateOrderStatus } = require("../controller/order.controller")
const { auth } = require("../middleware/auth")



const OrderRouter = express.Router()

// OrderRouter.use(auth)
OrderRouter.post("/create", handleCreateOrder)
OrderRouter.get("/", handleGetOrder)
OrderRouter.get("/all", handleGetAllOrders)
OrderRouter.patch("/cancel/:id", handleCancelOrder)
OrderRouter.patch("/update/:OrderId", handleUpdateOrderStatus)

module.exports = {
    OrderRouter
}