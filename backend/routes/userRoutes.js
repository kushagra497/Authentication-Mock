const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
const {auth} =require('../middleware/user.auth')
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { profilePicture,name,bio,phone, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Hash the password
        bcrypt.hash(password,8,async(err,hash) =>{
            if(err){
                res.status(200).send({"error":err})
            }else{
                const user = new UserModel({profilePicture,name,bio,phone, email, password:hash})
                await user.save()
                res.status(201).send({msg:"New user has benn added successfully"})
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
});


userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        bcrypt.compare(password,user.password,(err,result) =>{
            if(result){
                const token =jwt.sign({userid:user._id},process.env.SecretKey,{expiresIn:"7d"})
              
                res.status(201).send({"msg":"login successfully!",token})
            }else{ 
                res.status(404).send({msg:"Invalid credintial for user login","error":err})
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
});


userRouter.get('/getProfile',auth,async(req,res) =>{
     try{
        const user =req.body
        res.status(200).send({msg:"details of user is",user})


     }catch(error){
        console.log(error);
        res.status(500).send({msg:"error in getting the profile details",error})
     }
})


userRouter.patch('/editProfile',auth,async(req,res) =>{
    try{
        const userId =req.body.user._id
        

    }catch(error){
        console.log(error);
        res.status(500).send({msg:"error in edit profile",error})
    }
})
  

module.exports ={
    userRouter
}