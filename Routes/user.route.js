const express = require("express")
const router = express.Router()
const {userWelcome, registerUser, signUp} = require("../Controllers/user.controller")


router.get("/welcome", userWelcome)
router.post("/register", registerUser)
router.post("/newuser", signUp )
module.exports = router 