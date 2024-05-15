const { MedecienModel } = require("../model/medecien.model")




const handleCreatemedecien = async (req, res) => {
 
   const data = req.body
   
   try {
      const WorkShip = new MedecienModel(data)
      await WorkShip.save()
      res.status(200).json({ msg: "WorkShip added Successfully!!!", state:true })
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
}

const handleGetmedecien = async (req, res) => {
   
   try {
      const products = await MedecienModel.find()
      res.status(200).send(products)
   } catch (error) {
      res.status(400).send({ msg: error.msg })
   }
}

const handleUpadtemedecien = async (req, res) => {
   const { productId } = req.params
   console.log()
   try {
      await MedecienModel.findByIdAndUpdate({ _id: productId }, req.body)
      res.json({ msg: `WorkShip has been updated` })

   } catch (error) {
      console.log(error);
   }

}

const handleDeletemedecien = async (req, res) => {
  
   const { productId } = req.params

   try {
      await MedecienModel.findByIdAndDelete({ _id: productId }, req.body)
      res.status(200).json({ msg: `WorkShip has been deleted successfully`, state:true })
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
    handleCreatemedecien,handleGetmedecien,handleDeletemedecien,handleUpadtemedecien
}