
const { KundaliModel } = require("../model/kundali.model")




const handlekundaliCreate = async (req, res) => {
    const data = req.body;

    try {
        // Add createdAt and updatedAt fields before saving the Kundali
        const kundaliData = new KundaliModel({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await kundaliData.save();
        res.status(200).json({ msg: "New kundali has been created" });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};


const handlekundaliGet = async (req, res) => {
    try {
        const kundali = await KundaliModel.find()
        res.status(200).send(kundali)
    } catch (error) {
        res.status(500).json({ msg: "Something Went Wrong", error: error.message })
    }
}





module.exports = {
    handlekundaliCreate, handlekundaliGet
}