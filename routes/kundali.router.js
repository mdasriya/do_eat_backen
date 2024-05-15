const express = require("express")

const { auth } = require("../middleware/auth")
const { handlekundaliCreate, handlekundaliGet } = require("../controller/kundali.controller")


const KundaliRouter = express.Router()


KundaliRouter.post("/create", auth, handlekundaliCreate)
KundaliRouter.get("/", handlekundaliGet)

module.exports = {
    KundaliRouter
}

// 7825874774
// ask@axio.co.in

