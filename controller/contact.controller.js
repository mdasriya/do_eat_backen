const { ContactModel } = require("../model/contact.model")







const handleContactCreate = async (req, res) => {
    const data = req.body;

    try {
        // Add createdAt and updatedAt fields before saving the contact
        const contactData = new ContactModel({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await contactData.save();
        res.status(200).json({ msg: "New contact has been created" });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};





const handleContactGet = async (req, res) => {
    try {
        const contact = await ContactModel.find()
        res.status(200).send(contact)
    } catch (error) {
        res.status(500).json({ msg: "Something Went Wrong", error: error.message })
    }
}





module.exports = {
    handleContactCreate, handleContactGet
}