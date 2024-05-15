const express = require("express")
const { handleCreateMenu, handleGetMenu, handleDeleteMenu, handleUpadteMenu } = require("../controller/menu.controller")


const MenuRouter = express.Router()


MenuRouter.post("/create", handleCreateMenu)
MenuRouter.get("/", handleGetMenu)
MenuRouter.patch("/update/:menuId", handleUpadteMenu)
MenuRouter.delete("/delete/:menuId", handleDeleteMenu)

module.exports = {
    MenuRouter
}