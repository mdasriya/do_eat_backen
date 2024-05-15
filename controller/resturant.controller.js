// const { MenuModel } = require("../model/menu.model")

const { ResturantModel } = require("../model/resturant.model")


// const handleCreateResturant = async (req, res) => {
//    const data = req.body
//    try {
//       const Resstatus = new ResturantModel(data)
//       await Resstatus.save()
//       res.status(200).json({ msg: "Resturant Status added Successfully!!!", state:true })
//    } catch (error) {
//       res.status(400).json({ msg: error.message })
//    }
// }

const handleGetResturant = async (req, res) => {
   try {
      const resturant = await ResturantModel.find()
      res.status(200).send(resturant)
   } catch (error) {
      res.status(400).send({ msg: error.msg })
   }
}

const handleUpadteResturant = async (req, res) => {
   const { menuId } = req.params
   
   try {
      await ResturantModel.findByIdAndUpdate({ _id: menuId }, req.body)
      res.json({ msg: `resturant Status has been updated`, state:true })

   } catch (error) {
      console.log(error);
   }

}

// const handleDeleteMenu = async (req, res) => {
  
//    const { menuId } = req.params

//    try {
//       await ProductModel.findByIdAndDelete({ _id: menuId }, req.body)
//       res.status(200).json({ msg: `product has been deleted successfully`, state:true })
//    } catch (error) {
//       console.log(error);
//    }
// }

module.exports = {
   //  handleCreateResturant,
    handleGetResturant, handleUpadteResturant
}