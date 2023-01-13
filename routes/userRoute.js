const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const userRouter = express();

userRouter.post("/register", async (req, res) => {
    const { email, pass, name, age } = req.body
    try {
        const userData = await UserModel.find({ email });
        if (userData.length > 0) {
            res.send("User already exists");
        } else {
            try{
                bcrypt.hash(pass, 5, async (err, hashPass)=>{
                    const user = new UserModel({email, pass:hashPass, name, age});
                    await user.save();
                    res.send("Registered successfully")
                })
            }catch(err){
                console.log("Registered failed");
                console.log(err)
            }
            
        }

    } catch (err) {
        console.log("Registered failed");
        console.log(err)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.find({email});
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID: user[0]._id}, process.env.key, {expiresIn:"24h"})
                    res.send({ "msg": "Login succedssful", "token": token });
                }else{
                    res.send("Login failed");
                }
            })
        } else {
            res.send("Login failed");
        }
    } catch (err) {
        console.log("Login failed");
        console.log(err)
    }
})

module.exports = {
    userRouter
}
