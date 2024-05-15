
const { CartModel } = require("../model/cart.model")


const handleCreateCartProduct = async (req, res) => {
    const data = req.body

    try {

        const foundCart = await CartModel.findOne({ productId: data._id + "UID" + data.UserId })
        if (foundCart) {
            // console.log(foundCart)
            res.status(200).json({ msg: "Product Already in cart" })
        } else {
            let storedata = { ...data, productId: data._id + "UID" + data.UserId }
            delete storedata._id
            const cart = new CartModel(storedata)

            await cart.save()
            //  console.log("product added in cart model")
            res.status(200).json({ msg: "product added in cart Success!!!", state: true })

        }
    } catch (error) {
        //   console.log("error")
        console.log(error.message)
        res.status(400).json({ msg: "unable to add product in cart ", state: false })
    }
}

const handleGetCartProduct = async (req, res) => {
    const { UserId } = req.body
    try {
        const cart = await CartModel.find({ UserId: UserId })
        res.status(200).send(cart)
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
}

const handleDeleteCartProduct = async (req, res) => {
    const userIdinUserDoc = req.body.UserId
    const { productId } = req.params

    try {
        const cart = await CartModel.findOne({ _id: productId })
        const userIDinClientDoc = cart.UserId

        if (userIdinUserDoc === userIDinClientDoc) {
            // console.log("user id in user Doc",userIdinUserDoc ,"user id in client doc", userIDinClientDoc);
            await CartModel.findByIdAndDelete({ _id: productId }, req.body)
            res.json({ msg: `${cart.title} has been deleted success` })
        } else {
            res.json({ msg: "you are not Authorized" })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}




const handleCartOrderDelet = async (req, res) => {
    const CartData = req.body
    let arr = []
    CartData.forEach(element => {
        arr.push(element._id)
    });
    try {
        // console.log("try call")
        const deletionCriteria = { _id: { $in: arr } };
        const result = await CartModel.deleteMany(deletionCriteria);
        if (result.deletedCount) {
            return res.status(200).json({ msg: "cart items deleted successfully", state: true });
        }

    } catch (error) {
        console.error("Error deleting cart data:", error);
        res.status(500).json({ msg: "Internal Server Error", state: false });
    }
}



module.exports = {
    handleCreateCartProduct, handleGetCartProduct, handleDeleteCartProduct, handleCartOrderDelet
}

