const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { profilePicture, email, password, address } = req.body;
    
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
                const user = new UserModel({name,email,password:hash,address})
                await user.save()
                res.status(201).send({msg:"New user has benn added successfully"})
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
});