const nodemailer = require("nodemailer");
const { OrderModel } = require("../model/order.model");
const { UserModel } = require("../model/user.model");
require("dotenv").config();

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.WEB_MAILER,
        pass: process.env.WEB_MAILER_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.WEB_MAILER,
      to: to,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

const handleCreateOrder = async (req, res) => {
  const orderData = req.body;

  try {
    const orders = new OrderModel(orderData);
    await orders.save();

    let cartItemsTable = "<table style='width: 100%; margin: 0 auto;'>";
    cartItemsTable += `
      <tr>
        <th>image</th>
        <th>Product</th>
        <th>Quality</th>
        <th>Price</th>
      </tr>
    `;

    orderData.data.forEach((item) => {
      cartItemsTable += `
        <tr>
          <td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px;"/></td>
          <td style="text-align:center;">${item.title}</td>
          <td style="text-align:center;">${ item.quantity}</td>
          <td style="text-align:center;">${item.price} INR</td>
        </tr>
      `;
    });

    cartItemsTable += "</table>";

    const emailHtml = `
      <div style="width: 100%;">
        <div>
          <p style="text-align:right;">Date: ${new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div style="text-align:center">
          <img style="width: 100px; height: 100px; margin: 0 auto;" src="https://foodorder-pink.vercel.app/assets/Group%2047-VPe2s1rp.png" alt="DoEat.com">
        </div>
        
        <div style="text-align:left; width:100%; margin: 0 auto;">
          <h3 style="text-align:left;">Dear Customer</h3>
          <p style="text-align:left;">Thank you for placing an order with us through our website.</p>
          <a style="text-align:left; margin-bottom:0px;" href="https://foodorder-pink.vercel.app/#/" >https://foodorder-pink.vercel.app/#/</a>
          <p style="text-align:left; margin-bottom:0px;">For your convenience, we have included a copy of your order below. Just in case, if you identify any discrepancy, kindly notify us immediately. If you have questions about your order status, you can contact us by phone at:</p>
          <a href="" style="text-align: left; margin-top: -20px;margin-bottom:0px;">7744055664</a>
        </div>
        
        <h3>Order Summary:</h3>

        <hr/>
        ${cartItemsTable}
        <hr/>
        
        <div style="display:flex;width:100%;justify-content:space-between;">
          <h3>Transaction Total:</h3>
          <h3 style="margin-left:10px">₹ ${orderData.totalPrice} INR</h3>
        </div>
      </div>
      <div>
        <p>Customer Name : ${orderData.firstName} ${orderData.lastName}</p>
        <div>
          <p style="margin:0px; font-weight:bold">Billing Address:</p>
          <p style="margin:0px">${orderData.street}</p>
          <p style="margin:0px">${orderData.city}</p>
          <p style="margin:0px">${orderData.state}</p>
          <p style="margin:0px">${orderData.country}</p>
          <p style="margin:0px">${orderData.zipcode}</p>
        </div>
        <p style="margin-top: 10px">Customer Phone Number: ${orderData.phone}</p>
        <p style="margin-top:10px;margin: 0px;">Customer Email:ID: ${orderData.email}</p>
      </div> 
      <p style="text-align: center;">Your order will be processed within the next 30 minutes, and your products will be delivered shortly.</p>
    `;

    await sendEmail([orderData.email, process.env.WEB_MAILER], 'Order Confirmation from Do Eat', emailHtml);

    res.status(200).json({ msg: "Order placed successfully", state: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Something Went Wrong",
      error: error.message,
      state: false,
    });
  }
};

const handleGetOrder = async (req, res) => {
  let UserId = req.body.UserId;
  try {
    const order = await OrderModel.find({ UserId: UserId });
    if (order.length > 0) {
      res.status(200).json({ msg: "order data", order: order, state: true });
    } else {
      res.status(200).json({ msg: "No Order Present", state: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
};

const handleGetAllOrders = async (req, res) => {
  try {
    const Orders = await OrderModel.find();
    res.status(200).send(Orders);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", error: error.message });
  }
};

const handleCancelOrder = async (req, res) => {
  const userIdinUserDoc = req.body.UserId;
  const { id } = req.params;
  req.body.cancel = "canceled";
  req.body.cancelDate = new Date();

  try {
    const order = await OrderModel.findOne({ _id: id });
    const userIDinOrderDoc = order.UserId;

    if (userIdinUserDoc === userIDinOrderDoc) {
      await OrderModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({
        msg: `Your Order Cancelled Successfully`,
        state: true,
      });
    } else {
      res.status(201).json({
        msg: "You are not Authorized to cancel this order",
        state: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      msg: "Something went wrong while updating the order",
      state: false,
    });
  }
};

const handleUpdateOrderStatus = async(req, res) => {
  const { OrderId } = req.params;
  const order = await OrderModel.findOne({ _id:OrderId})
  const {UserId} = order;
  const arrayObj = [order];
  const user = await UserModel.findOne({ _id:UserId});

  try {
    if(req.body.status === "dispatch"){
      let pushDataDispatch = req.body;
      pushDataDispatch.dispatchDate = new Date();
      await OrderModel.findByIdAndUpdate({ _id: OrderId }, pushDataDispatch);

      const emailHtml = `
        <div style="width: 100%;">
          <div>
            <p style="text-align:right;">Date: ${new Date().toLocaleDateString()}</p>
          </div>

          <div style="text-align: center; width: 95%; padding: 10px; background-color:#001a36;">
            <h1 style="color: white;">YOUR ORDER HAS SHIPPED</h1>
          </div>

          <p style="text-align: center;">Hello, Mr ${user.firstName} ${user.lastName}, we are glad to inform you that your order has been shipped and will reach you shortly.</p>

          <div style="text-align:center; width:100%;">
            <h3 style="text-align:left;">Product Dispatch:</h3>
            <hr/>
            ${generateCartItemsTable(order.data)}
            <hr/>
            <table border="1" style="width:100%">
              <tr>
                <td>Tracking No</td>
                <td>45465574</td>
              </tr>
              <tr>
                <td>Shipping Agency</td>
                <td>DTDC COUIER</td>
              </tr>
              <tr>
                <td>Date of Shipping</td>
                <td>${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>

          <div style="text-align:left;">
            <p style="color: red;">For any further queries and assistance, please reach us </p>
            <div> 
              <p style="color: red;">Email Id: support@dhukhbhanjan.com</p>
              <span style="color: red;">Contact details:-</span>
              <span>+91 7276301985 , +91 7276901955</span>
              <span style="text-decoration: underline; color: red;">(Timing 10 am to 7 pm)</span>
            </div>
            <div style="text-align:center; width:100%;">
              <h3 style="color: blue;">Copyright & Disclaimer | Privacy Policy </h3>
              <span>Please do not reply to this mail as this is an automated mail service</span>
            </div>
          </div>
        </div>
      `;

      await sendEmail(user.email, 'Order Dispatch from Dhukh Bhanjan', emailHtml);

    } else {
      let pushDataDelivered = req.body;
      pushDataDelivered.deliveredDate = new Date();
      await OrderModel.findByIdAndUpdate({ _id: OrderId }, pushDataDelivered);

      const emailHtml = `
        <div style="width: 100%;">
          <div>
            <p style="text-align:right;">Date: ${new Date().toLocaleDateString()}</p>
          </div>

          <div style="text-align: center; width: 95%; padding: 10px; background-color:#001a36;">
            <h1 style="color: white;">YOUR ORDER HAS DELIVERED </h1>
          </div>

          <p style="text-align: center;">Hello, Mr ${user.firstName} ${user.lastName}, we are glad to inform you that your order has been delivered Successfully</p>

          <div style="text-align:center; width:100%;">
            <h3 style="text-align:left;">Product Delivered:</h3>
            <hr/>
            ${generateCartItemsTable(order.data)}
            <hr/>
          </div>

          <div style="text-align:left;">
            <p style="color: red;">For any further queries and assistance, please reach us </p>
            <div> 
              <p style="color: red;">Email Id: support@dhukhbhanjan.com</p>
              <span style="color: red;">Contact details:-</span>
              <span>+91 7276301985 , +91 7276901955</span>
              <span style="text-decoration: underline; color: red;">(Timing 10 am to 7 pm)</span>
            </div>
            <div style="text-align:center; width:100%;">
              <h3 style="color: blue;">Copyright & Disclaimer | Privacy Policy </h3>
              <span>Please do not reply to this mail as this is an automated mail service</span>
            </div>
          </div>
        </div>
      `;

      await sendEmail(user.email, 'Order Delivered from Dhukh Bhanjan', emailHtml);
    } 

    res.status(200).json({msg:"Order Status Updated Successfully", state:true});
  } catch (error) {
    console.log(error);
    res.status(400).json({msg:"something wrong while update order", state:false});
  }
};

// Helper function to generate cart items table
const generateCartItemsTable = (items) => {
  let cartItemsTable = "<table style='width: 100%;'>";
  cartItemsTable += `
    <tr>
      <th>image</th>
      <th>Product</th>
      <th>Quality</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  `;

  items.forEach((item) => {
    cartItemsTable += `
      <tr>
        <td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"/></td>
        <td style="text-align:center;">${item.title}</td>
        <td style="text-align:center;">${item.quality || 'NA'}</td>
        <td style="text-align:center;">${item.quantity}</td>
        <td style="text-align:center;">${item.price} INR</td>
      </tr>
    `;
  });

  cartItemsTable += "</table>";

  return cartItemsTable;
};

module.exports = {
  handleCreateOrder,
  handleGetOrder,
  handleGetAllOrders,
  handleCancelOrder,
  handleUpdateOrderStatus,
};
