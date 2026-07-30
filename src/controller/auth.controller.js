const { router } = require("../app")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function userRegisterController(req, res){
    const {email , password , name} = req.body

    const isExists = await userModel.findOne({
        email:email
    })
    if(isExists){
        return res.status(422).json({
            message : "User already exists with email",
            status:"failed"
        })
    }
    const user = await userModel.create({
        email , password , name
    })
    const token = jwt.sign({userID:user._id} , process.env.JWT_SCRE , {expiresIn : "3d"})
    res.cookie("token" , token)
    res.status(201).json({
        user:{
            _id : user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}
async function userLoginController(req,res){
    const {email , password} =req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message:"Email or password not found"
        })
    }
    const isVlaidPassword = await user.comparePassword(password)

    if(!isVlaidPassword){
        return res.status(401).json({
            message : "Email or password is INVALID"
        })
    }
    const token = jwt.sign({userID:user._id} , process.env.JWT_SCRE , {expiresIn : "3d"})
    res.cookie("token" , token)
    res.status(201).json({
        user:{
            _id : user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}
module.exports = {
    userRegisterController
}