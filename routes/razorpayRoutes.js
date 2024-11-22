const express = require("express");
const router = express.Router();
const handlePayout = require("../controllers/razorpayController")


router.post("/payout", handlePayout)



module.exports = router