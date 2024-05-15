const { addressModel } = require("../model/address.model")
const { UserModel } = require("../model/user.model")



const handleCreateUserAddress = async (req, res) => {
   const data = req.body
   const { UserId } = req.body

   try {
      const match = await addressModel.find({ UserId })
      if (match.length > 0) {
         res.status(200).json({ msg: "user address present", state: "handlePayment" })
      } else if (data.address1.length > 0) {
         const address = new addressModel(data)
         await address.save()
         res.status(200).json({ msg: "address added successfully", state: "created" })
      } else {
         res.status(200).json({ msg: "user address present", state: "onOpen" })
      }
   } catch (error) {
      console.log(error.message)
      res.status(500).json({ msg: "Something Went Wrong", error: error.message, state: false })
   }

}






const handleGetUserAddress = async (req, res) => {
   const { UserId } = req.body
   try {
      const address = await addressModel.findOne({ UserId: UserId })
    if(address){
       res.status(200).send(address)
    }
   } catch (error) {
      res.status(500).json({ msg: "Something Went Wrong", error: error.message })
   }

}

const handleGetAllAddress = async (req, res) => {
   try {
      const address = await addressModel.find()
      res.status(200).send(address)
   } catch (error) {
      res.status(500).json({ msg: "Something Went Wrong", error: error.message })
   }
}


const handleUpdateUserAddress = async(req, res) => {
console.log("call")
const userIdinUserDoc = req.body.UserId
const { id } = req.params

  try {
   const address = await addressModel.findOne({ _id: id })
  
   const userIDinaddressDoc = address.UserId
   if (userIdinUserDoc === userIDinaddressDoc) {
       
       await addressModel.findByIdAndUpdate({_id:id}, req.body)
      res.json({msg:`Your address has been updated`,state:true})
   } else {
       res.json({ msg: "you are not Authorized", state:false })
   }
} 
   catch (error) {
   console.log(error.message)
   res.json({ msg: "Something wrong while update in address", state:false })
  }
}





module.exports = {
   handleCreateUserAddress, handleGetUserAddress, handleUpdateUserAddress, handleGetAllAddress,
}