// passwordValidationMiddleware.js

const passwordValidation = (req, res, next) => {
    const { pass } = req.body;
  console.log(pass)
    // Define password criteria
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
  
    // Check if password meets the criteria
    if (pass.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
      res.status(400).json({ msg: 'Invalid password. Please ensure it meets the criteria.' });
    }else{

        next();
    }
  
    // If password is valid, proceed to the next middleware
  };
  
  module.exports = passwordValidation;
  