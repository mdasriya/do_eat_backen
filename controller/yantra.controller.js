const { YantraModel } = require("../model/yantra.model")


const handleCreateYantra = async (req, res) => {
 
   const data = req.body
   
   try {
      const yantra = new YantraModel(data)
      await yantra.save()
      res.status(200).json({ msg: "yantra added Successfully!!!", state:true })
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
}

const handleGetYantra = async (req, res) => {
   try {
      const products = await YantraModel.find()
      res.status(200).send(products)
   } catch (error) {
      res.status(400).send({ msg: error.msg })
   }
}

const handleUpadteYantra = async (req, res) => {
   const { productId } = req.params
  
   try {
      await YantraModel.findByIdAndUpdate({ _id: productId }, req.body)
      res.json({ msg: `product has been updated` })

   } catch (error) {
      console.log(error);
   }

}

const handleDeleteYantra = async (req, res) => {
  
   const { productId } = req.params

   try {
      await YantraModel.findByIdAndDelete({ _id: productId }, req.body)
      res.status(200).json({ msg: `Yantra has been deleted successfully`, state:true })
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
    handleCreateYantra,handleGetYantra,handleDeleteYantra,handleUpadteYantra
}