const express = require("express")
const router = express.Router()
const {userWelcome, registerUser, signUp, authenticateUser, dashboard, upload, sendmail} = require("../Controllers/user.controller")


router.get("/welcome", userWelcome)
router.post("/register", registerUser)
router.post("/newuser", signUp )
router.post("/login", authenticateUser)
router.post("/dashboard", dashboard)
router.post("/upload", upload)
router.get("/sendmail", sendmail)
module.exports = router 