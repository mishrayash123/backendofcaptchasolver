// section 1: importing modules and intializing
const express = require("express");
const router = express.Router();
const {login, register } = require("../controllers/authentication");


// section 2: adding routes 
router.post("/login", login);
router.post("/register", register);

module.exports = router