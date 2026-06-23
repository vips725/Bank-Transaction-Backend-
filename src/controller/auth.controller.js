const { router } = require("../app")
const userModel = require("../models/user.model")


function userRegisterController(req, res){
    const {email , password , name} = req.body
}

module.exports = {
    userRegisterController
}