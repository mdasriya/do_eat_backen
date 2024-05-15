
const Razorpay = require("razorpay");
const crypto = require("crypto");
var nodemailer = require('nodemailer');
const { UserModel } = require("../model/user.model");
const { addressModel } = require("../model/address.model");


const PaymentRouter = require("express").Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_FZa7FJ6Bglhj8Y", // Replace with your actual key 
  key_secret: "oOx40LBFhDdweDdbBHa4hLis", // Replace with your actual secret 
});



let total = ""
PaymentRouter.post("/orders", async (req, res) => {
  total = req.body.amount
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});


PaymentRouter.post("/verify", async (req, res) => {

   const { cartData,totalPrice,UserId } = req.body

  const user = await UserModel.findOne({ _id: UserId })
   const address = await addressModel.findOne({UserId : UserId })

   let cartItemsTable = "<table style='width: 100%; margin: 0 auto;'>";
   cartItemsTable += `
       <tr>
         <th>image</th>
           <th>Product</th>
          <th>Quality</th>
           <th>Quantity</th>
           <th>Price</th>
       </tr>
   `;
  
  cartData.forEach((item) => {

     if(item.quality){
      cartItemsTable += `
      <tr>
  
<td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px;"/></td>

   <td style="text-align:center;">${item.title}</td>
          <td style="text-align:center;">${item.quality}</td>
          <td style="text-align:center;">${ item.quantity}</td>
          <td style="text-align:center;">${item.price} INR</td>
      </tr>
  `;
     }else{
      cartItemsTable += `
      <tr>
  
<td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px;"/></td>

   <td style="text-align:center;">${item.title}</td>
          <td style="text-align:center;">NA</td>
          <td style="text-align:center;">${ item.quantity}</td>
          <td style="text-align:center;">${item.price} INR</td>
      </tr>
  `;
     }
    
  });
  
   cartItemsTable += "</table>";

  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dhukhbhanjan2023@gmail.com',
      pass: 'lrmocpbvmbkjvspa'
    }
  });
//  
 // 
  //  console.log(cartData)
  let mailOptions = {
    from: 'dhukhbhanjan2023@gmail.com',
    //  [user.email, 'dhukhbhanjan2023@gmail.com']
    to: [user.email, 'dhukhbhanjan2023@gmail.com'],
    subject: 'Order Confirmation from Dhukh Bhanjan',
    html: `
    <div style="width: 70%;">
    <div>
    <p style="text-align:right;">Date: ${new Date().toLocaleDateString()}</p>
    </div>

    <div style="text-align:center">
    <img style="width: 100px; height: 100px; margin: 0 auto;" src="https://www.dhukhbhanjan.com/static/media/sun.121ef67838daba6b63c1.png" alt="Dhukhbhanjan.com">
  </div>
  
  
  <div style="text-align:left; width:100%; margin: 0 auto;">
          
          <h3 style="text-align:left;">Dear Customer</h3>
          <p style="text-align:left;">Thank you for Placing an order with us through our web site</p>
          <a style="text-align:left; margin-bottom:0px;" href="https://www.dhukhbhanjan.com" >https://www.dhukhbhanjan.com</a>
          <p style="text-align:left; margin-bottom:0px;">for your convenience, we have included a copy of your order below. just in case, if you identify any discrepancy, kindly notify us immediatly. if you have question about your order status, you can contact us by email at:</p>
          <a href="mailto:support@dhukbhanjan.com" target="_blank" style="text-align: left; margin-top: -20px;margin-bottom:0px;">support@dhukbhanjan.com</a>
      </div>
    <h3>Order Summary:</h3>

    <hr/>
    ${cartItemsTable}
    <hr/>
    <div style="display:flex;width:100%;justify-content:space-between;">
    <h3>Transaction Total:</h3>
    <h3 style="margin-left:10px">₹ ${totalPrice} INR</h3>
</div>
</div>
    <hr />
   <div>
   <p>Customer Name : ${user.firstName} ${user.lastName}</p>
   
   <div>
   <p style="margin:0px; font-weight:bold">Billing Address:</p>
   <p style="margin:0px">${address.address1}</p>
   <p style="margin:0px">${address.address2}</p>
   <p style="margin:0px">${address.city}</p>
   <p style="margin:0px">${address.postalCode}</p>
 </div>
 
   <p style="margin-top: 10px">Customer Phone Number: ${address.phone}</p>
   <p style="margin-top:10px;margin: 0px;">Customer Email:ID: ${user.email}</p>
   </div> 
 
    <p style="text-align: center;">Your order will be processed within next 48 hours and your products will be dispatch through courier service/government post</p>
    </div>
    `
};


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


try {
   res.status(200).json({ message: "Payment verified successfully", state: true });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
}


});





module.exports = { PaymentRouter };