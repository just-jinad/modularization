const express = require('express')
const app = express()
const env = require('dotenv').config()
port = process.env.port
const userRoute = require("./Routes/user.route")
const signUpRoute = require("./Routes/signUp.route")
const cors = require("cors")
let URI = process.env.URI



const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose
  .connect(URI)
  .then(() => {
    console.log("database connected !!");
  })
  .catch((err) => {
    console.log(err);
  });





app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/user", userRoute)
app.use("/signUp", signUpRoute)
// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))