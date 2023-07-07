const user = require("../model/usermodel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// to signup
exports.newUser = async(req, res)=>{
    try{
        const {username, email, password} = req.body
        const salt = bycrypt.genSaltSync(10)
        const hashedPassword = bycrypt.hashSync(password, salt)
        const data = {
            username,
            email,
            password: hashedPassword
        }

        const createdUser = await user.create(data)
        const token = jwt.sign(
            {
                id: createdUser._id,
                password: createdUser.password
            }, process.env.secretkey,
            {expiresIn: "1d"}
        )
        createdUser.token = token
        createdUser.save()

        res.json({
            message: "New user has been created",
            data: createdUser
        })
    } catch (e) {
        res.json({
            message: e.message
        })
    }
}

//to login
exports.userLogin = async(req, res) =>{
    try{
        //const username = req.boby
        const userpassword = req.body.password
        const checkUsername = await user.findOne({$or:[{username:req.body.username},{email:req.body.email}]})

        if(!checkUsername)
        return res.json("Username not found or incorrect Username")
        
        const checkPassword = bycrypt.compareSync(userpassword,checkUsername.password)

        if(!checkPassword)
           return res.json("Invalid password")
        

        const usertoken = jwt.sign(
            {
                id: checkUsername._id,
                password: checkUsername.password
            }, process.env.secretkey,
            {expiresIn: "1d"}
        )
        checkUsername.token = usertoken
        checkUsername.save()
        
        // to hide password or token
        const {password,...raymond} = checkUsername._doc
        
        res.json({
            message: "Login successful",
            data: raymond
        })

    } catch (e) {
        res.status(500).json(e.message)
    }
} 

//to get a user or all user
exports.getUser = async(req, res)=>{
    try {
        const userId = await user.find();
        if (userId){
        res.status(200).json({
            message: `Find the available users below; The total available users are: ${userId.length}`,
            data: userId
        }) 
        }else {
            res.status(400).json({
                message: "unable to find Users"
            })
        }
    } catch (e){
        res.json(e.message)
    }
}

//to get a user or all user
exports.getSingle = async(req, res)=>{
    try {
        const {id} = req.params
        const userId = await user.findById(id);
        if (userId){
        res.status(200).json({
            message: `Find below the user of:`,
            data: userId
        }) 
        }else {
            res.status(400).json({
                message: "unable to find User"
            })
        }
    } catch (e){
        res.json(e.message)
    }
}

// to update
exports.updateUser = async(req, res)=>{
    try {
        const Duser = await user.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!Duser){
            res.status(400).json({
                message: "Error tring to update"
            })
        } else {
            res.status(201).json({
                message: "Successfuly updated",
                data: Duser
            })
        }
    } catch (error){
        res.json(error.message)
    }
}

// to delete
exports.deleteUser = async(req, res)=>{
    try {
        const Duser = await user.findByIdAndDelete(req.params.userId)
        if (!Duser){
            res.status(400).json({
                message: "Error tring to delete"
            })
        } else {
            res.status(201).json({
                message: "User uccessfuly deleted",
                data: Duser
            })
        }
    } catch (error){
        res.json(error.message)
    }
}