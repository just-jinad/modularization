const express = require("express")
const router = express.Router()
const {userWelcome, registerUser, signUp, authenticateUser, dashboard} = require("../Controllers/user.controller")


router.get("/welcome", userWelcome)
router.post("/register", registerUser)
router.post("/newuser", signUp )
router.post("/login", authenticateUser)
router.post("/dashboard", dashboard)
module.exports = router 