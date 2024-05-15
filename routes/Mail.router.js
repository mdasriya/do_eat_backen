var nodemailer = require('nodemailer');
const express = require("express")


const MailRouter = express.Router()

MailRouter.post("/mail", async(req,res)=> {

    const {email} = req.body
    console.log(email)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mukeshd4797@gmail.com',
          pass: 'pgwotikfugwbrgvt'
        }
      });

      let mailOptions = {
        from: 'mukeshd4797@gmail.com',
        // [user.email, 'dhukhbhanjan2023@gmail.com']
        to:email,
        subject: 'Order Confirmation from Do eat',
        html: `
        <div style="width: 70%;">
        <div>
        <p style="text-align:right;">Date: ${new Date().toLocaleDateString()}</p>
        <div style="text-align:center">
        <img style="width: 300px; height: 200px; margin: 0 auto;" src="https://i.imghippo.com/files/RpiUP1712337529.png" alt="Dhukhbhanjan.com">
      </div>
        </div>

    </div>
       <div>
     
        <p style="text-align: center;">Your order will be processed within next half hours an
        d your products will be dispatch through Do Eat</p>
        </div>
        `
    };
    try {
        res.status(200).json({ message: "Payment verified successfully", state: true });
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Internal Server Error!" });
     }
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

})

module.exports = {
    MailRouter  
}

