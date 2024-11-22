// section 1: importing modules and intializing
const express = require("express");
const router = express.Router();
const { getCaptcha, verifyCaptcha } = require("../controllers/captchaController");


// section 2: adding routes 
router.post("/getCaptcha", getCaptcha);
router.post("/verifyCaptcha", verifyCaptcha);

module.exports = router