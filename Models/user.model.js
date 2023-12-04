
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let userSchema = mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
  
  });
  
  let saltRound = 5

  userSchema.pre("save",function(next){
    bcrypt.hash(this.password, saltRound,(err, hash)=>{
      if (err) {
        console.log(err);
      }else{
        console.log(hash);
        this.password = hash
        next()
      }
    })
    console.log(this.password);
  })
  let userModel = mongoose.model("users", userSchema);

  module.exports = userModel