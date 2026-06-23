const { timeStamp } = require("node:console");
const { type } = require("node:os");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address",
    ],
  },
  name:{
    type : String , 
    required : [true, "Name is required for creating an account"]
  },
  password:{
    type: String ,
    required:[true, "Password is reuqired"],
    minlength :[6 , "minimum 6 password length needed"],
    select:false
  },
},{
    timeStamp : true
});

UserSchema.pre("save" ,async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const hash = await bcrypt.hash(this.password ,10)
    this.password = hash
    return next()
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}

const userModel = mongoose.model("user", UserSchema)

module.exports = userModel
