const { WorkShipModel } = require("../model/workship.model")



const handleCreateWorkShip = async (req, res) => {
 
   const data = req.body
   
   try {
      const WorkShip = new WorkShipModel(data)
      await WorkShip.save()
      res.status(200).json({ msg: "WorkShip added Successfully!!!", state:true })
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
}

const handleGetWorkShip = async (req, res) => {
   
   try {
      const products = await WorkShipModel.find()
      res.status(200).send(products)
   } catch (error) {
      res.status(400).send({ msg: error.msg })
   }
}

const handleUpadteWorkShip = async (req, res) => {
   const { productId } = req.params
   console.log()
   try {
      await WorkShipModel.findByIdAndUpdate({ _id: productId }, req.body)
      res.json({ msg: `WorkShip has been updated` })

   } catch (error) {
      console.log(error);
   }

}

const handleDeleteWorkShip = async (req, res) => {
  
   const { productId } = req.params

   try {
      await WorkShipModel.findByIdAndDelete({ _id: productId }, req.body)
      res.status(200).json({ msg: `WorkShip has been deleted successfully`, state:true })
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
    handleCreateWorkShip,handleGetWorkShip,handleDeleteWorkShip,handleUpadteWorkShip
}