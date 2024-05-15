const jwt = require("jsonwebtoken")

 const auth = (req,res,next) => {
 
const token = req.headers.authorization?.split(" ")[1]

 if(token){
  const decoded = jwt.verify(token, "masai")
  if(decoded){
   req.body.UserId = decoded.UserId
   req.body.user = decoded.user
   next()
  }else{
   console.log("not authorized")
  res.status(200).json({msg:"you are not authorized"})
  }
 }else{
   console.log("token not found")
    res.status(200).json({msg:"Login first"})
 }
 }

 module.exports = {
    auth
 }