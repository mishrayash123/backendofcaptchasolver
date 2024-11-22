// section 1: importing Razorpay
const Razorpay = require("razorpay");
const User = require("../models/UserSchema");
// section 2: initialize Razorpay instance

// note: add your own credentials to check the razorpay dashboard
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
});

// section 3: payout route
const handlePayout = async (req, res) => {
    try {
      console.log("Request body received:", req.body); // Debug log
  
      const { email } = req.body;
      console.log(email)
      if (!email) {
        console.log("Missing email in request body"); // Log the issue
        return res.status(400).json({ message: "Name is required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found:", email); // Log if user is missing
        return res.status(404).json({ message: "User not found" });
      }
      console.log(user)
      if (user.Amount <= 0) {
        console.log("No amount to payout for user:", email); // Log no payout issue
        return res.status(400).json({ message: "No amount to payout" });
      }
  
      const amountInPaise = user.Amount * 100;
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });
  
      user.Amount = 0;
      await user.save();
  
      return res.json({
        success: true,
        order,
        message: "Payout initiated.",
      });
    } catch (error) {
      console.error("Error in handlePayout:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };
  

// section 4: exporting new function
module.exports = handlePayout;
