const express = require("express");
const router = express.Router();
const {signUpUser} = require("../Controllers/signUp.controller");

router.get("/register", signUpUser);
module.exports = router;