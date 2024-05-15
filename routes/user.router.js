
const express = require("express")
const { handleUserRegister, handleUserLogin, handleProfileData, handleForgotPass, handleVerifyPass, getAllUser, } = require("../controller/user.controller")
const { auth } = require("../middleware/auth")

const UserRouter = express.Router()

UserRouter.post("/register", handleUserRegister)
UserRouter.post("/login", handleUserLogin)
UserRouter.get("/", getAllUser)

UserRouter.get("/profile", auth, handleProfileData)
UserRouter.patch("/forgot-password", handleForgotPass)
UserRouter.patch("/verify-password/:pin", handleVerifyPass)
module.exports = {
  UserRouter
}