const jwt = require("jsonwebtoken")
const userModel = require("../model/usermodel");
const authetication = async(req, res, next) => {
    try {
            const user = await userModel.findById(req.params.id);
            const userToken = user.token
    
            if (!userToken){
            res.status(400).json("Token not found")
           }

           await jwt.verify(userToken, process.env.secretkey,(err, payLoad) =>{
            if(err){res.json(err.message)}
            else {
               req.user = payLoad
               next()
            }
        })
   

    } catch (error) {
        res.json(error.message)
    }

}

exports.ChekUser = async(req, res, next)=>{
    authetication(req, res, async()=>{
    const users = await userModel.findById(req.params.id)
    if(users.isAdmin) {
        next()
    }else {
        res.json("you are not authorized to perform this action")
    } 
    })
 }

