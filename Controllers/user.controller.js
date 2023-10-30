
const userModel = require("../Models/user.model")
const userWelcome = (req, res)=>{
    res.send("hello jinad")
}

const registerUser = (req, res)=>{
    // console.log("user Registered");
    // console.log(req.body);
    // let user = new userModel(req.body);
    // user
    //   .save()
    //   .then(() => {
    //     console.log("details have been saved into the database");
  
    //     res.redirect("/signIn")
  
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     if (err.code == 11000) {
    //       res.render("signUp", { message: "This email has already been used" });
    //     } else {
    //       res.render("signUp", { message: "An error occurred during sign Up!" });
    //     }
    //   });
}

const signUp =(req,res)=>{
  console.log("user has been signed up");
  console.log(req.body);
  let user = new userModel(req.body);
  user
    .save()
    .then(() => {
      console.log("details have been saved into the database");
      res.send({status:true, message:"User has been added successfully"})
    })
    .catch((err) => {
      console.log(err);
      if (err.code == 11000) {
        res.render("signUp", { message: "This email has already been used" });
      } else {
        res.render("signUp", { message: "An error occurred during sign Up!" });
      }
    });
}

module.exports = {userWelcome, registerUser, signUp }

