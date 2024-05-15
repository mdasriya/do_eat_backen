const express = require("express")

const { auth } = require("../middleware/auth")
const { handleContactCreate, handleContactGet } = require("../controller/contact.controller")


const ContactRouter = express.Router()
//  ContactRouter.use(auth)

ContactRouter.post("/create", auth, handleContactCreate)
ContactRouter.get("/", handleContactGet)

module.exports = {
    ContactRouter
}