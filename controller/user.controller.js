
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require('uuid');

const handleUserRegister = async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.status(200).json({ msg: "You are already registered.", state:false });
        } else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ msg: err.message });
                } else {
                    const registrationDate = new Date(); // Capture registration date and time

                    const userData = new UserModel({
                        name,
                        
                        email,
                        pass: hash,
                        registrationDate,
                    });
                    await userData.save();

                    // Assuming you have additional logic for handling the new address and time
                    const { address, time } = req.body;
                    if (address && time) {
                        // Add logic to handle new address and time, you might have a separate address schema
                        // For example, assuming you have an address schema:
                        const newAddress = new AddressModel({
                            userId: userData._id, // Assuming you store the user ID in the address document
                            address,
                            time,
                        });
                        await newAddress.save();
                    }

                    res.status(200).json({ msg: "Registration Done Successfully",state:true });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong while registration", error: error.message });
    }
};


const handleUserLogin = async (req, res) => {
    const { email, pass } = req.body
    try {
        const findData = await UserModel.findOne({ email })
        if (findData) {
            bcrypt.compare(pass, findData.pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ UserId: findData._id, user: findData.name }, "masai")
                    res.status(200).json({ msg: "User Login Success!!!", token: token, username: findData.name })
                } else {
                    res.status(200).json({ msg: "wrong Credential" })
                }
            })
        } else {
            res.status(200).json({ msg: "register first" })
        }

    } catch (error) {

        res.status(500).json({ msg: "Something Went Wrong", error: error.message })
    }
}



const getAllUser = async (req, res) => {
    // const {UserId} = req.body 
    try {
        const userData = await UserModel.find()
        if (userData) {
            res.status(200).json({ msg: "All user get success", users: userData, state: true })
        } else {
            res.status(400).json({ msg: "User Not Found" })
        }
    } catch (error) {
        console.log(error);
    }


}

const handleProfileData = async (req, res,) => {
    const { UserId } = req.body

    try {
        const userData = await UserModel.findOne({ _id: UserId })
        if (userData) {
            res.status(200).send(userData)
        } else {
            res.status(400).json({ msg: "User Not Found" })
        }
    } catch (error) {
        console.log(error);
    }


}


const handleForgotPass = async (req, res) => {
    const { changeEmail } = req.body
    try {
        const user = await UserModel.findOne({ email: changeEmail })
        if (user) {

            const randomPin = Math.random().toString(36).substr(2, 6).toUpperCase();
            const expirationTime = new Date();
            expirationTime.setSeconds(expirationTime.getSeconds() + 90);

            // Update the user with the new pin and expiration time
            await UserModel.updateOne(
                { email: changeEmail },
                { $set: { resetPin: randomPin, resetPinExpiration: expirationTime } }
            );

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mukeshd4797@gmail.com',
                    pass: 'pgwotikfugwbrgvt'
                }
            });
            var mailOptions = {
                from: 'mukeshd4797@gmail.com',
                to: user.email,
                subject: `Dukha bhanjan Password Change pin request`,
                text: `Welcome to Dukha bhanjab `,
                html: `
              <p>This pin is only valid for 60 seconds.</p>
              <p style="color: black; font-size: 18px;"> Pin code ${randomPin}</p>
          `,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error.message)
                    res.status(400).json({ msg: 'Unable to send email try  after sometime', state: false })
                } else if (info.response) {
                    // console.log('Email sent: ' + info.response);

                    res.status(200).json({ msg: 'Email send Successfully', state: true, pincode: randomPin })
                }
            });
            

        } else {
            res.status(200).json({ msg: 'User not found', state: false })
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ msg: 'something went wrong in password change', state: false })

    }
}

const handleVerifyPass = async (req, res) => {
    const { pin } = req.params
    const data = req.body
    const { email, pass } = req.body
    // console.log(req.body)
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.hash(pass, 5, async (err, hash) => {
                if (err) {
                    console.log(err.message)
                    res.status(400).json({ msg: "unable to hash password", state: false })
                } else {
                    await UserModel.findByIdAndUpdate({ _id: user._id }, { ...data, pass: hash })
                    res.status(200).json({ msg: `${user.name} password has been updated`, state: true })
                }
            })
        } else {
            res.status(400).json({ msg: "User Not Found", state: false })
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ msg: "unable to change password try after sometime!!!", state: false })
    }

}











module.exports = {
    handleUserRegister, handleUserLogin, handleProfileData, handleForgotPass, getAllUser, handleVerifyPass
}