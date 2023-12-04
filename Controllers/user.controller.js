
const cloudinary = require("cloudinary")
const nodemailer = require("nodemailer");


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECERT
});


const userModel = require("../Models/user.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = process.env.secret

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
        res.send({status:false, message: "This email has already been used" });
      } else {
      
        res.send({status:false, message: "An error occurred during sign Up!" });
      }
    });
}

const authenticateUser = (req,res)=>{
  console.log(req.body);
  userModel.findOne({email:req.body.email})
  .then((result)=>{
    if(result){
      console.log(result);
      bcryptjs.compare(req.body.password, result.password,(err,response)=>{
        if (response) {
          console.log(response);
          let token =   jwt.sign({email:req.body.email}, secret, {expiresIn:"3hr"})
          console.log(token);
          res.send({status:true ,message: "login successful", token})
        }else{
          console.log(err);
          res.send({status:false, message: "Problem with the password"})
        }
      })
    }else{
      res.send({status:false, message:'incorrect email or password'})
    }
  }).catch((err)=>{
    console.log(err);
  });

};

const dashboard = (req,res)=>{
  // console.log("dashboard works ");
  let  token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, secret, ((err, result)=>{
    console.log(result);
   
    if (err) {
      res.send({status:false, message: "Hey it seems you used the wrong oken not correct "})
    }else{
      res.send({status:true, message: "Token verified", result})
    }
  }))
}

const upload = (req, res) => {
  console.log(req.body);

  let uploadfiles = req.body.file;
  cloudinary.v2.uploader.upload(uploadfiles, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ status: false, message: "Error uploading file" });
    } else {
      let myImage = result.secure_url;
      console.log(myImage);
      res.send({ status: true, message: "file uploaded successfully", myImage });
    }
  });
};
const html = "<div> hello  email has been Sent </div>"

const sendmail = ()=>{

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env. PASSWORD
    }
  });
  
  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: "isaacjinad@gmail.com",
    subject: 'Sending Email using Node.js',
    html:html
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


module.exports = {userWelcome, registerUser, signUp,authenticateUser,  dashboard,  upload, sendmail }

