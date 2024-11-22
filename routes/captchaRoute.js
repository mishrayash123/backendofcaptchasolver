const express = require("express");
const router = express.Router();
const { getCaptcha, verifyCaptcha } = require("../controllers/captchaController");

router.post("/getCaptcha", getCaptcha);
router.post("/verifyCaptcha", verifyCaptcha);

module.exports = router