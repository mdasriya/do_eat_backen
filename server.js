
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.router");
const { KundaliRouter } = require("./routes/kundali.router");
const { ProductRouter } = require("./routes/product.router");
const { CartRouter } = require("./routes/cart.router");
const { ContactRouter } = require("./routes/contact.router");
const { PaymentRouter } = require("./routes/payment");
const { OrderRouter } = require("./routes/order.router");
const { auth } = require("./middleware/auth");
const { AddressRouter } = require("./routes/address.router");
const { YantraRouter } = require("./routes/yantra.router");
const { WorkShipRouter } = require("./routes/workship.router");
const { medecienRouter } = require("./routes/medecien.router");
const { MailRouter } = require("./routes/Mail.router");
const { MenuRouter } = require("./routes/menu.router");
const { ResturantRouter } = require("./routes/resturant.router");

require("dotenv").config()


// const razorpay = new Razorpay({
//   key_id: "rzp_test_NCZ3DUZHQlcZeL", // Replace with your actual key
//   key_secret: "52u4Zi8QgUQYQUrGEzkAIYKZ", // Replace with your actual secret
// });


const app = express();


app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/user", UserRouter)
app.use("/kundali", KundaliRouter)
app.use("/products", ProductRouter)
app.use("/cart", CartRouter)
app.use("/contact", ContactRouter)
app.use("/api/payment", auth, PaymentRouter)
app.use("/order", OrderRouter)
app.use("/address", AddressRouter)
app.use("/yantra", YantraRouter)
app.use("/workShip", WorkShipRouter)
app.use("/medecine", medecienRouter)
app.use("/send", MailRouter)
app.use("/menu", MenuRouter)
app.use("/resturant", ResturantRouter)

// server home page
app.get("/", (req,res)=> {
  res.send("Welcome to do eat server")
  })

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  if (!Array.isArray(items)) {
    res.status(400).json({ error: "Items must be an array" });
    return;
  }



  // Collect line items as per Stripe's expectations
  const lineItems = items
    .filter((item) => item.quantity > 0) 
    .map((item) => ({
      price: item.id,
      quantity: item.quantity,
    }));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Internal Server Error");
  }
});

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

const port = 4000;
app.listen(port, async() => {
try {
  await connection
  console.log("database is connected")
console.log(`Server is running on http://localhost:${port}`);
} catch (error) {
  console.log(error.message)
}
 
});
