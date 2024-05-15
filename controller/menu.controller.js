const { MenuModel } = require("../model/menu.model")




const handleCreateMenu = async (req, res) => {
   const data = req.body
   try {
      const menu = new MenuModel(data)
      await menu.save()
      res.status(200).json({ msg: "menu added Successfully!!!", state:true })
   } catch (error) {
      res.status(400).json({ msg: error.message })
      console.log(error.message)
   }
}

const handleGetMenu = async (req, res) => {
   try {
      const menu = await MenuModel.find()
      res.status(200).send(menu)
   } catch (error) {
      res.status(400).send({ msg: error.msg })
   }
}

const handleUpadteMenu = async (req, res) => {
   const { menuId } = req.params
   try {
      await MenuModel.findByIdAndUpdate({ _id: menuId }, req.body)
      res.json({ msg: `nemu has been updated`, state:true })

   } catch (error) {
      console.log(error);
   }

}

const handleDeleteMenu = async (req, res) => {
  
   const { menuId } = req.params
   try {
      await MenuModel.findByIdAndDelete({ _id: menuId }, req.body)
      res.status(200).json({ msg: `Menu deleted successfully`, state:true })
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   handleCreateMenu,
   handleGetMenu, handleDeleteMenu,handleUpadteMenu
}